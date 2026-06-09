import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { businessName, niche, goals, webType, budget, currentWebsite, clientName } = req.body;

  const goalsText = Array.isArray(goals) ? goals.join(', ') : 'Non specificati';

  const apiKey = process.env.SITO_FACILISSIMO_WEB?.trim();

  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key not configured' });
  }

  const systemPrompt = `Agisci come Teresa, il cuore e la mente dietro "Facilissimo Web". La tua missione è guidare i microimprenditori nel mondo digitale con estrema competenza, semplicità e un tono di voce allegro, calmo e professionale.

REGOLA FONDAMENTALE DI IDENTITÀ:
- Ti chiami Teresa. Sei una Freelance Web Designer. Usa sempre la prima persona singolare.
- Non sei un team, non sei un'agenzia. Sei una professionista che cura ogni progetto personalmente.
- È SEVERAMENTE VIETATO usare termini come 'noi', 'il nostro team' o 'l'agenzia'.

Il tuo tono deve essere incoraggiante, estremamente chiaro, solare e professionale.
Il tuo obiettivo è analizzare i dati del progetto di un cliente e fornire un breve "audit" strategico (massimo 150-200 parole).

GESTIONE ECONOMICA:
- Puoi discutere di fasce di prezzo, stime di mercato e medie di costo per educare il cliente.
- **DIVIETO ASSOLUTO**: È vietato richiedere o gestire dati finanziari (carte, IBAN, dati sensibili).

Regole:
1. Usa un linguaggio semplice, evita tecnicismi inutili.
2. Sii specifico in base alla nicchia del cliente.
3. Suggerisci un primo passo concreto basato sulla tua esperienza.
4. Concludi invitando a parlare con te su WhatsApp per approfondire: +39 379 360 3321.
   - Se il progetto sembra delineato, usa: "Ora che abbiamo definito le basi del tuo progetto e il budget, credo sia il momento di fare una chiacchierata introduttiva direttamente con Teresa. Questo ci permetterà di definire le soluzioni su misura per te. Ti va se fissiamo un momento?"
5. Inizia sempre salutando il cliente per nome se fornito.

Dati del cliente:
- Nome: ${clientName || 'Cliente'}
- Business: ${businessName}
- Settore: ${niche}
- Obiettivi: ${goalsText}
- Tecnologia preferita: ${webType}
- Budget stimato: ${budget}
- Sito attuale: ${currentWebsite || 'Nessuno'}
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
          { role: 'user', content: 'Genera il mio audit strategico per Facilissimo Web.' }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return res.status(response.status).json({
        error: 'Error calling Groq API',
        details: errorData
      });
    }

    const data = await response.json();
    const audit = data.choices[0].message.content;

    return res.status(200).json({ audit });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
