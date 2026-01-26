import { VercelRequest, VercelResponse } from '@vercel/node';

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
    const apiKey = (process.env.JSONBIN_API_KEY || '').trim();
    const binId = (process.env.JSONBIN_BIN_ID || '').trim();

    if (!apiKey) {
      console.error('JSONBIN_API_KEY not configured');
      return res.status(500).json({ 
        error: 'JSONBin API key chưa được cấu hình. Vui lòng liên hệ quản trị viên.' 
      });
    }

    if (!binId) {
      console.error('JSONBIN_BIN_ID not configured');
      return res.status(500).json({ 
        error: 'JSONBin ID chưa được cấu hình.' 
      });
    }

    const data = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Save to JSONBin
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('JSONBin API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Lỗi khi lưu dữ liệu lên JSONBin' 
      });
    }

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.error('Save data error:', error);
    return res.status(500).json({ 
      error: 'Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại sau.' 
    });
  }
}
