import axios from "../../src/axios";

const API_URL = "http://localhost:5079/api/auth";

const registerUser = async (username, name, password) => {
  try {
    console.log(username +'' + name + '' + password)
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      name
    });

    return response.data;
  } catch (error) {
    throw new Error("Kullanıcı kaydı başarısız oldu.");
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    throw new Error("Giriş başarısız oldu.");
  }
};

export { registerUser, loginUser };
