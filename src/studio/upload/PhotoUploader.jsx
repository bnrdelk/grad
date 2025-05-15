import React, { useState, useRef, useEffect } from 'react';
import { BiCamera, BiCloud } from 'react-icons/bi';
import { toast, Toaster } from 'sonner';

const PhotoUploader = ({ label, onImageChange }) => {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.onloadedmetadata = () => {};
    }
  }, [isCameraActive]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(reader.result);
        toast.success("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsCameraActive(true);
          toast.success("Camera activated.");
        }
      })
      .catch((err) => {
        toast.error("Failed to access camera.");
        console.error("Camera access error: ", err);
      });
  };
  
  const handleStopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
      toast.info("Camera stopped.");
    }
  };

  const takePicture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    setImage(dataURL);
    onImageChange(dataURL);
    setIsCameraActive(false);
    streamRef.current.getTracks().forEach(track => track.stop());
    toast.success("Picture taken successfully!");
  };

  const handleFileInputClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <Toaster position="top-right"/>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="fileInput"
      />
      <div className="flex mb-4">
        {!isCameraActive && (
          <label htmlFor="fileInput">
            <button
              className="flex mr-2 cursor-pointer bg-green-300/50 text-green-900 border-2 border-green-800/60 rounded-md px-5 py-2 hover:bg-white/30 transition-colors"
              onClick={handleFileInputClick}
            >
              <BiCloud className='mt-1 mr-1'/> Upload Photo
            </button>
          </label>
        )}
        {!isCameraActive && (
          <button
          className="flex mr-2 cursor-pointer bg-blue-400/20 text-blue-800/75 border-2 border-blue-800/40 rounded-md px-5 py-2 hover:bg-white/30 transition-colors"
              onClick={handleCameraClick}
          >
            <BiCamera className="mr-1 mt-1" /> Open Camera
          </button>
        )}
        {isCameraActive && (
          <>
            <button
              className="flex mr-2 cursor-pointer bg-white/30 text-gray-500 border border-gray-500 rounded-md px-5 py-2 hover:bg-white/60 transition-colors"
              onClick={takePicture}
            >
              Take Picture
            </button>
            <button
              className="flex mr-2 cursor-pointer bg-white/30 text-red-400 border border-gray-500 rounded-md px-5 py-2 hover:bg-white/60 transition-colors"
              onClick={handleStopCamera}
            >
              Close Camera
            </button>
          </>
        )}
      </div>

      <video
        ref={videoRef}
        autoPlay
        className={`max-w-[650px] h-[430px] object-cover rounded-lg shadow-md mb-4 ${isCameraActive ? '' : 'hidden'}`}
      />

      {image && (
        <img
          src={image}
          alt="Uploaded Preview"
          className={`max-w-[580px] h-[430px] object-cover rounded-lg shadow-md ${isCameraActive ? 'hidden' : ''}`}
        />
      )}
    </div>
  );
};

export default PhotoUploader;