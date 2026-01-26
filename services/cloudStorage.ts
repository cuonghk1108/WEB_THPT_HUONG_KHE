// Cloud storage using JSONBin.io (free tier - 100k requests/month)
// Create your own bin at https://jsonbin.io

const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY || '';
const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID || '';

// Cloudinary configuration (free tier - 25GB storage, 25GB bandwidth/month)
// Get your credentials at https://cloudinary.com
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''; // unsigned preset
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || '';

interface StorageData {
  globalImages?: any;
  news?: any[];
  teachers?: any[];
  clubs?: any[];
  gallery?: any[];
  studentCorner?: any;
  achievementYears?: any[];
  digitalLibrary?: any[];
  studentPortal?: any;
  announcements?: any[];
  events?: any[];
  lastUpdate?: string;
}

export const cloudStorage = {
  async fetchData(): Promise<StorageData | null> {
    try {
      // Try JSONBin first
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.record;
      }
      
      // Fallback to local file
      const localResponse = await fetch('/data/school-data.json');
      if (localResponse.ok) {
        return await localResponse.json();
      }
      
      return null;
    } catch (error) {
      console.log('Using local storage only');
      return null;
    }
  },

  async saveData(data: Partial<StorageData>): Promise<boolean> {
    try {
      // Read current data
      const currentData = await this.fetchData() || {};
      const updatedData = {
        ...currentData,
        ...data,
        lastUpdate: new Date().toISOString(),
      };

      // Save to JSONBin
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
        },
        body: JSON.stringify(updatedData),
      });

      return response.ok;
    } catch (error) {
      console.error('Error saving to cloud:', error);
      return false;
    }
  },

  // Upload image to Cloudinary via backend (signed upload - secure)
  async uploadImage(base64Image: string, folder: string = 'school'): Promise<string | null> {
    try {
      console.log('🚀 Starting upload process...');
      console.log('📁 Folder:', folder);
      console.log('📦 Image size:', base64Image.length, 'bytes');

      if (!base64Image || base64Image.length === 0) {
        console.error('❌ Image is empty!');
        return null;
      }

      console.log('📤 Sending request to /api/upload');

      // Call backend API - use relative path for both local and production
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          folder: folder,
        }),
      });

      console.log('📨 Response status:', response.status);
      console.log('📨 Response headers:', response.headers);

      const data = await response.json();
      console.log('📦 Backend response:', JSON.stringify(data, null, 2));

      if (data.success && data.url) {
        console.log('✅ Upload success! URL:', data.url);
        return data.url;
      } else if (data.error) {
        console.error('❌ Upload error:', data.error);
      } else {
        console.error('❌ Unexpected response:', data);
      }

      return null;
    } catch (error) {
      console.error('❌ Error uploading to Cloudinary:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return null;
    }
  },

  // Get optimized image URL from Cloudinary
  getOptimizedUrl(imageUrl: string, options?: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }): string {
    if (!imageUrl.includes('cloudinary.com')) {
      return imageUrl; // Return original if not Cloudinary URL
    }

    const { width, height, quality = 'auto', format = 'auto' } = options || {};
    
    // Insert transformation parameters into Cloudinary URL
    const transformations = [
      width && `w_${width}`,
      height && `h_${height}`,
      `q_${quality}`,
      format && `f_${format}`,
      'c_limit', // Don't upscale
    ].filter(Boolean).join(',');

    return imageUrl.replace('/upload/', `/upload/${transformations}/`);
  },
};
