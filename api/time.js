export default async function handler(req, res) {
  try {
    const now = Date.now();
    res.status(200).json({ epochMs: now, nowUtc: new Date(now).toISOString() });
  } catch (e) {
    res.status(500).json({ error: 'Failed to get server time' });
  }
}