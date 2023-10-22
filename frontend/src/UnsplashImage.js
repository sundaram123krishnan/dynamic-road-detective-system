import axios from 'axios';

const UnsplashImage = {
  async getImageUrl() {
    try {
      // Make a request to the Unsplash API (you may need to sign up for an API key)
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'YOUR_UNSPLASH_API_KEY',
          query: 'city', // You can specify your desired query
        },
      });

      // Extract the image URL from the Unsplash API response
      if (response.data.urls && response.data.urls.full) {
        return response.data.urls.full;
      } else {
        throw new Error('Image URL not found in response.');
      }
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      throw error;
    }
  },
};

export default UnsplashImage;