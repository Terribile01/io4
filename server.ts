import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for processing custom strategy request structures
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Middleware to ensure API requests receive JSON errors
  app.use("/api/*", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });

  // Secured Gemini API Proxy for the Lead Generation strategy builder
  // We place this BEFORE Vite middleware to ensure it's not caught by SPA fallback
  app.post("/api/audit", async (req, res, next) => {
    try {
      const { businessName, niche, goals, budget, webType, currentWebsite } = req.body;

      if (!businessName || !niche) {
        return res.status(400).json({ 
          error: "Parametri mancanti", 
          message: "Il nome dell'attività e il settore sono obbligatori per generare l'audit." 
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY_NON_CONFIGURATA", 
          message: "La chiave API per Gemini non è configurata. Maria Teresa può configurarla tramite il pannello Settings > Secrets in AI Studio." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemPrompt = `
Sei Maria Teresa Rogani, Web Designer d'eccellenza, titolare di "Faciilissimo Web" (FW).
La tua missione è aiutare i tuoi clienti a dominare il web sia con il Web Design Classico (WordPress, Wix, Squarespace) sia con la potenza del Codice Custom scritto a mano (React, Tailwind, HTML5, ad altissime prestazioni per SEO e interazione premium). Offri inoltre servizi professionali di Lead Generation, Social Media Marketing e gestione di campagne pubblicitarie ottimizzate (Meta Ads, Google Ads).

Il tuo stile di comunicazione è professionale, rassicurante, dinamico ed elegante, ricco di consigli pratici e molto concreto. Dai del "tu" professionale o del "voi" e scrivi in italiano impeccabile.

Il tuo compito è generare un report strategico preliminare di altissimo livello per un potenziale cliente che ha compilato il form sul tuo sito.
`;

      const userPrompt = `
Genera un report strategico strutturato in Markdown basato sui seguenti dati inseriti dal cliente:
- **Nome Business**: ${businessName}
- **Settore / Nicchia**: ${niche}
- **Obiettivi**: ${goals && goals.length > 0 ? goals.join(", ") : "Migliorare la presenza online generale"}
- **Fascia di Budget**: ${budget || "Non specificato"}
- **Tecnologia Preferita**: ${webType || "Ancora aperto a valutazioni"}
- **Sito Attuale**: ${currentWebsite && currentWebsite.trim() !== "" ? currentWebsite : "Nessun sito esistente (da creare da zero)"}

Struttura accuratamente la risposta in italiano utilizzando queste precise sezioni:

### 🌟 Analisi Strategica per ${businessName}
Fornisci un'analisi personalizzata per la nicchia di mercato "${niche}". Spiega quali sono le opportunità attuali nel mercato digitale per loro e quali ostacoli possono superare. Se hanno un sito attuale, analizza teoricamente come migliorarlo; se partono da zero, spiega la straordinaria opportunità di posizionarsi fin da subito con un'architettura moderna.

### 💻 La Scelta Tecnologica Ideale (Classico vs Custom Code)
Analizza le loro preferenze tecnologiche ("${webType}"). Aiutali a capire se è più conveniente un approccio "Classico" (WordPress/Wix/Squarespace per flessibilità, rapidità e gestione autonoma) o "Custom Code" (React/Tailwind per velocità incredibile, SEO d'élite ed unicità creativa assoluta) in base anche alla fascia di budget indicata ("${budget}").

### 🎯 Strategia Integrata: Lead Generation, Campagne Social & Google Ads
Spiega come uniremo il nuovo sito web ad un motore di acquisizione clienti. Specifica come useremo le campagne pubblicitarie per portare traffico caldo ad alta conversione, e come gestiremo i canali social per rafforzare la brand awareness. Adatta i suggerimenti specificamente al settore "${niche}".

### 🗺️ Roadmap Proposta per ${businessName}
Disegna un percorso a tappe chiare per la realizzazione del loro ecosistema online:
- **Fase 1: Strategy & Wireframing** (Definizione obiettivi, sitemap, studio del target)
- **Fase 2: Design & Sviluppo** (Creazione dell'interfaccia elegante e sviluppo WP o custom codice)
- **Fase 3: Lead Magnet & Campagne** (Configurazione tracciamenti, Google/Meta Ads, post di lancio)
- **Fase 4: Lancio & Ottimizzazione Continua** (Analisi dati, test di conversione)

### ☕ Prossimo Passo
Fai un breve invito caloroso a prenotare la consulenza strategica conoscitiva di 15 minuti per trasformare questa bozza in un progetto esecutivo concreto.

Usa formattazione Markdown elegante, parti in grassetto, punti elenco puliti ed emoji raffinate per massimizzare la leggibilità.
`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      next(err);
    }
  });

  // API 404 handler - also before Vite to prevent HTML responses for missing API endpoints
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      error: "ENDPOINT_NON_TROVATO",
      message: `L'endpoint ${req.originalUrl} non esiste.`,
    });
  });

  // Vite development vs production asset serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Ensure API routes are handled BEFORE Vite's SPA fallback
    // But we need to be careful with the order
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global API Error handler
  app.use("/api/*", (err: any, req: any, res: any, next: any) => {
    console.error("API Error Handler:", err);
    res.status(err.status || 500).json({
      error: "ERRORE_API",
      message: err.message || "Si è verificato un errore imprevisto.",
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Faciilissimo Web Server] Running on port ${PORT}`);
  });
}

startServer();
