import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Configure Cloudinary - support both VITE_ and non-prefixed env vars
const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.VITE_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.VITE_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

console.log('🔧 Cloudinary Config:');
console.log('  Cloud name:', cloudName || '❌ Missing');
console.log('  API Key:', apiKey ? '✅ Set' : '❌ Missing');
console.log('  API Secret:', apiSecret ? '✅ Set' : '❌ Missing');

// ========== API Routes ==========

// Health check
app.get('/api/info', (req, res) => {
  res.json({ status: 'ok', message: 'School Backend API' });
});

// Simple ICS feed for Google Calendar / iCal
const formatDate = (date) => {
  // Expect JS Date; output in UTC yyyymmddThhmmssZ
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const buildIcs = (events) => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//THPT Huong Khe//Calendar//VN'
  ];

  events.forEach((ev) => {
    const block = [
      'BEGIN:VEVENT',
      `UID:${ev.uid}`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(ev.start)}`,
      `DTEND:${formatDate(ev.end)}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.description || ''}`,
    ];

    if (ev.location) block.push(`LOCATION:${ev.location}`);

    block.push('END:VEVENT');

    lines.push(...block);
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
};

// Minimal sample events so Google Calendar accepts the feed
const sampleExamEvents = [
  {
    uid: 'exam-1@example.com',
    title: 'Kiểm tra Toán (mẫu)',
    start: new Date(Date.now() + 24 * 60 * 60 * 1000),
    end: new Date(Date.now() + 25 * 60 * 60 * 1000),
    description: 'Sự kiện mẫu để đồng bộ Google Calendar',
    location: 'Phòng thi A1'
  }
];

const sampleScheduleEvents = [
  {
    uid: 'schedule-1@example.com',
    title: 'Tiết học (mẫu)',
    start: new Date(Date.now() + 2 * 60 * 60 * 1000),
    end: new Date(Date.now() + 3 * 60 * 60 * 1000),
    description: 'Sự kiện mẫu để đồng bộ Google Calendar',
    location: 'Phòng 101'
  }
];

app.get('/api/calendar', (req, res) => {
  const type = (req.query.type || 'exam').toLowerCase();
  const events = type === 'schedule' ? sampleScheduleEvents : sampleExamEvents;
  const ics = buildIcs(events);
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.send(ics);
});

// Upload image to Cloudinary
app.post('/api/cloudinary/upload', async (req, res) => {
  try {
    console.log('📥 Received upload request');
    
    const { image, folder } = req.body;

    if (!image) {
      console.error('❌ No image provided');
      return res.status(400).json({ error: 'No image provided' });
    }

    console.log('📤 Uploading to Cloudinary, folder:', folder || 'school');

    const result = await cloudinary.uploader.upload(image, {
      folder: folder || 'school',
      resource_type: 'auto',
    });

    console.log('✅ Upload success:', result.secure_url);

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    console.error('Error details:', error);
    
    // Check if Cloudinary config is missing
    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({
        success: false,
        error: 'Cloudinary credentials not configured',
        details: { cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret }
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Upload failed',
    });
  }
});

// Delete image
app.post('/api/cloudinary/delete', async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ error: 'No public_id provided' });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== Vite Dev Server ==========

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware (must be before static)
  app.use(vite.middlewares);

  // SPA fallback - serve index.html for non-API routes
  app.get('/', (req, res, next) => {
    vite.transformIndexHtml('/', fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')).then(html => {
      res.type('html').send(html);
    }).catch(next);
  });

  app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║  🚀 School Management System Running      ║');
    console.log('║  📱 Frontend: http://localhost:3000/      ║');
    console.log('║  🔌 API: http://localhost:3000/api/       ║');
    console.log('║  📸 Upload: POST /api/cloudinary/upload   ║');
    console.log('╚════════════════════════════════════════════╝\n');
  });
}

startServer().catch(err => {
  console.error('❌ Server error:', err);
  process.exit(1);
});
