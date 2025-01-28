import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [photo, setPhoto] = useState(null); // Yüklenen fotoğraf

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result); // Yüklenen fotoğrafı state'e kaydet
        if (onFileUpload) {
          onFileUpload(event.target.result); // Yüklenen fotoğrafı parent'a gönder
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
        className="mt-4"
      />
      {photo && <img src={photo} alt="Uploaded Preview" className="mt-4" width="520" height="360" />}
    </div>
  );
};

export default FileUpload;
