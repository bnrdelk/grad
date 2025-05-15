import axios from "../../src/axios";

const API_BASE_URL = 'http://localhost:5079/api/studio';

const StudioService = {
  createLookWithJson: async (look) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-look-${look.method}`, look, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error occured.');
    }
  },
  shareLook: async (shareData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/share-look`, shareData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error occured.');
    }
  },
};

export { StudioService };