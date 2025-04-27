import axios from 'axios';

const API_BASE_URL = 'http://localhost:5079/api/studio'; 

const StudioService = {
  createLook: async (formData: FormData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-look`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Görünüm oluşturulamadı.');
    }
  },
  createLookWithJson: async (look: any) => { 
        try {
            const response = await axios.post(`${API_BASE_URL}/create-look`, look, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
             throw new Error(error.response?.data?.error || 'Görünüm oluşturulamadı.');
        }
    }
};

export {StudioService};