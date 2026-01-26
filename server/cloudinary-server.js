import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3333;

// Middleware - CORS phải trước cấu hình khác
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
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

// Root endpoint - API info
app.get('/', (req, res) => {
  console.log('📍 GET / - Info request');
  res.json({
    message: '🚀 Cloudinary Backend API',
    status: 'running',
    endpoints: {
      upload: 'POST /api/cloudinary/upload',
      signature: 'POST /api/cloudinary/signature',
      delete: 'POST /api/cloudinary/delete',
    },
    frontend: 'http://localhost:3000',
  });
});

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`\n📨 ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body size:', req.body ? JSON.stringify(req.body).length : 0);
  next();
});

// Generate signature for signed upload
app.post('/api/cloudinary/signature', (req, res) => {
  const { folder } = req.body;
  const timestamp = Math.round(Date.now() / 1000);

  const params = {
    timestamp,
    folder: folder || 'school',
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.VITE_CLOUDINARY_API_SECRET
  );

  res.json({
    signature,
    timestamp,
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
  });
});

// Upload image directly from server (alternative method)
app.post('/api/cloudinary/upload', async (req, res) => {
  try {
    console.log('📥 Received upload request');
    console.log('Body:', req.body ? 'Present' : 'Missing');
    
    const { image, folder } = req.body;

    if (!image) {
      console.error('❌ No image provided');
      return res.status(400).json({ error: 'No image provided' });
    }

    console.log('📤 Uploading to Cloudinary...');
    console.log('Folder:', folder || 'school');

    const result = await cloudinary.uploader.upload(image, {
      folder: folder || 'school',
      resource_type: 'auto',
    });

    console.log('✅ Upload success!');
    console.log('URL:', result.secure_url);

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

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cloudinary backend running on http://localhost:${PORT}`);
  console.log(`📸 Upload endpoint: http://localhost:${PORT}/api/cloudinary/upload`);
});
