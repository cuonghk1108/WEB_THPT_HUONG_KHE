import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = (process.env.JSONBIN_API_KEY || '').trim();
    const visitorBinId = (process.env.VITE_VISITOR_BIN_ID || '').trim();

    if (!apiKey) {
      console.error('JSONBIN_API_KEY not configured');
      return res.status(500).json({ 
        error: 'JSONBin API key chưa được cấu hình.' 
      });
    }

    if (!visitorBinId) {
      console.error('VITE_VISITOR_BIN_ID not configured');
      return res.status(500).json({ 
        error: 'Visitor Bin ID chưa được cấu hình.' 
      });
    }

    // Fetch visitor data from JSONBin with API key
    const response = await fetch(`https://api.jsonbin.io/v3/b/${visitorBinId}`, {
      headers: {
        'X-Master-Key': apiKey,
      },
    });

    if (!response.ok) {
      console.error('JSONBin API error:', response.status);
      return res.status(response.status).json({ 
        error: 'Lỗi khi lấy dữ liệu khách truy cập' 
      });
    }

    const data = await response.json();
    const visitorData = data.record || { total: 0, lastUpdate: new Date().toISOString(), daily: [] };

    return res.status(200).json({ success: true, data: visitorData });
  } catch (error: any) {
    console.error('Get visitor data error:', error);
    return res.status(500).json({ 
      error: 'Có lỗi xảy ra khi lấy dữ liệu khách truy cập' 
    });
  }
}
