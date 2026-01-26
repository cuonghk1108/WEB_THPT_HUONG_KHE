import { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

// Save data to Upstash Redis (Vercel KV replacement)
export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const data = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Save to Redis with key 'school:data'
    await redis.set('school:data', JSON.stringify({
      ...data,
      lastUpdate: new Date().toISOString(),
    }));

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Save data error:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại sau.' });
  }
}
