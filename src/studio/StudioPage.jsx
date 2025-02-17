import BlurryShapes from "./blurryShapes/BlurryShapes";
import Stepper from "./Stepper";
import CameraButton from "./upload/CameraButton";

const StudioPage = () => {
    return (
        <>
            <div className="mx-auto my-20 px-1 w-full sm:w-[600px] sm:h-[760px] md:w-[800px] md:h-[760px] lg:w-[900px] lg:h-[760px]">
                <div className="flex bg-blue-50 border-1 flex-col items-center justify-center w-full h-full">
                    <BlurryShapes />
                    <Stepper />
                </div>
            </div>
        </>
    );
}

export default StudioPage