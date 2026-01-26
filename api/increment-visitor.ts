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

    // Fetch current data from JSONBin
    const fetchResponse = await fetch(`https://api.jsonbin.io/v3/b/${visitorBinId}`, {
      headers: {
        'X-Master-Key': apiKey,
      },
    });

    let visitorData: any = {
      total: 0,
      lastUpdate: new Date().toISOString(),
      daily: [],
    };

    if (fetchResponse.ok) {
      const data = await fetchResponse.json();
      visitorData = data.record || visitorData;
    }

    // Increment total
    visitorData.total = (visitorData.total || 0) + 1;
    visitorData.lastUpdate = new Date().toISOString();

    // Update daily count (UTC date)
    const today = new Date().toISOString().split('T')[0];
    const dailyEntry = visitorData.daily?.find((d: any) => d.date === today);

    if (dailyEntry) {
      dailyEntry.count += 1;
    } else {
      if (!visitorData.daily) visitorData.daily = [];
      visitorData.daily.push({ date: today, count: 1 });
    }

    // Keep only last 365 days
    if (visitorData.daily) {
      visitorData.daily = visitorData.daily
        .sort((a: any, b: any) => b.date.localeCompare(a.date))
        .slice(0, 365);
    }

    // Save to JSONBin
    const saveResponse = await fetch(`https://api.jsonbin.io/v3/b/${visitorBinId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey,
      },
      body: JSON.stringify(visitorData),
    });

    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      console.error('JSONBin save error:', saveResponse.status, errorText);
      return res.status(500).json({ 
        error: 'Lỗi khi lưu dữ liệu khách truy cập' 
      });
    }

    // Calculate stats
    const yearStart = new Date().getFullYear() + '-01-01';
    const weekStart = getWeekStartDate();
    let todayCount = 0;
    let weekCount = 0;
    let yearCount = 0;

    visitorData.daily?.forEach((daily: any) => {
      if (daily.date === today) {
        todayCount = daily.count;
      }
      if (daily.date >= weekStart) {
        weekCount += daily.count;
      }
      if (daily.date >= yearStart) {
        yearCount += daily.count;
      }
    });

    return res.status(200).json({
      success: true,
      stats: {
        today: todayCount,
        week: weekCount,
        year: yearCount,
        total: visitorData.total,
      },
    });
  } catch (error: any) {
    console.error('Increment visitor error:', error);
    return res.status(500).json({ 
      error: 'Có lỗi xảy ra khi cập nhật lượt truy cập' 
    });
  }
}

function getWeekStartDate(): string {
  const today = new Date();
  const dayOfWeek = today.getUTCDay();
  const subtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday-start week
  const weekStart = new Date(today);
  weekStart.setUTCDate(today.getUTCDate() - subtract);
  return weekStart.toISOString().split('T')[0];
}
