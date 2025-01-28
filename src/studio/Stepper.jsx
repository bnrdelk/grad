import React, { useState } from "react";

const Stepper = () => {
  const steps = ["", "", ""];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  return (
    <div className="relative text-center">
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`sm:mx-15 sm:my-30 lg:mx-20 relative flex flex-col justify-center items-center ${currentStep === i + 1 ? "text-sky-600" : ""
              } ${(i + 1 < currentStep || complete) ? "text-green-600" : ""}`}
          >
            {/* Step circle */}
            <div
              className={`w-12 h-12 flex items-center justify-center z-1 relative rounded-full border-1 font-bold ${i + 1 < currentStep || complete
                ? "bg-black text-white border-cyan-900"
                : currentStep === i + 1
                  ? "bg-cyan-900 text-white"
                  : "bg-gray-50 text-black"
                }`}
            >
              {i + 1}
            </div>

            {/* Step label */}
            <p
              className={`${i + 1 < currentStep || complete
                ? "text-white"
                : "text-gray-500"
                }`}
            >
              {step}
            </p>

            {/* Connector line */}
            {i > 0 && (
              <div
                style={{ width: '380%' }}
                className={`absolute h-[3px] right-2/4 
                  ${i + 1 <= currentStep || complete
                    ? "bg-cyan-900"
                    : "bg-slate-200"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {!complete && (
        <button
          className={`cursor-pointer py-1 px-3 rounded-full transition duration-300 border-2 hover:bg-white hover:text-black border-white text-white
            ${currentStep === steps.length
              ? " bg-cyan-900"
              : " bg-black"
            }`
          }
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "COMPLETE" : "NEXT"}
        </button>
      )}
    </div>
  );
};

export default Stepper;
