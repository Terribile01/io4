import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: 'dummy', apiVersion: 'v1' });

const originalRequest = ai.apiClient.request.bind(ai.apiClient);
ai.apiClient.request = async (options) => {
    console.log("PATH:", options.path);
    console.log("BODY:", options.body);
    return {
        ok: true,
        headers: new Headers(),
        json: async () => ({})
    };
};

try {
    await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: 'hi',
        config: { systemInstruction: 'be nice' }
    });
} catch (e) {
    // Ignore error since we returns empty json
}
