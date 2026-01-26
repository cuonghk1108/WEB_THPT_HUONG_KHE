import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    cloudinary.config({
      cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.VITE_CLOUDINARY_API_KEY,
      api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
    });

    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: 'No public_id provided' });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('❌ Delete error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
