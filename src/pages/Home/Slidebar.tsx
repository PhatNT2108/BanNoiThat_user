import { Carousel } from 'react-responsive-carousel';

// Import slides
const Slide1 = require('../../assets/images/slide1.jpg');
const Slide2 = require('../../assets/images/slide2.jpg');
const Slide3 = require('../../assets/images/slide3.jpg');

function Slidebar() {
  return (
    <div className="max-w-screen h-[50vh] mx-auto overflow-hidden shadow-xl">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        className="h-[50vh]"
      >
        <div className="relative group">
          <img
            src={Slide1}
            alt="Slide 1"
            className="w-full h-[50vh] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-xl font-semibold">Chào mừng đến với Slide 1</h2>
          </div>
        </div>

        <div className="relative group">
          <img
            src={Slide2}
            alt="Slide 2"
            className="w-full h-[50vh] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-xl font-semibold">Khám phá Slide 2</h2>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Slidebar;
