import { useState, useEffect, Profiler } from "react";
import { BiBookmark, BiHeart, BiSave } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";

function Explore() {
    const [images, setImages] = useState([
        { url: "/grad/slide_1.png", alt: "Image 1" },
        { url: "/grad/slide_2.png", alt: "Image 2" },
        { url: "/grad/slide_3.png", alt: "Image 3" },
        { url: "/grad/slide_7.png", alt: "Image 4" },
        { url: "/grad/slide_5.png", alt: "Image 5" },
        { url: "/grad/slide_6.png", alt: "Image 6" }
    ]);

    // useEffect(() => {
    //     fetch("")
    //         .then(response => response.json())
    //         .then(data => setImages(data));
    // }, []);

    return (
        <div className="p-4">
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="p-2 bg-gray-100 border border-gray-400 rounded-sm shadow">
                        <img src={image.url} alt={image.alt || "Image"} className="image w-full sm:h-[170px] md:h-[170px] lg:h-[210px] rounded-lg" />
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <CgProfile className="w-5 h-5 mr-2" />
                                <span className="text-sm text-sky-900">username</span>
                            </div>
                            <button className="cursor-pointer text-gray-500 hover:text-orange-500">
                                <BiBookmark className="w-4 h-4 mr-2" />
                            </button>
                        </div>
                        <div className="mt-2 text-xs text-gray-400 dark:text-gray-400">#Tag1 #Tag2 #Tag3</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;
