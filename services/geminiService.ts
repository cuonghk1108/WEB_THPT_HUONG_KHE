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
      let errorDetail: any = null;
      try {
        errorDetail = await response.json();
      } catch {
        errorDetail = await response.text();
      }
      const messageFromServer =
        typeof errorDetail === 'string' ? errorDetail : errorDetail?.error;
      throw new Error(messageFromServer || 'Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error calling chat API:", error);
    throw error;
  }
};