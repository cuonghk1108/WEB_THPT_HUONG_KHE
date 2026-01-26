import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Configure Cloudinary with environment variables
    cloudinary.config({
      cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.VITE_CLOUDINARY_API_KEY,
      api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
    });

    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    console.log('📤 Uploading to Cloudinary, folder:', folder || 'school');

    const result = await cloudinary.uploader.upload(image, {
      folder: folder || 'school',
      resource_type: 'auto',
    });

    console.log('✅ Upload success:', result.secure_url);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Upload failed',
    });
  }
}
