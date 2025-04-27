import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { registerUser } from "../services/AuthService";  
import { User } from "../models/User";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(User);

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleRegister = async () => {
    try {
      console.log("Gönderilen veri:", user);
        if(user && user.username && user.password)
        {
          const result = await registerUser(user.username, user.password);
          console.log(result);
        } else
        console.log("olmadi")
    } catch (err) {
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[100%] max-w-sm md:max-w-md lg:max-w-md flex-col flex items-center">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl">
            <BiUser />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            )}
          </div>
        </div>

        <button 
        onClick={handleRegister}
        className="w-full border-1 bg-gray-400 border-black p-2 text-white cursor-pointer rounded-xl mt-3 hover:bg-gray-700 text-sm md:text-base">
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;