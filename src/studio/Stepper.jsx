import { useState, useEffect } from "react";
import PhotoUploader from "./upload/PhotoUploader";
import TypeWriter from "../Typewriter";
import { StudioService } from "../services/StudioService";

const Stepper = () => {
  const [handPhoto, setHandPhoto] = useState(null);
  const [nailPhoto, setNailPhoto] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  const [backendResult, setBackendResult] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      setIsNextVisible(false);
      setIsCreateVisible(false);
      setBackendResult(null); 
    } else {
      setComplete(true);
      createLook();
    }
  };

  const createLook = async () => {
    setLoading(true);
    const look = {
      handPhotoUrl: handPhoto ? handPhoto : "",
      nailPhotoUrl: nailPhoto ? nailPhoto : "",
      createdAt: new Date().toISOString(),
    };
    console.log(look);

    try {
      const result = await StudioService.createLookWithJson(look);
      setBackendResult(result);
    } catch (error) {
      alert(error.message || "There was an error when creating the design.");
      setBackendResult({ error: error.message || "Error occured" });
      setGeneratedImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const stepsContent = [
    (onNext) => (
      <PhotoUploader
        label="Upload Hand Image" 
        onImageChange={(image) => {
          setHandPhoto(image);
          setIsNextVisible(true);
          onNext(); 
        }}
        key={1}
      />
    ),
    (onNext) => (
      <PhotoUploader
        label="Upload Nailart Image"
        onImageChange={(image) => {
          setNailPhoto(image);
          setIsNextVisible(true); 
          onNext(); 
        }}
        key={2}
      />
    ),
    () => (
      <div key={3} className="flex flex-col items-center">
        {loading && <p className="text-yellow-300">The design is being created..</p>}
        {!loading && backendResult && backendResult.error && (
          <p className="text-red-500">{backendResult.error}</p>
        )}
        {!loading && backendResult && !backendResult.error && (
          <div>
            {backendResult?.generatedImagePath && ( 
              <div className="mt-4">
                <img
                  src={backendResult.generatedImagePath}
                  alt="Generated"
                  className="w-auto h-auto max-w-[300px] max-h-[300px] object-contain rounded-lg shadow-md mx-auto mb-4"
                />
              </div>
            )}
          </div>
        )}
        {!loading && !backendResult && (
          <p className="text-gray-400">Click the "CREATE" button for the design!</p>
        )}
        {handPhoto && nailPhoto && !backendResult && (
          <div className="flex mt-4">
            <div className="mr-4">
              <img
                src={handPhoto}
                alt="Hand Image"
                className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"
              />
              <p className="text-gray-400 mt-1">Hand</p>
            </div>
            <div>
              <img
                src={nailPhoto}
                alt="Nailart Image"
                className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"
              />
              <p className="text-gray-400 mt-1">Nailart</p>
            </div>
          </div>
        )}
      </div>
    ),
  ];
  
  

  useEffect(() => {
    if (currentStep === 3) {
      setIsNextVisible(false);
      setIsCreateVisible(true);
      setIsCreateEnabled(handPhoto && nailPhoto);
    } else {
      setIsCreateVisible(false);
      setBackendResult(null);
    }
  }, [currentStep, handPhoto, nailPhoto]);

  const isNextEnabled = (currentStep === 1 && handPhoto) || (currentStep === 2 && nailPhoto);

  return (
    <div className="relative text-center">
      <div className="flex justify-between">
        {stepsContent.map((_, i) => (
          <div
            key={i}
            className={`mx-14 relative flex flex-col justify-center items-center ${currentStep === i + 1 ? "text-sky-600" : ""}
              ${(i + 1 < currentStep || complete) ? "text-green-600" : ""}`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center z-1 relative rounded-full border-1 font-bold ${i + 1 < currentStep || complete
                ? "bg-amber-100 text-sky-900"
                : currentStep === i + 1
                  ? "bg-sky-700 text-white border-gray-700"
                  : "bg-gray-50 text-black"
                }`}
            >
              {i + 1}
            </div>

            {i > 0 && (
              <div
                style={{ width: "300%" }}
                className={`absolute h-[3px] right-2/4 ${i + 1 <= currentStep || complete
                  ? "bg-cyan-900"
                  : "bg-slate-200"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div style={{ fontSize: '20px' }}>
          {currentStep === 1 && (
            <TypeWriter loop={1} size={'bold'} color={'dimgray'} words={['<TAKE PICTURE OF HANDS />']} />
          )}
          {currentStep === 2 && (
            <TypeWriter loop={1} size={'bold'} color={'dimgray'} words={['<UPLOAD THE NAILART/>']} />
          )}
          {currentStep === 3 && (
            <TypeWriter loop={1} size={'bold'} color={'dimgray'} words={['<CREATE THE LOOK />']} />
          )}
        </div>
        {stepsContent[currentStep - 1](() => {
          if (currentStep < 3) {
            setIsNextVisible(true);
          }
        })}
      </div>

      {currentStep < stepsContent.length && isNextVisible && (
        <button
          className={`cursor-pointer py-1 px-3 rounded-lg transition duration-300 border-1 border-gray text-gray text-white hover:bg-black hover:text-gray-200 bg-blue-950`}
          onClick={handleNext}
          disabled={!isNextEnabled}
        >
          NEXT
        </button>
      )}

      {currentStep === stepsContent.length && isCreateVisible && (
        <button
          className={`cursor-pointer py-1 px-3 rounded-lg transition duration-300 border-1 border-gray text-gray text-white hover:bg-green-700 bg-green-900 ${!isCreateEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleNext}
          disabled={!isCreateEnabled}
        >
          CREATE
        </button>
      )}
    </div>
  );
};

export default Stepper;