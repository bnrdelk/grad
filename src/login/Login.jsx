import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ImInfo } from "react-icons/im";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword((prev) => !prev);

  const [formState, setFormState] = useState({
    errors: null,
    enteredValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const loginAction = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    let errors = [];

    if (errors.length > 0) {
      setFormState({ errors, enteredValues: { email, password } });
    } else {
      setFormState({ errors: null, enteredValues: { email: "", password: "" } });
    }

    
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-[100%] max-w-sm md:max-w-md lg:max-w-md flex-col flex items-center" onSubmit={loginAction}>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full bg-gray-200 flex items-center gap-2 p-2 rounded-xl">
            <MdAlternateEmail />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
              defaultValue={formState.enteredValues.email}
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

        {formState.errors && (
          <ul className="text-red-600 text-start justify-start mt-2" style={{ fontSize: '13px' }}>
            {formState.errors.map((error) => (
              <li className="flex gap-2" key={error}> <ImInfo /> {error}</li>
            ))}
          </ul>
        )}

        <button className="w-full border-1 bg-gray-400 border-black p-2 text-white cursor-pointer rounded-xl mt-3 hover:bg-gray-700 text-sm md:text-base">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;