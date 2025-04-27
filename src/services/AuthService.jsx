import axios from "axios";

const API_URL = "http://localhost:5079/api/auth";

const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Kullanıcı kaydı başarısız oldu.");
  }
};

export { registerUser };
