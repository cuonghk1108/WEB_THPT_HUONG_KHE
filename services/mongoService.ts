const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const mongoService = {
  async getAllNews() {
    const response = await fetch(`${API_BASE}/api/news`);
    return await response.json();
  },

  async addNews(newsData: any) {
    const response = await fetch(`${API_BASE}/api/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsData)
    });
    return await response.json();
  },

  async updateNews(id: string, newsData: any) {
    const response = await fetch(`${API_BASE}/api/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsData)
    });
    return await response.json();
  },

  async deleteNews(id: string) {
    const response = await fetch(`${API_BASE}/api/news/${id}`, { method: 'DELETE' });
    return await response.json();
  },

  async getAllGallery() {
    const response = await fetch(`${API_BASE}/api/gallery`);
    return await response.json();
  },

  async addGalleryImage(imageData: any) {
    const response = await fetch(`${API_BASE}/api/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData)
    });
    return await response.json();
  },

  async updateGalleryImage(id: string, imageData: any) {
    const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imageData)
    });
    return await response.json();
  },

  async deleteGalleryImage(id: string) {
    const response = await fetch(`${API_BASE}/api/gallery/${id}`, { method: 'DELETE' });
    return await response.json();
  },

  async getAllTeachers() {
    const response = await fetch(`${API_BASE}/api/teachers`);
    return await response.json();
  },

  async addTeacher(teacherData: any) {
    const response = await fetch(`${API_BASE}/api/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    return await response.json();
  },

  async updateTeacher(id: string, teacherData: any) {
    const response = await fetch(`${API_BASE}/api/teachers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherData)
    });
    return await response.json();
  },

  async deleteTeacher(id: string) {
    const response = await fetch(`${API_BASE}/api/teachers/${id}`, { method: 'DELETE' });
    return await response.json();
  },

  async getAllClubs() {
    const response = await fetch(`${API_BASE}/api/clubs`);
    return await response.json();
  },

  async addClub(clubData: any) {
    const response = await fetch(`${API_BASE}/api/clubs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubData)
    });
    return await response.json();
  },

  async updateClub(id: string, clubData: any) {
    const response = await fetch(`${API_BASE}/api/clubs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubData)
    });
    return await response.json();
  },

  async deleteClub(id: string) {
    const response = await fetch(`${API_BASE}/api/clubs/${id}`, { method: 'DELETE' });
    return await response.json();
  },

  async getAllEvents() {
    const response = await fetch(`${API_BASE}/api/events`);
    return await response.json();
  },

  async addEvent(eventData: any) {
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    return await response.json();
  },

  async updateEvent(id: string, eventData: any) {
    const response = await fetch(`${API_BASE}/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    return await response.json();
  },

  async deleteEvent(id: string) {
    const response = await fetch(`${API_BASE}/api/events/${id}`, { method: 'DELETE' });
    return await response.json();
  }
};
