import { useState, useEffect } from "react";
import { BiBookmark, BiHeart, BiSave } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";

function Explore() {
    const [looks, setLooks] = useState([]);

    useEffect(() => {
        const fetchLooks = async () => {
            try {
                const response = await fetch("http://localhost:5079/api/studio/get-looks");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setLooks(data);
            } catch (error) {
                console.error("Looks verilerini alırken bir hata oluştu:", error);
            }
        };

        fetchLooks();
    }, []);

    return (
        <div className="p-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
                {looks.map((look) => (
                    <div key={look.nailArtId} className="p-2 bg-white/60 border border-gray-400 rounded-md shadow">
                        <img
                            src={look.templateImagePath}
                            alt={look.name || "Nail Art"}
                            className="image rounded-lg"
                            style={{ width: '100%', height: '250px', display: 'block', objectFit: 'cover' }}
                        />
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <CgProfile className="w-7 h-7 mr-2" />
                                <span className="text-sm text-sky-900">{look.username}</span>
                            </div>
                            <button className="cursor-pointer text-gray-500 hover:text-orange-500">
                                <BiBookmark className="w-4 h-4 mr-2" />
                            </button>
                        </div>
                        <div className="mt-2 text-gray-800 dark:text-gray-400">{look.name}</div>
                        <div className="mt-2 text-xs text-gray-400 italic dark:text-gray-400">{look.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Explore;