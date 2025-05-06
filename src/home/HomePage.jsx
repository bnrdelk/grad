import React, { useState, useContext } from "react";
import { Button } from "../Button";
import Login from "../login/Login";
import TypeWriter from "../Typewriter";
import Header from "./Header";
import Slider from "./Slider";
import { BiCamera, BiCameraHome, BiEdit, BiEditAlt, BiLogoCreativeCommons, BiPen, BiPencil, BiPlus, BiSolidCameraPlus, BiSolidHand, BiSolidPen, BiSolidPencil } from "react-icons/bi";
import Register from "../register/Register";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function HomePage() {
  const [isRegistering, SetIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="mx-auto mt-25 mb-1 max-w-screen-md px-4">
        <div className="p-4 bg-gray-100 rounded-lg ">
          <div className="p-2 border-1 bg-gray-50 border-gray-400">
            <Header />
            <div>
              {!isLoggedIn ? (
                <div className="flex flex-col justify-center">
                  <button
                  className={`content-center self-center w-[100%] max-w-sm md:max-w-md lg:max-w-md flex cursor-pointer  shadow-[4px_4px_8px_0px_rgba(0,0,0,0.35)] bg-blue-900/30 text-white border-2 items-center justify-center border-blue-800/70 rounded-sm px-2 py-1 hover:text-gray-800 hover:bg-blue-100 transition-colors`}
                    onClick={() => navigate("/grad/studio")}
                  >
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
                    {!isRegistering ? (
                      <div className="text-center">
                        <Login />
                        <a
                          onClick={() => SetIsRegistering(true)}
                          className="text-sm cursor-pointer hover:underline"
                        >
                          Don't you have an account?
                        </a>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Register />
                        <a
                          onClick={() => SetIsRegistering(false)}
                          className="text-sm cursor-pointer hover:underline"
                        >
                          Already have an account?
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-green-100/10 border border-gray-400/50 rounded-sm shadow-md p-6 mx-6 my-1">
                  <div className="flex justify-content-center justify-center items-center mx-16 space-x-4">
                    <img
                      className="w-22 h-22 rounded-full object-cover"
                      src={currentUser?.picture ? currentUser.picture : "./profile.jpg"}
                      alt="Profile picture"
                    />
                    <div className="ml-2">
                      <h3 className="text-xl font-semibold text-gray-800">{currentUser?.name}</h3>
                      <p className="text-md text-gray-500">
                        @{currentUser?.username}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{currentUser?.nailArtDatas ? currentUser.nailArtDatas.length : "0"}</p>
                      <p className="text-xs text-gray-500">Designs</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{currentUser?.nailArtDatas ? currentUser.nailArtDatas.length : "0"}</p>
                      <p className="text-xs text-gray-500">Saved</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center space-x-5">
                    <button className="flex cursor-pointer bg-blue-200/60 text-blue-900 border border-gray-600 rounded-sm py-2 px-4 text-sm font-semibold hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-gray-400">
                      <BiPlus className="mt-1 mr-1" /> Create Design
                    </button>
                    <button className="flex cursor-pointer bg-white text-gray-900 rounded-sm py-2 px-4 text-sm font-semibold border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                      <BiPencil className="mt-1 mr-1" /> Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="my-2 py-4">
              <div className="mx-4" style={{ fontSize: '16px' }}>
                <div className="flex justify-between">
                  <TypeWriter
                    loop={3}
                    lastWord={'THE LOOK'}
                    words={['<CREATE />', '<FIND />', '<LIKE />', '<SHARE />']}
                  />
                </div>
                <div style={{ fontSize: '13px' }}>
                  Inspirations hand-selected by our creators at NailArt.
                </div>
              </div>
            </div>
            <Slider></Slider>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 w-16 h-16 border-1 border-gray-400 bg-white text-black text-lg font-bold rounded-full shadow-lg flex items-center justify-center cursor-pointer transition"
        onClick={() => navigate("/grad/studio")}
      >
        <BiCamera className="text-2xl" />
      </button>
    </>
  );
}

export default HomePage;