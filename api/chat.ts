import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Kiến thức về trường
const SCHOOL_KNOWLEDGE_BASE = `
Bạn là trợ lý ảo của THPT Hương Khê.

THÔNG TIN CƠ BẢN:
- Tên: Trường THPT Hương Khê
- Địa chỉ: Hương Khê, Hà Tĩnh
- Website: https://thpthuongkhe.vercel.app

NHIỆM VỤ:
- Trả lời các câu hỏi về tuyển sinh, lịch học, hoạt động ngoại khoá
- Hỗ trợ học sinh, phụ huynh và giáo viên
- Cung cấp thông tin nhanh, chính xác, thân thiện

HẠN CHẾ:
- Không cung cấp thông tin cá nhân của học sinh/giáo viên
- Không trả lời các câu hỏi không liên quan đến trường
- Nếu không biết, hãy khuyên người dùng liên hệ văn phòng trường
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Chatbot chưa được cấu hình. Vui lòng liên hệ quản trị viên.' 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
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

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return res.status(200).json({ response });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    if (error.message?.includes('429')) {
      return res.status(429).json({ 
        error: 'Đã vượt hạn mức sử dụng API. Vui lòng thử lại sau.' 
      });
    }

    return res.status(500).json({ 
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' 
    });
  }
}
