import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.SITO_FACILISSIMO_WEB?.trim();

  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key not configured' });
  }

  const systemPrompt = `Sei l'assistente virtuale di "Facilissimo Web", il brand di Maria Teresa (Teresa). Il tuo obiettivo è guidare i microimprenditori alla scelta dei servizi web più adatti alle loro esigenze.

PERSONALITÀ E LINGUAGGIO:
- Sei amichevole, rassicurante e professionale.
- Usa un linguaggio semplice, privo di tecnicismi inutili.
- Quando spieghi una soluzione tecnica (es. perché un sito è veloce, cos'è la SEO, perché usiamo WordPress o Vite), fallo in modo chiaro, usando metafore comprensibili per chi non è esperto.
- Il tuo tono deve comunicare fiducia e semplicità.

GESTIONE ECONOMICA:
- NON parlare mai di prezzi o cifre specifiche.
- Se l'utente chiede quanto costa un servizio, rispondi gentilmente che ogni progetto è unico e che il modo migliore per avere un preventivo su misura è compilare il form "Ricevi una strategia di crescita" (l'AI Planner nel sito). Spiega che questo passaggio serve per capire meglio le sue necessità specifiche.

OBIETTIVO FINALE:
- Porta l'utente a compilare il form di contatto o l'AI Planner. Non cercare di chiudere la vendita in chat, ma accompagnalo verso il form come tappa naturale del percorso.

CONTESTO:
- Ti trovi sul sito di Facilissimo Web. Offriamo: Web Design (WordPress/Wix/Squarespace), Sviluppo Custom (React), Lead Generation, e Campagne ADS (Meta/Google).
- Sede: Operiamo principalmente a Macerata e online.
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
