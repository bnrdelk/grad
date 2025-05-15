import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { BiCamera, BiPencil, BiPlus } from "react-icons/bi";
import Login from "../login/Login";
import Register from "../register/Register";
import Header from "./Header";
import Slider from "./Slider";
import TypeWriter from "../Typewriter";
import axios from "../../src/axios";
import { toast, Toaster } from "sonner";

function HomePage() {
  const [isRegistering, SetIsRegistering] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      setUpdatedName(currentUser.name || "");
      setProfilePicture(currentUser.picture || null);
    }
  }, [currentUser]);
  
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put('/user/update', {
        name: updatedName,
        picturePath: profilePicture
      });

      if (response.data) {
        const result = response;
        toast.success("Updated successfully", result);

        if (updateUser) {
          if (response.data) {
            updateUser(response.data);
          } else {
            const updatedUserData = { ...currentUser, name: updatedName, picture: profilePicture };
            updateUser(updatedUserData);
          }
        }
        setIsEditingProfile(false);
      } else {
        toast.error("Update failed.");
      }
    } catch (error) {
        toast.error("Update failed.");
    }
    window.location.reload();
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicture(currentUser?.picture || null);
    }
  };

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
                          Already have an account.
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-green-100/20 border-1 border-gray-300 mt-2 shadow-md p-6 flex items-center">
                  <div className="w-40 h-40 overflow-hidden ml-2 mr-4 rounded-sm">
                    <img
                      src={currentUser.picture ? currentUser.picture : "./profile.jpg"}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">{currentUser.name}</h2>
                    <p className="text-md text-gray-500">@{currentUser.username}</p>
                    <div className="mt-2 flex space-x-4 text-sm text-gray-600">
                      <div>
                        <span className="mr-2">{currentUser.nailArtDatas?.length ? currentUser.nailArtDatas?.length : "0"}</span>
                        <span className="font-semibold">Designs</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="flex cursor-pointer bg-white text-gray-900 rounded-sm py-2 px-4 text-sm font-semibold border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <BiPencil className="mt-1 mr-1" /> Edit Profile
                      </button>
                      <button onClick={() => navigate("/grad/studio")} className="flex cursor-pointer bg-blue-200/60 text-blue-900 border border-gray-600 rounded-sm py-2 px-4 text-sm font-semibold hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <BiPlus className="mt-1 mr-1" /> Create Design
                      </button>
                    </div>
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
      {isEditingProfile && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={currentUser?.username || ""}
                readOnly
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Username cannot be changed.</p>
            </div>
            <div className="mb-4">
              <label htmlFor="picture" className="block text-gray-700 text-sm font-bold mb-2">
                Profile Picture:
              </label>
              <input
                type="file"
                id="picture"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handlePictureChange}
                accept="image/*"
              />
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Current Profile"
                  className="mt-2 w-26 h-26 object-cover"
                />
              )}
              {!profilePicture && currentUser?.picture && (
                <img
                  src={currentUser.picture}
                  alt="Current Profile"
                  className="mt-2 w-26 h-26 object-cover"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-sm border border-gray-500 focus:outline-none focus:shadow-outline mr-2"
                onClick={() => setIsEditingProfile(false)}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer bg-blue-900/80 hover:bg-blue-900 text-white font-bold py-2 px-4 border border-gray-500 rounded-sm focus:outline-none focus:shadow-outline"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="fixed bottom-4 right-4 w-16 h-16 border-1 border-gray-400 bg-white text-black text-lg font-bold rounded-full shadow-lg flex items-center justify-center cursor-pointer transition"
        onClick={() => navigate("/grad/studio")}
      >
        <BiCamera className="text-2xl" />
      </button>

      <Toaster position="top-right" />
    </>
  );
}

export default HomePage;