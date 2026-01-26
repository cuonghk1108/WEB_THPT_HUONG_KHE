// Cloud storage using JSONBin.io (free tier - 100k requests/month)
// Create your own bin at https://jsonbin.io
// Note: API keys are handled server-side only for security

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID || '';

// Cloudinary configuration (free tier - 25GB storage, 25GB bandwidth/month)
// Get your credentials at https://cloudinary.com
// Note: API key/secret handled server-side; only public config here
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''; // unsigned preset

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
      // Try JSONBin first (public read endpoint)
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`);
      
      
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
      // Read current data from localStorage first (more reliable than fetch)
      let currentData: StorageData = {};
      
      try {
        const localGlobalImages = localStorage.getItem('school_images');
        const localNews = localStorage.getItem('school_news');
        const localTeachers = localStorage.getItem('school_teachers');
        const localClubs = localStorage.getItem('school_clubs');
        const localGallery = localStorage.getItem('school_gallery');
        const localStudentCorner = localStorage.getItem('school_student_corner');
        const localAchievementYears = localStorage.getItem('school_achievement_years');
        const localDigitalLibrary = localStorage.getItem('school_digital_library');
        const localStudentPortal = localStorage.getItem('school_student_portal');

        currentData = {
          globalImages: localGlobalImages ? JSON.parse(localGlobalImages) : undefined,
          news: localNews ? JSON.parse(localNews) : undefined,
          teachers: localTeachers ? JSON.parse(localTeachers) : undefined,
          clubs: localClubs ? JSON.parse(localClubs) : undefined,
          gallery: localGallery ? JSON.parse(localGallery) : undefined,
          studentCorner: localStudentCorner ? JSON.parse(localStudentCorner) : undefined,
          achievementYears: localAchievementYears ? JSON.parse(localAchievementYears) : undefined,
          digitalLibrary: localDigitalLibrary ? JSON.parse(localDigitalLibrary) : undefined,
          studentPortal: localStudentPortal ? JSON.parse(localStudentPortal) : undefined,
        };
      } catch (e) {
        console.error('Error reading localStorage:', e);
      }

      const updatedData = {
        ...currentData,
        ...data,
        lastUpdate: new Date().toISOString(),
      };

      // Save to JSONBin via serverless function to protect API key
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Save error:', errorData);
      }

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
