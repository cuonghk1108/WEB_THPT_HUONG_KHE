import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const XAI_API_KEY = process.env.XAI_API_KEY;
    
    if (!XAI_API_KEY) {
      console.error('XAI_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'Chatbot chưa được cấu hình. Vui lòng liên hệ quản trị viên.' 
      });
    }

    // Call xAI Grok API
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `Bạn là trợ lý ảo thông minh của trường THPT Hương Khê. 
Nhiệm vụ của bạn là hỗ trợ học sinh, phụ huynh và khách tham quan về:
- Thông tin tuyển sinh
- Lịch học, thời khóa biểu
- Thông tin giáo viên, câu lạc bộ
- Tin tức, sự kiện nhà trường
- Văn bản, quy định
- Thành tích học sinh

Hãy trả lời một cách thân thiện, chuyên nghiệp và chính xác.
Nếu không chắc chắn, hãy gợi ý liên hệ văn phòng nhà trường.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        model: 'grok-beta',
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('xAI API error:', errorText);
      return res.status(response.status).json({ 
        error: 'Không thể kết nối với Grok AI. Vui lòng thử lại sau.' 
      });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời câu hỏi này.';

    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.' 
    });
  }
}
