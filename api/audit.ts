import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

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
        message: "La chiave API per Gemini non è configurata. Maria Teresa può configurarla tramite il pannello Settings > Secrets in AI Studio o su Vercel."
      });
    }

    const ai = new GoogleGenAI(apiKey);

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
Fornisci un'analisi personalizzata per la nicchia di mercato "${niche}". Spiega quali sono le opportunità attuali nel mercato digitale per loro e quali ostacoli possono superare. Se hanno un sito attuale, analizza teoricamente come migliorelar lo; se partono da zero, spiega la straordinaria opportunità di posizionarsi fin da subito con un'architettura moderna.

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
Fai un breve invito caloroso a contattarmi su WhatsApp per trasformare questa bozza in un progetto esecutivo concreto.

Usa formattazione Markdown elegante, parti in grassetto, punti elenco puliti ed emoji raffinate per massimizzare la leggibilità.
`;

    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.status(500).json({
      error: "ERRORE_API",
      message: err?.message || "Impossibile contattare l'AI al momento."
    });
  }
}
