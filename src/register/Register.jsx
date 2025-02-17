import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { AiFillProfile } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[100%] max-w-sm md:max-w-md lg:max-w-md flex-col flex items-center">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl">
            <MdAlternateEmail />
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl">
            <BiUser />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
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

        <button className="w-full border-1 bg-gray-400 border-black p-2 text-white cursor-pointer rounded-xl mt-3 hover:bg-gray-700 text-sm md:text-base">
          Login
        </button>

      </div>
    </div>
  );
};

export default Register;