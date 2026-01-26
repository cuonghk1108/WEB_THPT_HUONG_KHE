// Visitor counter using JSONBin.io
const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY || '';
const VISITOR_BIN_ID = import.meta.env.VITE_VISITOR_BIN_ID || '';

interface VisitorData {
  count: number;
  firstVisit: string;
  lastUpdate: string;
}

export const visitorCounter = {
  async getVisitorCount(): Promise<number> {
    try {
      if (!VISITOR_BIN_ID || !JSONBIN_API_KEY) {
        console.log('Visitor counter not configured');
        return 0;
      }

      const response = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.record?.count || 0;
      }

      return 0;
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      return 0;
    }
  },

  async incrementVisitor(): Promise<number> {
    try {
      if (!VISITOR_BIN_ID || !JSONBIN_API_KEY) {
        console.log('Visitor counter not configured');
        return 0;
      }

      // Get current count
      const response = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
        },
      });

      let visitorData: VisitorData;

      if (response.ok) {
        const data = await response.json();
        visitorData = data.record || { count: 0, firstVisit: new Date().toISOString(), lastUpdate: new Date().toISOString() };
      } else {
        // Create new counter
        visitorData = {
          count: 1,
          firstVisit: new Date().toISOString(),
          lastUpdate: new Date().toISOString(),
        };
      }

      // Increment count
      visitorData.count += 1;
      visitorData.lastUpdate = new Date().toISOString();

      // Update bin
      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
        },
        body: JSON.stringify(visitorData),
      });

      if (updateResponse.ok) {
        return visitorData.count;
      }

      return 0;
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
      return 0;
    }
  },
};
