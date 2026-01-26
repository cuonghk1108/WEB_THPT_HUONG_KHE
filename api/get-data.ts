import { VercelRequest, VercelResponse } from '@vercel/node';

// Fetch data from Supabase table `app_data` (row id='main')
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
    const supabaseUrl = (process.env.SUPABASE_URL || '').trim();
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

    if (!supabaseUrl) {
      console.error('SUPABASE_URL not configured');
      return res.status(500).json({ error: 'SUPABASE_URL chưa được cấu hình.' });
    }

    if (!serviceRoleKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not configured');
      return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY chưa được cấu hình.' });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/app_data?id=eq.main&select=data,updated_at`, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Lỗi khi tải dữ liệu từ Supabase' });
    }

    const json = await response.json();
    const record = json?.[0];
    return res.status(200).json({ success: true, data: record?.data || null, updated_at: record?.updated_at });
  } catch (error) {
    console.error('Get data error:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi tải dữ liệu.' });
  }
}
