import React, { useRef, useState, useEffect } from "react";

const CameraButton = ({ onPhotoTaken }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false); 

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraVisible(true);
    } catch (error) {
      console.error("Kamera açılırken bir hata oluştu:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const capturedPhoto = canvas.toDataURL("image/png");
      setPhoto(capturedPhoto);
      setIsCameraVisible(false); 

      // Video durdur
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }

      if (onPhotoTaken) {
        onPhotoTaken(capturedPhoto); 
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null); 
    setIsCameraVisible(true); 
    openCamera();
  };

  useEffect(() => {
    if (!photo) {
      openCamera();
    }
  }, [photo]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {isCameraVisible ? (
        <>
          <video ref={videoRef} className="rounded-lg border mt-4" width="520" height="360" />
          <button onClick={capturePhoto}>Fotoğraf Çek</button>
        </>
      ) : (
        <>
          {photo && (
            <img src={photo} alt="Çekilen Fotoğraf" className="rounded-lg border mt-4" width="520" height="360" />
          )}
          <button onClick={retakePhoto}>Yeniden Çek</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default CameraButton;
