import { useState } from "react";
import Explore from "../Explore";

function Tabs() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="mt-25 lg:mx-15 md:mx-10 sm:mx-8 xs:mx-8">
            <div className="mb-4 border-b ">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`cursor-pointer inline-block p-3 border-2 rounded-t-lg ${activeTab === "profile" ? "border-gray-500 bg-sky-900 text-gray-100" : "hover:text-gray-600 hover:border-gray-300"}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            EXPLORE
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`cursor-pointer inline-block p-3 border-2 rounded-t-lg ${activeTab === "mypage" ? "border-gray-500 bg-sky-900 text-gray-100" : "hover:text-gray-600 hover:border-gray-300"}`}
                            onClick={() => setActiveTab("mypage")}
                        >
                            CREATIONS
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                {activeTab === "profile" && (
                    <div className="p-2 rounded-lg bg-gray-100">
                        <Explore />
                    </div>
                )}
                {activeTab === "mypage" && (
                    <div className="p-2 rounded-lg bg-gray-100">
                        <p className="text-sm text-gray-500">
                            --
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;
