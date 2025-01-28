import "./BlurryShapes.css"

function BlurryShapes() {
    return (
        <div className="absolute w-full flex items-center justify-center px-16">
            <div className="relative w-full max-w-lg">
                <div style={{ animationDelay: '5s' }} className="absolute top-0 -left-4 w-62 h-62 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div style={{ animationDelay: '2s' }} className="absolute top-0 left-25 w-62 h-62 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
                <div className="absolute -bottom-40 -right-2 w-62 h-62 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            </div>
        </div>
    );
}

export default BlurryShapes