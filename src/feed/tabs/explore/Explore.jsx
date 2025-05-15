import { useState, useEffect } from "react";
import { BiDownload } from "react-icons/bi";
import { CgClose, CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";

function Explore() {
    const [looks, setLooks] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedLook, setSelectedLook] = useState(null);

    useEffect(() => {
        const fetchLooks = async () => {
            try {
                const response = await fetch("http://localhost:5079/api/studio/get-looks");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setLooks(data);
            } catch (error) {
                console.error("Looks verilerini alırken bir hata oluştu:", error);
            }
        };

        fetchLooks();
    }, []);

    const openDialog = (look) => {
        setSelectedLook(look);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedLook(null);
    };

    const downloadImage = () => {
        if (selectedLook && selectedLook.templateImagePath) {
            const link = document.createElement('a');
            link.href = selectedLook.templateImagePath;
            link.download = selectedLook.name ? `${selectedLook.name}.png` : 'image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="p-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
                {looks.map((look) => (
                    <div key={look.nailArtId} className="bg-white/60 border border-gray-400 shadow">
                        <img
                            src={look.templateImagePath}
                            alt={look.name || "Ürün"}
                            className="image p-2 cursor-pointer w-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            style={{ height: '250px', display: 'block', objectFit: 'cover' }}
                            onClick={() => openDialog(look)}
                        />
                        <div className="p-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400">{look.name}</h3>
                            <div className="flex items-center mt-1">                                
                                {look?.userPicture ? (
                                <img
                                    src={look.userPicture}
                                    alt={look.username || "Kullanıcı"}
                                    className="rounded-full w-8 h-8 mr-1 object-cover"
                                />
                            ) : (
                                <CgProfile className="w-8 h-8 mr-1" />
                            )}
                                <span className="text-sm text-sky-900">{look.username}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{look.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isDialogOpen && selectedLook && (

                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md shadow-lg flex w-4/5 md:w-3/4 lg:w-2/3">
                        <img
                            src={selectedLook.templateImagePath}
                            alt={selectedLook.name || "Nailart"}
                            className="rounded-l-md w-1/2 object-cover h-auto"
                            style={{ maxHeight: '500px' }}
                        />
                        <div className="p-4 flex flex-col justify-between w-1/2">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">{selectedLook.name}</h2>
                                <button
                                    className={`flex ml-2 px-3 py-2 cursor-pointer bg-white/80 hover:bg-gray-200`}
                                    onClick={downloadImage}
                                >
                                    <BiDownload className="mt-1 size-5.5" />
                                </button>
                            </div>
                            <div className="flex items-center">
                                {selectedLook?.userPicture ? (
                                    <img
                                        src={selectedLook.userPicture}
                                        alt={selectedLook.username || "Kullanıcı"}
                                        className="rounded-full w-18 h-18 mr-1 object-cover"
                                    />
                                ) : (
                                    <CgProfile className="w-12 h-12 mr-1" />
                                )}
                                <span className="text-md text-sky-900">@{selectedLook?.username}</span>
                            </div>
                            <p className="text-gray-700 text-md italic mb-4">{selectedLook.description}</p>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <div className="aspect-w-1 aspect-h-1">
                                        {selectedLook.handImagePath != "" && (
                                            <div>
                                                <img
                                                    src={selectedLook.handImagePath}
                                                    alt=""
                                                    className="object-cover h-[180px] w-[180px]"
                                                />
                                                <h4 className="text-center">Hand</h4>
                                            </div>

                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2 pl-2">
                                    <div className="aspect-w-1 aspect-h-1">
                                        {selectedLook.appliedNailArtPath != "" && (
                                            <div>
                                                <img
                                                    src={selectedLook.appliedNailArtPath}
                                                    alt=""
                                                    className="object-cover h-[180px] w-[180px]"
                                                /><h4 className="text-center">Nail Art</h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={closeDialog} className="text-lg cursor-pointer hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <CgClose />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Explore;