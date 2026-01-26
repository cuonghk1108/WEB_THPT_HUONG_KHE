import fs from 'fs';
import path from 'path';

const DATA_DIR = '/tmp';
const VISITOR_FILE = path.join(DATA_DIR, 'visitors.json');

interface VisitorData {
  count: number;
  firstVisit: string;
  lastUpdate: string;
}

function getVisitorData(): VisitorData {
  try {
    if (fs.existsSync(VISITOR_FILE)) {
      const data = fs.readFileSync(VISITOR_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading visitor data:', error);
  }

  return {
    count: 0,
    firstVisit: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
  };
}

function saveVisitorData(data: VisitorData): void {
  try {
    fs.writeFileSync(VISITOR_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving visitor data:', error);
  }
}

export default async function handler(req, res) {
  try {
    const method = req.method;

    if (method === 'GET') {
      // Get current visitor count
      const data = getVisitorData();
      return res.status(200).json({ success: true, count: data.count });
    }

    if (method === 'POST') {
      // Increment visitor count
      const data = getVisitorData();
      data.count += 1;
      data.lastUpdate = new Date().toISOString();
      saveVisitorData(data);

      return res.status(200).json({ success: true, count: data.count });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
