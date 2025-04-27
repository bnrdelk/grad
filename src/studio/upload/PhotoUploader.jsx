import React, { useState } from 'react';
import { BiCamera } from 'react-icons/bi';

const PhotoUploader = ({ label, onImageChange }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="text-white mb-1 mt-4">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <button
          className="flex mb-4 cursor bg-white/20 text-white border border-white/30 rounded-md px-4 py-2 hover:bg-white/30 transition-colors"
          onClick={handleClick} 
        >
          <BiCamera className='mt-1 mr-1'/> Upload Photo
        </button>
      </label>

      {image && (
        <img
          src={image}
          alt="Uploaded Preview"
          className="w-[350px] h-[350px] object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default PhotoUploader;
