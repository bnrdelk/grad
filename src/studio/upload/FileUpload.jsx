import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [photo, setPhoto] = useState(null); 

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result); 
        if (onFileUpload) {
          onFileUpload(event.target.result); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="my-6 text-cyan-900"
      />
      {photo && <img src={photo} alt="Uploaded Preview" className="my-4" width="520" height="360" />}
    </div>
  );
};

export default FileUpload;
