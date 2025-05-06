import { Fragment, useState, useContext } from "react";
import { Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { AuthContext } from "../AuthContext";
import { BiLogIn, BiLogInCircle, BiSolidLogIn } from "react-icons/bi";
import { IoLogInOutline, IoLogInSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import { RiLoginCircleFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import Login from "../login/Login";
import { GrLogin } from "react-icons/gr";
import { LuLogIn } from "react-icons/lu";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, clearToken, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        clearToken();
        setIsMenuOpen(false);
        navigate('/grad');
    };

    return (
        <>
            <header className="fixed z-50 w-full top-0 left-0 flex justify-between items-center text-gray-600
        py-3 px-8 md:px-32 bg-gray-200 shadow-sm">
                <Link className="navbar-link h-15 justify-center text-center" to="/grad/" onClick={() => setIsMenuOpen(false)}>
                    <img className="justify-center text-center" src="/grad/logo.png" alt="NailArt Logo" style={{ width: '170px' }} />
                </Link>

                <ul className="navbar hidden xl:flex items-center
                text-base">
                    <li className="p-2 hover:bg-blue-800/10  transition-all cursor-pointer">
                        <Link className="navbar-link" to="/grad/" onClick={() => setIsMenuOpen(false)}>
                            <i className="fa-regular fa-map px-2 text-xl"></i> HOME</Link></li>
                    <li className="p-2 hover:bg-blue-800/10 mx-2 transition-all cursor-pointer">
                        <Link className="navbar-link" to="/grad/feed" onClick={() => setIsMenuOpen(false)}>
                            <i className="fa-solid fa-globe px-2 text-xl"></i> FEED</Link></li>
                    <li className="p-2 hover:bg-blue-800/10 transition-all cursor-pointer">
                        <Link className="navbar-link" to="/grad/studio" onClick={() => setIsMenuOpen(false)}>
                            <i className="fa-brands fa-files-pinwheel px-2 text-xl"></i> STUDIO</Link></li>

                    {isLoggedIn && (
                        <li className="p-2 hover:bg-blue-800/10 mx-2 transition-all cursor-pointer">
                            <Link className="navbar-link" to="/grad/profile" onClick={() => setIsMenuOpen(false)}>
                                <i className="fa-regular fa-user px-2 text-xl"></i> PROFILE
                            </Link>
                        </li>
                    )}

                    <hr className="w-0.25 h-10 border-0 bg-gray-500 ml-5 mr-2" />
                    <li style={{ fontSize: "15px" }} className="p-2">
                        {isLoggedIn ? (
                            <button className="flex mr-2 cursor-pointer bg-blue-400/10 text-blue-800/75 border border-blue-900/50 rounded-md px-5 py-2 hover:bg-white/30 transition-colors"
                                onClick={handleLogout}>LOGOUT &rarr;</button>
                        ) : (
                            <Link to="/grad/">
                                <button className="flex mr-2 cursor-pointer bg-green-400/10 text-green-900/85 border border-green-900/50 rounded-md px-5 py-2 hover:bg-white/30 transition-colors"
                                >SIGN IN<LuLogIn className="mt-1 ml-1" /> </button>
                            </Link>
                        )}
                    </li>
                </ul>

                <div className="xl:hidden relative md:flex items-center justify-center">
                    <i className="fa-solid fa-bars xl:hidden block text-4xl cursor-pointer "
                        onClick={() => setIsMenuOpen(!isMenuOpen)} ></i>
                </div>

                <div className={` absolute xl:hidden top-21 left-0 w-full
                    bg-gray-200 flex flex-col items-center gap-6 text-lg
                    transform transition-transform
                    ${isMenuOpen
                        ? "opacity-100"
                        : "hidden"
                    }`}
                    style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}>

                    <li className="list-none w-full text-start p-1
                cursor-pointer"><Link className="navbar-link" to="/grad/" onClick={() => setIsMenuOpen(false)}><i className="fa-regular fa-map px-2 text-xl"></i> HOME</Link></li>
                    <li className="list-none w-full text-start p-1
                cursor-pointer"><Link className="navbar-link" to="/grad/feed" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-globe px-2 text-xl"></i> FEED</Link></li>
                    <li className="list-none w-full text-start p-1
                cursor-pointer"><Link className="navbar-link" to="/grad/studio" onClick={() => setIsMenuOpen(false)}><i className="fa-brands fa-files-pinwheel px-2 text-xl"></i> STUDIO</Link></li>

                    {isLoggedIn && (
                        <li className="list-none w-full text-start p-1
                    cursor-pointer"><Link className="navbar-link" to="/grad/profile" onClick={() => setIsMenuOpen(false)}>
                                <i className="fa-regular fa-user px-2 text-xl"></i> PROFILE
                            </Link>
                        </li>
                    )}

                    <hr className="list-none w-full border-t border-0 border-gray-500" />
                    <li style={{ fontSize: "15px" }} className="list-none mb-5 flex flex-colsm:flex-row items-center gap-4">
                        {isLoggedIn ? (
                            <button className="flex mr-2 cursor-pointer bg-blue-400/10 text-blue-800/75 border border-blue-900/50 rounded-md px-5 py-2 hover:bg-white/30 transition-colors"
                                onClick={handleLogout}>LOGOUT &rarr;</button>
                        ) : (
                            <>
                                ¨<Link to="/grad/">
                                    <button className="flex mr-2 cursor-pointer bg-green-400/10 text-green-900/85 border border-green-900/50 rounded-md px-5 py-2 hover:bg-white/30 transition-colors"
                                    >SIGN IN<LuLogIn className="mt-1 ml-1" /> </button>
                                </Link>
                            </>
                        )}
                    </li>

                </div>
            </header >
        </>
    );
}

export default Navbar;