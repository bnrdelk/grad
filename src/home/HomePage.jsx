import { Button } from "../Button";
import Card from "../Card";
import TypeWriter from "../Typewriter";
import Header from "./Header";
import Slider from "./Slider";

function HomePage() {
  return (
    <>
      <div className="mx-auto my-26 max-w-screen-lg px-4">
        <Header />
        <div className="flex items-center gap-4 mt-17 mx-2">
          <Button variant="inverted">JOIN FOR FREE</Button>
          <Button variant="outlined">SIGN IN</Button>
        </div>
        <div className="my-4 py-4 bg-gray-950">
          <div className="mx-10 mb-2" style={{ fontSize: '22px' }} >
            <div className="flex justify-between">
              <TypeWriter loop={3} lastWord={'THE LOOK'} words={['<CREATE />', '<FIND />', '<LIKE />', '<SHARE />']} />
              <div style={{ fontSize: '13px' }}>
                <Button variant="filled">see all &rarr;</Button>
              </div>
            </div>
            <div style={{ fontSize: '13px' }} >
              Inspirations hand-selected by our creators at NailArt.
            </div>

          </div>
          <Slider />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-col3 col-6 mx-auto max-w-screen-lg px-4">
            <Card className="col-2" header={['<PATTERNS FOR EMOTIONS/>',]} image={'/grad/creativity.jpg'} />
            <Card header={['<CREATIVITY FOR VISUAL/>',]} image={'/grad/creativity.jpg'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage
