import { useState } from "react";
import Explore from "../Explore";

function Tabs() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="mt-27 lg:mx-15 md:mx-10 sm:mx-8 xs:mx-8">
            <div className="mb-4 border-b ">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                    <li className="me-1" role="presentation">
                        <button
                            className={`cursor-pointer border-gray-400 inline-block px-4 py-3 border-2 rounded-t-lg ${activeTab === "profile" ? "border-gray-500 bg-green-900/70 text-gray-100" : "hover:text-gray-900 hover:bg-gray-100/50 hover:border-gray-400"}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            EXPLORE
                        </button>
                    </li>

                    <li className="me-1" role="presentation">
                        <button
                            className={`cursor-pointer border-gray-400 inline-block px-3 py-3 border-2 rounded-t-lg ${activeTab === "collections" ? "border-gray-500 bg-sky-800/80 text-gray-100" : "hover:text-gray-900 hover:bg-gray-100/50 hover:border-gray-400"}`}
                            onClick={() => setActiveTab("collections")}
                        >
                            COLLECTIONS
                        </button>
                    </li>

                    <li className="me-1" role="presentation">
                        <button
                            className={`cursor-pointer border-gray-400 inline-block px-3 py-3 border-2 rounded-t-lg ${activeTab === "mypage" ? "border-gray-500 bg-pink-800/76 text-gray-100" : "hover:text-gray-900 hover:border-gray-400"}`}
                            onClick={() => setActiveTab("mypage")}
                        >
                            CREATIONS
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                {activeTab === "profile" && (
                    <div className="p-2 rounded-md border border-gray-300 bg-gray-300/30">
                        <Explore />
                    </div>
                )}
                {activeTab === "collections" && (
                    <div className="p-2 rounded-md border border-gray-300 bg-gray-300/30">
                        <p className="text-sm text-gray-500">
                            Henüz koleksiyonlar oluşturulmadı.
                        </p>
                    </div>
                )}
                {activeTab === "mypage" && (
                    <div className="p-2 rounded-md border border-gray-300 bg-gray-300/30"> 
                        <p className="text-sm text-gray-500">
                            Kullanıcının oluşturduğu tasarımlar burada listelenecek.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;