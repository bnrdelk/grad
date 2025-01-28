import { useState } from "react";
import CameraButton from "./upload/CameraButton";
import FileUpload from "./upload/FileUpload";

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
            className={`mx-20 relative flex flex-col justify-center items-center ${
              currentStep === i + 1 ? "text-sky-600" : ""
            } ${(i + 1 < currentStep || complete) ? "text-green-600" : ""}`}
          >
            {/* Step circle */}
            <div
              className={`w-12 h-12 flex items-center justify-center z-1 relative rounded-full border-1 font-bold ${
                i + 1 < currentStep || complete
                  ? "bg-black text-white border-cyan-900"
                  : currentStep === i + 1
                  ? "bg-cyan-900 text-white"
                  : "bg-gray-50 text-black"
              }`}
            >
              {i + 1}
            </div>

            {/* Connector line */}
            {i > 0 && (
              <div
                style={{ width: "380%" }}
                className={`absolute h-[3px] right-2/4 ${
                  i + 1 <= currentStep || complete
                    ? "bg-cyan-900"
                    : "bg-slate-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {steps[currentStep - 1](() => setIsNextVisible(true))}
      </div>

      {!complete && isNextVisible && (
        <button
          className={`cursor-pointer py-1 px-3 rounded-full transition duration-300 border-2 hover:bg-white hover:text-black border-white text-white ${
            currentStep === steps.length
              ? " bg-gray-400 cursor-not-allowed"
              : " bg-black"
          }`}
          onClick={handleNext}
        >
          {currentStep === steps.length ? "COMPLETE" : "NEXT"}
        </button>
      )}
    </div>
  );
};

export default Stepper;