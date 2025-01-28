import { Fragment, useState } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed z-50 w-full top-0 left-0 flex justify-between items-center text-gray-100
        py-4 px-8 md:px-32 bg-black drop-shadow-md">

                <Link className="navbar-link w-26 h-10 justify-center text-center" to="/grad/" onClick={() => setIsMenuOpen(false)}>
                    <img className="w-26 h-10 justify-center text-center" src="/grad/header.png" alt="NailArt Logo" />
                </Link>

                <ul className="navbar hidden xl:flex items-center
                text-base">
                    <li className="p-2 hover:bg-gray-400  transition-all cursor-pointer">
                        <Link className="navbar-link" to="/grad/" onClick={() => setIsMenuOpen(false)}>
                            <i className="fa-regular fa-map px-2 text-xl"></i> HOME</Link></li>
                    <li className="p-2 hover:bg-gray-400 mx-2 transition-all cursor-pointer">
                        <Link className="navbar-link" to="/grad/feed" onClick={() => setIsMenuOpen(false)}>
                            <i className="fa-solid fa-globe px-2 text-xl"></i> FEED</Link></li>
                    <li className="p-2 hover:bg-gray-400 transition-all cursor-pointer">
                        <Link className="navbar-link" to="/grad/studio" onClick={() => setIsMenuOpen(false)}>
                            <i className="fa-brands fa-files-pinwheel px-2 text-xl"></i> STUDIO</Link></li>
                    <hr className="w-0.25 h-10 border-0 bg-gray-500 ml-5 mr-2" />
                    <li style={{ fontSize: "15px" }} className="p-2">
                        <Button variant="inverted">SIGN IN &rarr;</Button>
                    </li>
                </ul>

                <div className="xl:hidden relative md:flex items-center justify-center">
                    <i className="fa-solid fa-bars xl:hidden block text-4xl cursor-pointer "
                        onClick={() => setIsMenuOpen(!isMenuOpen)} ></i>
                </div>

                <div className={` absolute xl:hidden top-20 left-0 w-full
                    bg-black flex flex-col items-center gap-6 text-lg
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
                    <hr className="list-none w-full border-t border-0 border-gray-500" />
                    <li style={{ fontSize: "15px" }} className="list-none mb-5 flex flex-colsm:flex-row items-center gap-4">
                        <Button variant="inverted">JOIN FOR FREE</Button>
                        <Button variant="outlined">SIGN IN</Button>
                    </li>

                </div>
            </header >
        </>
    );
}

export default Navbar