
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export const askAi = async (prompt: string, history: ChatMessage[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "Você é um tutor de programação sênior. Responda em Português do Brasil. Ajude o aluno com explicações claras de código, exemplos e dicas de boas práticas para Java, JavaScript, C, C++, C#, HTML e CSS. Seja encorajador.",
    },
  });

  // Convert custom history to Gemini format if needed, but for simplicity we can send the current prompt
  // In a real app we would map the history array.
  try {
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Erro na API do Gemini:", error);
    return "Desculpe, tive um problema ao processar sua pergunta. Tente novamente!";
  }
};
