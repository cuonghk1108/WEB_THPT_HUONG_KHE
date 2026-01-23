// Cloud storage using JSONBin.io (free tier - 100k requests/month)
// Create your own bin at https://jsonbin.io

const JSONBIN_API_KEY = '$2a$10$bkywhTiV1oToNcOUSc0brulL8H/qWccAMLCxd5ULfKNCUY2pMbLku'; // Replace with your key from jsonbin.io
const BIN_ID = '697323b7d0ea881f407ef5ba'; // Replace with your bin ID

interface StorageData {
  globalImages: any;
  news: any[];
  teachers: any[];
  clubs: any[];
  gallery: any[];
  lastUpdate: string;
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

  // Upload image to ImgBB
  async uploadImage(base64Image: string): Promise<string | null> {
    try {
      // Free ImgBB API key (you should get your own at https://api.imgbb.com/)
      const imgbbKey = 'e4842617bd1d406a719f793133917064'; // Replace with your key
      
      const formData = new URLSearchParams();
      formData.append('image', base64Image.split(',')[1]);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        return data.data.url;
      }
      
      return null;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },
};
