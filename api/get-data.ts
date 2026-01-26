import { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

// Fetch data from Upstash Redis
export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const dataStr = await redis.get('school:data');
    const data = dataStr ? (typeof dataStr === 'string' ? JSON.parse(dataStr) : dataStr) : null;
    
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Get data error:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi tải dữ liệu.' });
  }
}
