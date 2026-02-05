import { GoogleGenAI } from "@google/genai";

// 簡單獲取 API Key，允許 Vite 在建置時直接進行字串替換
// @ts-ignore: process 可能在瀏覽器環境中未定義，但 Vite 會替換這個變數
const apiKey = process.env.API_KEY || "";

const ai = new GoogleGenAI({ apiKey });

export const getAiTutorResponse = async (
  userQuery: string, 
  currentContext: string
): Promise<string> => {
  try {
    const systemPrompt = `
      You are "EcoBot", a friendly and knowledgeable AI tutor for the EcoAcademy platform.
      Your goal is to educate users about environmental science, sustainability, and conservation.
      
      Tone: Encouraging, educational, and fun. Suitable for students and families.
      Context: The user is currently viewing: ${currentContext}.
      
      Keep answers concise (under 100 words) unless asked for more detail.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "I'm sorry, I couldn't think of an answer right now. Try again regarding nature!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the nature network. Please ensure your Vercel Environment Variables are set up correctly.";
  }
};