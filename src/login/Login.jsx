import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ImInfo } from "react-icons/im";
import { BiUser } from "react-icons/bi";
import axios from "../../src/axios";
import { loginUser } from "../services/AuthService";
import { toast, Toaster } from "sonner";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const [formState, setFormState] = useState({
    errors: null,
    enteredValues: {
      username: "",
      password: "",
    },
  });

  const loginAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
  
    let errors = [];
  
    if (!username) errors.push("Username cannot be empty.");
    if (!password) errors.push("Password cannot be empty.");
  
    if (errors.length > 0) {
      setFormState({ errors, enteredValues: { username, password } });
      toast.error("Please check the form errors.");
    } else {
      try {
        const data = await loginUser(username, password);
        saveToken(data.token);
        setFormState({ errors: null, enteredValues: { username: "", password: "" } });
        toast.success("Login successful!");
        window.location.reload();
      } catch (err) {
        toast.error(`Login failed. Incorrect Username or Password.`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-full max-w-sm md:max-w-md lg:max-w-md flex-col flex items-center" onSubmit={loginAction}>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl">
            <BiUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              defaultValue={formState.enteredValues.username}
            />
          </div>
          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              defaultValue={formState.enteredValues.password}
            />
            {showPassword ? (
              <FaRegEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordView} />
            ) : (
              <FaRegEye className="absolute right-5 cursor-pointer" onClick={togglePasswordView} />
            )}
          </div>
        </div>

        <button className="mt-2 w-full cursor-pointer bg-green-400/20 text-green-900/80 border border-green-900/70 rounded-md py-1 hover:bg-green-800/10 transition-colors">
          Login
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
