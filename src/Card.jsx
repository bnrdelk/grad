import TypeWriter from "./Typewriter";

function Card({ image, text, header }) {
  return (
    <div className="my-14 mx-2 grid gap-6 items-center">
      <img
        className="w-full max-w-sm mx-auto lg:w-100"
        src={image}
        alt=""
      />
      <div style={{ fontSize: '23px' }}>
        <TypeWriter loop={1} words={header || ['<PATTERNS FOR EMOTIONS/>',]} />
        <p style={{ fontSize: '16px' }} className="my-5">
          {text || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti atque dicta amet quam, praesentium iure ad saepe ducimus, accusantium perspiciatis sed sit, aliquid omnis rem sequi magni possimus repellendus assumenda.Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti atque dicta amet quam, praesentium iure ad saepe ducimus, accusantium perspiciatis sed sit, aliquid omnis rem sequi magni possimus repellendus assumenda."}
        </p>
      </div>
    </div>
  );
}

export default Card;

