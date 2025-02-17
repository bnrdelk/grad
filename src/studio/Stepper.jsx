import { useState } from "react";
import CameraButton from "./upload/CameraButton";
import FileUpload from "./upload/FileUpload";
import TypeWriter from "../Typewriter";

const Stepper = () => {
  const steps = [
    (onNext) => <CameraButton onPhotoTaken={() => onNext()} />,
    (setIsNextVisible, setIsPhotoTaken) => (
      <FileUpload onFileUpload={(photo) => {
        setIsNextVisible(true);
        setIsPhotoTaken(true);
        setPhoto(photo);
      }} />
    ),
    () => <div>Step 3 Content</div>,
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setComplete(true);
    }
  };

  return (
    <div className="relative text-center">
      <div className="flex justify-between">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`mx-14 relative flex flex-col justify-center items-center ${currentStep === i + 1 ? "text-sky-600" : ""
              } ${(i + 1 < currentStep || complete) ? "text-green-600" : ""}`}
          >
            {/* Step circle */}
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

            {/* Connector line */}
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
        <div style={{fontSize: '20px'}}>
          {currentStep === 1 && (
            <TypeWriter loop={1} size={'bold'} color={'white'} words={['<TAKE PICTURE OF HANDS />']} />
          )}
          {currentStep === 2 && (
            <TypeWriter loop={1} size={'bold'} color={'white'} words={['<UPLOAD THE NAILART/>']} />
          )}
          {currentStep === 3 && (
            <TypeWriter loop={1} size={'bold'} color={'white'} words={['<CREATE THE LOOK />']} />
          )}
        </div>
        {steps[currentStep - 1](() => setIsNextVisible(true))}
      </div>

      {!complete && isNextVisible && (
        <button
          className={`cursor-pointer py-1 px-3 rounded-lg transition duration-300 border-1 border-gray text-gray text-white hover:bg-black hover:text-gray-200 ${currentStep === steps.length
            ? " bg-green-900 cursor-not-allowed"
            : " bg-blue-950"
            }`}
          onClick={handleNext}
        >
          {currentStep === steps.length ? "CREATE" : "NEXT"}
        </button>
      )}
    </div>
  );
};

export default Stepper;