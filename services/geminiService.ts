import { GoogleGenAI, Chat } from "@google/genai";
import { SCHOOL_KNOWLEDGE_BASE } from "../constants";

// --- CẤU HÌNH API KEY TẠI ĐÂY ---
// Bạn hãy dán API Key của bạn vào giữa dấu ngoặc kép bên dưới.
// Ví dụ: const HARDCODED_API_KEY = "AIzaSyDaMz...";
const HARDCODED_API_KEY = "AIzaSyDph-VSpQQ1zh5yXlSN_qWerr4Omk0-47E"; 

/**
 * Creates a new Chat Session with the school's knowledge base.
 */
export const createChatSession = (): Chat | null => {
  // Ưu tiên lấy từ biến môi trường, nếu không có thì lấy từ biến cứng phía trên
  const apiKey = process.env.API_KEY || HARDCODED_API_KEY;
  
  if (!apiKey || apiKey === "") {
    console.warn("Chưa cấu hình Gemini API Key. Vui lòng thêm Key vào services/geminiService.ts");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SCHOOL_KNOWLEDGE_BASE,
        temperature: 0.7,
      },
    });
    return chat;
  } catch (error) {
    console.error("Error creating Gemini chat session:", error);
    return null;
  }
};