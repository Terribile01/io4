import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels(version) {
  try {
    console.log(`--- Ricerca modelli per versione: ${version || 'default'} ---`);
    const ai = version ? new GoogleGenAI({ apiKey, apiVersion: version }) : new GoogleGenAI({ apiKey });

    // The list() method returns a pager which is an async iterable
    const models = await ai.models.list();
    for await (const model of models) {
      console.log(`- ${model.name} (supporta: ${model.supportedGenerationMethods.join(', ')})`);
    }
  } catch (err) {
    console.error(`Errore (${version}): ${err.message}`);
  }
}

if (!apiKey) {
  console.error("ERRORE: GEMINI_API_KEY non trovata nell'ambiente.");
} else {
  await listModels('v1beta');
  console.log("");
  await listModels('v1');
}
