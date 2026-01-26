/**
 * Sends a chat message to the Gemini API via secure server endpoint.
 * API key is stored server-side for security.
 */
export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error calling chat API:", error);
    throw error;
  }
};