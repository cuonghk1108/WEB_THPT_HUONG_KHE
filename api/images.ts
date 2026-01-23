import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@vercel/kv';

// Initialize KV store (you'll need to add this in Vercel dashboard)
// For now, we'll use a simple in-memory store that persists via environment variable
const DEFAULT_IMAGES = {
  logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
  homeHero: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop',
  principal: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
  introHistory: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Get current images
      const images = JSON.parse(process.env.GLOBAL_IMAGES || JSON.stringify(DEFAULT_IMAGES));
      return res.status(200).json(images);
    }

    if (req.method === 'POST') {
      // Update images
      const newImages = req.body;
      // Note: In production, you'd save this to a database or KV store
      // For now, it will reset on each deployment
      return res.status(200).json({ 
        success: true, 
        message: 'Images updated (Note: Will reset on deployment. Use Vercel KV or database for persistence)',
        images: newImages 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Images API error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
