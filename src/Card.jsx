import TypeWriter from "./Typewriter";

function Card({ image, text, header }) {
    return (
      <div className="my-8 grid gap-4 lg:grid-cols-2 items-center">
        <img
          className="w-full max-w-sm mx-auto lg:w-100"
          src={image}
          alt=""
        />
        <div style={{ fontSize: '23px' }}>
            <TypeWriter loop={1} words={header || ['<PATTERNS FOR EMOTIONS/>',]}/>
                <p style={{ fontSize: '16px' }} className="my-5">
                {text || "Enhance your work with our AI-powered tools and authentic community.Enhance your work with our AI-powered tools and authentic community.Enhance your work with our AI-powered tools and authentic community.Enhance your work with our AI-powered tools and authentic community.Enhance your work with our AI-powered tools and authentic community.Enhance your work with our AI-powered tools and authentic community."}
                </p>

        </div>
        
      </div>
    );
  }
  
  export default Card;
  
