// Visitor counter using serverless API
export const visitorCounter = {
  async getVisitorCount(): Promise<number> {
    try {
      const response = await fetch('/api/visitors', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        return data.count || 0;
      }

      return 0;
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      return 0;
    }
  },

  async incrementVisitor(): Promise<number> {
    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        return data.count || 0;
      }

      return 0;
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
      return 0;
    }
  },
};
