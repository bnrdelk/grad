import { useState } from "react";
import { Button } from "../Button";
import Login from "../login/Login";
import TypeWriter from "../Typewriter";
import Header from "./Header";
import Slider from "./Slider";
import { BiCamera } from "react-icons/bi";
import Register from "../register/Register";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false)
  const [isRegistering, SetIsRegistering] = useState(false)
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto mt-20 mb-1 max-w-screen-md px-4">
        <div className="p-2 border-1 border-gray-400">
          <Header />
          <div>
            {!isLoggedIn ?
              (
                <div className="flex flex-col justify-center">
                  <button className="w-[100%] max-w-sm md:max-w-md lg:max-w-md content-center self-center text-lg border shadow-[4px_4px_8px_0px_rgba(0,0,0,0.35)] border-white bg-sky-900 p-2 text-white cursor-pointer rounded-xl mt-3 hover:bg-blue-950 md:text-base flex items-center justify-center gap-2">
                    <BiCamera className="text-lg" />
                    Try Now
                  </button>
                  <div className="w-[100%] max-w-sm md:max-w-md lg:max-w-md content-center self-center flex items-center justify-center py-3">
                    <div className="w-2/5 h-[2px] bg-gray-800"></div>
                    <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
                      Or
                    </h3>
                    <div className="w-2/5 h-[2px] bg-gray-800"></div>
                  </div>
                  <div>
                    {
                    !isRegistering ? 
                      (
                        <div className="text-center">
                        <Login />
                        <a onClick={() => SetIsRegistering(true)}
                          className="text-sm cursor-pointer hover:underline">
                          Don't you have an account?
                        </a>
                        </div>
                      ) :
                      (
                        <div className="text-center">
                        <Register/>
                        <a onClick={() => SetIsRegistering(false)}
                          className="text-sm cursor-pointer hover:underline">
                          Already have an account?
                        </a>
                        </div>
                        
                      )
                    }
                  </div>
                  
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <button className="w-[100%] max-w-sm md:max-w-md lg:max-w-md content-center self-center text-lg border shadow-[4px_4px_8px_0px_rgba(0,0,0,0.25)] border-black bg-gray-700 p-2 text-white cursor-pointer rounded-xl mt-3 hover:bg-gray-900 md:text-base flex items-center justify-center gap-2"
                    onClick={() => navigate("/grad/studio")}
                  >
                    <BiCamera className="text-lg" />
                    Try Now
                  </button>
                </div>
              )
            }
          </div>
          <div className="my-2 py-4">
            <div className="mx-4" style={{ fontSize: '16px' }} >
              <div className="flex justify-between">
                <TypeWriter loop={3} lastWord={'THE LOOK'} words={['<CREATE />', '<FIND />', '<LIKE />', '<SHARE />']} />
              </div>
              <div style={{ fontSize: '13px' }} >
                Inspirations hand-selected by our creators at NailArt.
              </div>
            </div>
          </div>
          <Slider></Slider>
        </div>
      </div>
      <button className="fixed bottom-4 right-4 w-16 h-16 border-1 border-gray-400 bg-white text-black text-lg font-bold rounded-full 
  shadow-lg flex items-center justify-center cursor-pointer transition">
        <BiCamera className="text-2xl"/>
      </button>
    </>
  );
}

export default HomePage
