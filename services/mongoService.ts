/**
 * MongoDB + Node.js Backend Service
 * Replaces Supabase service with HTTP calls to backend
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const mongoService = {
  // ===== NEWS =====
  async getAllNews() {
    try {
      const response = await fetch(`${API_BASE}/news`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching news:', error);
      return [];
    }
  },

  async addNews(newsData: any) {
    try {
      const response = await fetch(`${API_BASE}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding news:', error);
      return null;
    }
  },

  async updateNews(id: string, newsData: any) {
    try {
      const response = await fetch(`${API_BASE}/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating news:', error);
      return null;
    }
  },

  async deleteNews(id: string) {
    try {
      const response = await fetch(`${API_BASE}/news/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting news:', error);
      return null;
    }
  },

  // ===== GALLERY =====
  async getAllGallery() {
    try {
      const response = await fetch(`${API_BASE}/gallery`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching gallery:', error);
      return [];
    }
  },

  async addGalleryImage(imageData: any) {
    try {
      console.log('📤 [mongoService] Adding gallery image to:', `${API_BASE}/gallery`, imageData);
      const response = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData)
      });
      console.log('✅ [mongoService] Gallery response status:', response.status);
      const result = await response.json();
      console.log('✅ [mongoService] Gallery response:', result);
      return result;
    } catch (error) {
      console.error('❌ [mongoService] Error adding gallery image:', error);
      return null;
    }
  },

  async updateGalleryImage(id: string, imageData: any) {
    try {
      const response = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating gallery image:', error);
      return null;
    }
  },

  async deleteGalleryImage(id: string) {
    try {
      const response = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting gallery image:', error);
      return null;
    }
  },

  // ===== TEACHERS =====
  async getAllTeachers() {
    try {
      const response = await fetch(`${API_BASE}/teachers`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching teachers:', error);
      return [];
    }
  },

  async addTeacher(teacherData: any) {
    try {
      const response = await fetch(`${API_BASE}/teachers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding teacher:', error);
      return null;
    }
  },

  async updateTeacher(id: string, teacherData: any) {
    try {
      const response = await fetch(`${API_BASE}/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating teacher:', error);
      return null;
    }
  },

  async deleteTeacher(id: string) {
    try {
      const response = await fetch(`${API_BASE}/teachers/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting teacher:', error);
      return null;
    }
  },

  // ===== CLUBS =====
  async getAllClubs() {
    try {
      const response = await fetch(`${API_BASE}/clubs`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching clubs:', error);
      return [];
    }
  },

  async addClub(clubData: any) {
    try {
      const response = await fetch(`${API_BASE}/clubs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clubData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding club:', error);
      return null;
    }
  },

  async updateClub(id: string, clubData: any) {
    try {
      const response = await fetch(`${API_BASE}/clubs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clubData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating club:', error);
      return null;
    }
  },

  async deleteClub(id: string) {
    try {
      const response = await fetch(`${API_BASE}/clubs/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting club:', error);
      return null;
    }
  },

  // ===== EVENTS =====
  async getAllEvents() {
    try {
      const response = await fetch(`${API_BASE}/events`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching events:', error);
      return [];
    }
  },

  async addEvent(eventData: any) {
    try {
      const response = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding event:', error);
      return null;
    }
  },

  async updateEvent(id: string, eventData: any) {
    try {
      const response = await fetch(`${API_BASE}/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating event:', error);
      return null;
    }
  },

  async deleteEvent(id: string) {
    try {
      const response = await fetch(`${API_BASE}/events/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting event:', error);
      return null;
    }
  }
};
