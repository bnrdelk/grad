import BlurryShapes from "./blurryShapes/BlurryShapes";
import Stepper from "./Stepper";

const StudioPage = () => {
    return (
        <>
            <div className="mt-28 px-3">
                <div className="flex bg-[white]/60 border-1 flex-col items-center justify-center sm:m-2 sm:p-5 lg:m-20 lg:p-8">
                    <BlurryShapes />
                    <Stepper />
                </div>
            </div>
        </>

    );
}

export default StudioPage