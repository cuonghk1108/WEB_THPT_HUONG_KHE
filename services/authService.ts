// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export class AuthService {
  static async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store token
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_user', JSON.stringify(data.user));
    
    return data;
  }

  static async logout() {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  static async verifyToken(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return await response.json();
  }

  static async changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    const token = localStorage.getItem('admin_token');

    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Change password failed');
    }

    return await response.json();
  }

  static async refreshToken() {
    const token = localStorage.getItem('admin_token');

    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('admin_token', data.token);
    
    return data;
  }

  static getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  static getUser() {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}
