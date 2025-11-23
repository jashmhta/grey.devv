import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
// Initialize safely, though usage should be guarded in components if key is missing
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const askGreyAI = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    return "Configuration Error: API Key is missing. Please check your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are "GREY AI", the sophisticated virtual concierge for GREY, a luxury digital agency. 
        Your tone is minimal, elegant, and highly professional. 
        We provide elite web development, app creation, and branding services.
        Keep your responses concise (under 50 words), slightly mysterious, and extremely polite.
        Do not use emojis.`,
      }
    });
    
    return response.text || "I am currently meditating on that thought. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to the digital ether has been disrupted. Please try again later.";
  }
};
