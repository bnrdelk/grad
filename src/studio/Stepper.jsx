import React, { useState, useEffect, useContext } from "react";
import PhotoUploader from "./upload/PhotoUploader";
import TypeWriter from "../Typewriter";
import { StudioService } from "../services/StudioService";
import { BiArrowFromLeft, BiDownload, BiLeftArrow, BiPaperPlane, BiRightArrow, BiRightArrowCircle, BiShareAlt, BiStar } from "react-icons/bi";
import { Oval } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { toast, Toaster } from "sonner";

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
  const [designName, setDesignName] = useState("");
  const [designDescription, setDesignDescription] = useState("");
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  const [showStepper, setShowStepper] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  

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

    try {
      const result = await StudioService.createLookWithJson(look);
      setBackendResult(result);
      setShowStepper(false);
      toast.success('Design created successfully!');
    } catch (error) {
      setBackendResult({ error: error.message || "Error occurred" });
      toast.error('Failed to create design.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (backendResult?.generatedImagePath) {
      const link = document.createElement('a');
      link.href = backendResult.generatedImagePath;
      link.download = 'generated_nail_design.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Design downloaded successfully!');
    }
  };

  const handleShare = async () => {
    if (!isLoggedIn) {
      return;
    }
    if (designName && designDescription && backendResult?.generatedImagePath) {
      const nailArtData = {
        name: designName,
        description: designDescription,
        templateImagePath: backendResult.generatedImagePath
      };

      try {
        setLoading(true);
        await StudioService.shareLook(nailArtData);
        toast.success('Design shared successfully!');
        navigate('/grad/feed');
      } catch (error) {
      } finally {
        setLoading(false);
        toast.error('Failed to share design!');
      }
    } else {
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
        {loading && (
          <div className="flex flex-col items-center">
            <Oval
              height={80}
              width={80}
              color="darkblue"
              secondaryColor="#a16207"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p className="text-yellow-300 mt-2">The design is being created..</p>
          </div>
        )}
        {!loading && backendResult && backendResult.error && (
          <p className="text-red-500">{backendResult.error}</p>
        )}
        {!loading && backendResult && !backendResult.error && backendResult.generatedImagePath && (
          <div className="flex flex-col mt-4 w-full max-w-[550px]">
            <img
              src={backendResult.generatedImagePath}
              alt="Generated"
              className="max-w-[520px] max-h-[460px] h-auto object-contain rounded-lg shadow-md mb-4"
            />
            <div className="col flex flex-col justify-start w-full">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Design Name"
                  className="w-full px-3 py-2 mb-2 rounded-sm bg-white/60 text-black border border-gray-500 focus:outline-none"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  required
                />
                <button
                  className={`flex ml-2 px-3 py-2 mb-2 cursor-pointer bg-white/80 text-blue-900 border-2 border-blue-900/40 rounded-sm hover:bg-white/30 transition-colors`}
                  onClick={downloadImage}
                ><BiDownload className="mt-1 size-5.5" />
                </button>
              </div>
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 mb-2 rounded-sm  bg-white/60 text-black border border-gray-500 focus:outline-none"
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
                rows="2"
                required
              />
              <button
                className={`flex text-center justify-center flex cursor-pointer bg-green-200/70 text-green-800 border border-green-800/50 rounded-sm px-6 py-2 hover:bg-white/30 transition-colors
                  ${!isShareEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handleShare}
                disabled={!isShareEnabled}
              >
                SHARE <BiPaperPlane className="mt-1 ml-1" />
              </button>
            </div>
          </div>
        )}
        {
          !loading && !backendResult && (
            <p className="text-yellow">Click the "CREATE" button for the design!</p>
          )
        }
        {
          handPhoto && nailPhoto && !backendResult && !loading && (
            <div className="flex mt-4">
              <div className="mr-4">
                <img
                  src={handPhoto}
                  alt="Hand Image"
                  className="w-[240px] h-[260px] object-cover rounded-lg shadow-md"
                />
                <p className="text-white mt-1">Hand</p>
              </div>
              <div>
                <img
                  src={nailPhoto}
                  alt="Nailart Image"
                  className="w-[240px] h-[260px] object-cover rounded-lg shadow-md"
                />
                <p className="text-white mt-1">Nailart</p>
              </div>
            <Toaster />
            </div>
          )
        }
      </div >
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
      setShowStepper(true);
    }
  }, [currentStep, handPhoto, nailPhoto]);

  useEffect(() => {
    setIsShareEnabled(designName.trim() !== "" && designDescription.trim() !== "" && backendResult?.generatedImagePath);
  }, [designName, designDescription, backendResult]);

  const isNextEnabled = (currentStep === 1 && handPhoto) || (currentStep === 2 && nailPhoto);
  const isResultReceived = backendResult && !backendResult.error && backendResult.generatedImagePath;

  return (
    <div className="relative text-center">
      <Toaster position="top-right"></Toaster>
      {showStepper && (
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
      )}

      <div className="mt-6">
        <div style={{ fontSize: '20px' }}>
          {currentStep === 1 && (
            <TypeWriter loop={1} size={'bold'} color={'gray'} words={['<TAKE PICTURE OF HANDS />']} />
          )}
          {currentStep === 2 && (
            <TypeWriter loop={1} size={'bold'} color={'gray'} words={['<UPLOAD THE NAILART/>']} />
          )}
          {currentStep === 3 && !isResultReceived && !loading && (
            <TypeWriter loop={1} size={'bold'} color={'gray'} words={['<CREATE THE LOOK />']} />
          )}
          {currentStep === 3 && loading && (
            <TypeWriter loop={1} size={'bold'} color={'gray'} words={['<CREATING THE DESIGN />']} />
          )}
          {currentStep === 3 && isResultReceived && (
            <TypeWriter loop={1} size={'bold'} color={'gray'} words={['<SHARE THE DESIGN />']} />
          )}
        </div>
        {stepsContent[currentStep - 1](() => {
          if (currentStep < 3) {
            setIsNextVisible(true);
          }
        })}
      </div>

      {currentStep < stepsContent.length && isNextVisible && showStepper && (
        <div className="flex justify-center mt-2">
          <button
            title="Sonraki adıma geç"
            className={`flex cursor-pointer bg-blue-900/30 text-blue-100 border-2 border-blue-800/70 rounded-sm px-2 py-1 hover:bg-white/30 transition-colors`}
            onClick={handleNext}
            disabled={!isNextEnabled}
          >
            NEXT <BiRightArrow className="mt-1 ml-1" />
          </button>
        </div>
      )}

      {currentStep === stepsContent.length && isCreateVisible && !isResultReceived && !loading && showStepper && (
        <div className="flex justify-center mt-2">
          <button
            title="Tasarımı oluştur"
            className={`flex cursor-pointer bg-green-200/50 text-green-700 border border-green-800/50 rounded-sm px-2 py-1 hover:bg-white/30 transition-colors
        ${!isCreateEnabled ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={handleNext}
            disabled={!isCreateEnabled}
          >
            <BiStar className="mt-1 mr-1" /> CREATE
          </button>
        </div>
      )}
    </div>
  );
};

export default Stepper;