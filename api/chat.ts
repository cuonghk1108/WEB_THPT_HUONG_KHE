import { VercelRequest, VercelResponse } from '@vercel/node';

// Kiến thức về trường
const SCHOOL_KNOWLEDGE_BASE = `
Bạn là trợ lý ảo của THPT Hương Khê. Trả lời bằng tiếng Việt, giọng thân thiện, súc tích nhưng đủ chi tiết.

THÔNG TIN CƠ BẢN:
- Tên: Trường THPT Hương Khê
- Địa chỉ: Hương Khê, Hà Tĩnh
- Website: https://thpthuongkhe.vercel.app

NGUỒN THÔNG TIN:
- Ưu tiên sử dụng toàn bộ thông tin/tin tức đang có trên website trường (các trang Admissions, News, Documents, Gallery, Teachers, Student Corner, v.v.).
- Kết hợp thêm hiểu biết chung của mô hình khi câu hỏi vượt ngoài nội dung site, nhưng vẫn giữ liên quan và an toàn.

PHONG CÁCH & ĐỘ DÀI:
- Câu trả lời nên mở rộng, giàu thông tin, có cấu trúc rõ (gạch đầu dòng/đoạn ngắn).
- Với câu hỏi chung, cung cấp tóm tắt nhanh và thêm chi tiết cần thiết (thủ tục, mốc thời gian, liên hệ gợi ý).
- Nếu câu trả lời dài, ưu tiên phần chính trước rồi bổ sung chi tiết, ví dụ: “Tóm tắt” và “Chi tiết”.
- Giọng điệu vui nhộn, thân thiện nhưng vẫn tôn trọng; không dài dòng lan man.

GHI CHÚ ĐẶC BIỆT:
- Nếu người dùng hỏi ai code/phát triển/dev hệ thống này, trả lời: "Võ Xuân Cường, học sinh lớp A1 khóa 59".
- Có thể trả lời các câu hỏi chung (kiến thức, mẹo học tập, công nghệ, đời sống) nếu phù hợp và an toàn, nhưng ưu tiên thông tin liên quan trường. Nếu câu hỏi vượt phạm vi hoặc nhạy cảm, lịch sự từ chối hoặc hướng dẫn nguồn tin cậy.
- Nếu được hỏi về học sinh Trần Kim Nhật: trả lời là học sinh giỏi quốc gia môn Tin học, đạt giải Nhì.

NHIỆM VỤ:
- Trả lời về tuyển sinh, lịch học, hoạt động ngoại khoá, thông báo, hỗ trợ học sinh/phụ huynh/giáo viên.
- Cung cấp thông tin nhanh, chính xác, thân thiện; gợi ý bước tiếp theo hoặc nơi liên hệ khi phù hợp.

HẠN CHẾ:
- Không cung cấp thông tin cá nhân của học sinh/giáo viên.
- Không trả lời các câu hỏi không liên quan đến trường.
- Nếu không biết, khuyên người dùng liên hệ văn phòng trường hoặc truy cập website.
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

    const apiKey = (process.env.GROK_API_KEY || '').trim();

    if (!apiKey) {
      console.error('GROK_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Chatbot chưa được cấu hình. Vui lòng liên hệ quản trị viên.' 
      });
    }

    // Call Grok API (OpenAI-compatible endpoint)
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-4-1-fast-non-reasoning',
        messages: [
          {
            role: 'system',
            content: SCHOOL_KNOWLEDGE_BASE,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 20000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Grok API error:', response.status, errorData);
      
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Đã vượt hạn mức sử dụng API. Vui lòng thử lại sau.' 
        });
      }
      
      if (response.status === 401) {
        return res.status(401).json({
          error: 'Khóa API không hợp lệ hoặc đã hết hạn. Vui lòng liên hệ quản trị viên.'
        });
      }
      
      throw new Error(`Grok API returned ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices?.[0]?.message?.content || 'Không có phản hồi từ AI';

    return res.status(200).json({ response: botResponse });
  } catch (error: any) {
    console.error('Grok API error:', error);

    const message: string = error?.message || '';

    if (message.includes('429')) {
      return res.status(429).json({ 
        error: 'Đã vượt hạn mức sử dụng API. Vui lòng thử lại sau.' 
      });
    }

    if (
      message.includes('API key not valid') ||
      message.includes('API_KEY_INVALID') ||
      message.includes('permission') ||
      message.includes('PERMISSION_DENIED')
    ) {
      return res.status(401).json({
        error: 'Khóa API không hợp lệ hoặc đã hết hạn. Vui lòng liên hệ quản trị viên.'
      });
    }

    return res.status(500).json({ 
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' 
    });
  }
}
