import { GoogleGenerativeAI } from "@google/generative-ai";
import { SCHOOL_KNOWLEDGE_BASE } from "../constants";

// --- CẤU HÌNH API KEY TẠI ĐÂY ---
const HARDCODED_API_KEY = "AIzaSyD-xHkY5JbhU0iZIPvAywtd-l7tguGOkmU"; 

/**
 * Creates a new Chat Session with the school's knowledge base.
 */
export const createChatSession = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || HARDCODED_API_KEY;
  
  if (!apiKey || apiKey === "") {
    console.warn("Chưa cấu hình Gemini API Key.");
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SCHOOL_KNOWLEDGE_BASE,
    });
    
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
      history: [],
    });
    
    return chat;
  } catch (error) {
    console.error("Error creating Gemini chat session:", error);
    return null;
  }
};