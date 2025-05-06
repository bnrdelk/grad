import BlurryShapes from "./blurryShapes/BlurryShapes";
import Stepper from "./Stepper";

const StudioPage = () => {
    return (
        <>
            <div className="mx-auto my-26 px-1 w-full sm:w-[600px] sm:h-[780px] md:w-[800px] md:h-[780px] lg:w-[900px] lg:h-[790px]">
            <div className="relative flex bg-blue-50 border-1 flex-col items-center justify-center w-full h-full">
                    <BlurryShapes />
                    <Stepper />
                </div>
            </div>
        </>
    );
}

export default StudioPage