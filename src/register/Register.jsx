import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BiAlignMiddle, BiRename, BiUser } from "react-icons/bi";
import { registerUser } from "../services/AuthService";
import { User } from "../models/User";
import { toast, Toaster } from "sonner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(User);

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleRegister = async () => {
    try {
      if (user && user.username && user.password && user.name) {
        await registerUser(user.username, user.name, user.password);
        toast.success("Registration successful!");
      } else {
        toast.error("Please fill in all fields.");
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-md flex-col flex items-center">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl">
            <BiAlignMiddle />
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
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
              <FaRegEyeSlash className="absolute right-5 cursor-pointer" onClick={togglePasswordView} />
            ) : (
              <FaRegEye className="absolute right-5 cursor-pointer" onClick={togglePasswordView} />
            )}
          </div>
        </div>
        <button
          onClick={handleRegister}
          className="mt-2 w-full cursor-pointer bg-green-400/20 text-green-900/80 border border-green-900/70 rounded-md py-1 hover:bg-green-800/10 transition-colors"
        >
          Register
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Register;
