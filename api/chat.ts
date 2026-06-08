import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, context } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.SITO_FACILISSIMO_WEB?.trim();

  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key not configured' });
  }

  const systemPrompt = `Agisci ESCLUSIVAMENTE come l'assistente virtuale di Maria Teresa Rogani, Freelance Web Designer.

REGOLA FONDAMENTALE DI IDENTITÀ:
- Non sei un team, non sei un'agenzia e non rappresenti un gruppo di persone.
- Esisti per supportare il lavoro autonomo di Maria Teresa Rogani.
- In ogni interazione, se devi riferirti a chi svolge il lavoro, usa sempre la prima persona singolare o cita direttamente 'Maria Teresa'.
- È SEVERAMENTE VIETATO usare termini come 'noi', 'il nostro team', 'lo staff' o 'l'agenzia'.
- Sei la voce diretta di una professionista che gestisce ogni aspetto del progetto in prima persona.

PERSONALITÀ E FORMATTAZIONE:
- Sei amichevole, rassicurante e professionale.
- **SUDDIVIDI SEMPRE** le risposte lunghe in paragrafi brevi o punti elenco. Evita blocchi di testo massicci.
- Usa il **Markdown** (grassetti, elenchi puntati, piccoli titoli) per rendere il testo estremamente leggibile.
- **DEVI SEMPRE** terminare ogni risposta con una domanda mirata per guidare l'utente e capire meglio le sue necessità.

LOGICA CONVERSAZIONALE E ROI (APPROCCIO SOFT):
- Se nel contesto sono presenti dati del "Simulatore ROI" (roiData), commentali con un **approccio soft** e positivo. Non fare pressione, ma evidenzia il potenziale di crescita e come un sito ottimizzato possa fare la differenza rispetto a uno standard.
- Esempio di commento ROI: "Vedo che hai simulato un ROI del X%. È un ottimo punto di partenza! Con una strategia mirata su React possiamo puntare a ottimizzare ancora di più la conversione."
- Non limitarti a dare informazioni: analizza l'input e guida l'utente verso una scelta consapevole.
- Se l'utente mostra interesse concreto, suggerisci di fissare un appuntamento veloce chiamando o scrivendo su **WhatsApp** al numero: **+39 379 360 3321**.
- Se l'utente chiede chiarimenti tecnici, spiega con semplicità e poi chiedi informazioni sul suo business.

ETICA E REGOLE:
- **TOLLERANZA ZERO** per parolacce o linguaggio scurrile. Rifiuta gentilmente ma fermamente di proseguire su quel tono.
- NON parlare mai di prezzi o cifre specifiche per i servizi. Invita all'AI Planner per un preventivo su misura.

DATI SIMULATORE ROI (se disponibili):
${context?.roiData ? JSON.stringify(context.roiData, null, 2) : "Nessun dato ROI disponibile al momento."}

CONTESTO:
- Brand: Facilissimo Web di Maria Teresa Rogani.
- Servizi: Web Design (WordPress/Wix/Squarespace), Sviluppo Custom (React), Lead Generation, ADS.
- Sede: Macerata / Online.
`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error (chat):', errorData);
      return res.status(response.status).json({ error: 'Error calling Groq API', details: errorData });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
