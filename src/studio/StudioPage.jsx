import BlurryShapes from "./blurryShapes/BlurryShapes";
import Stepper from "./Stepper";
import CameraButton from "./upload/CameraButton";

const StudioPage = () => {
    return (
        <>
            <div className="mx-auto my-30 px-4 w-full sm:w-[600px] sm:h-[700px] md:w-[800px] md:h-[700px] lg:w-[900px] lg:h-[700px]">
                <div className="flex bg-gray-700 border-1 flex-col items-center justify-center w-full h-full">
                    <BlurryShapes />
                    <Stepper />
                </div>
            </div>


        </>

    );
}

export default StudioPage