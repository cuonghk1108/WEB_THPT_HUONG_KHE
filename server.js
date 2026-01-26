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

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

console.log('🔧 Cloudinary Config:');
console.log('  Cloud name:', process.env.VITE_CLOUDINARY_CLOUD_NAME);
console.log('  API Key:', process.env.VITE_CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('  API Secret:', process.env.VITE_CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');

// ========== API Routes ==========

// Health check
app.get('/api/info', (req, res) => {
  res.json({ status: 'ok', message: 'School Backend API' });
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
    res.status(500).json({
      success: false,
      error: error.message,
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
