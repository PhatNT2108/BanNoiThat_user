
import { Carousel } from 'react-responsive-carousel';

const Slide1 = require('../../assets/images/slide1.jpg');
const Slide2 = require('../../assets/images/slide2.jpg');
const Slide3 = require('../../assets/images/slide3.jpg');

function Sidebar() {
  return (<div className="max-w-screen-lg mx-auto">
    <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false} showIndicators={false} className="rounded-lg overflow-hidden shadow-lg">
      <div>
        <img src={Slide1} alt="Slide 1" className="w-full h-72 object-cover" />
      </div>
      <div>
        <img src={Slide2} alt="Slide 2" className="w-full h-72 object-cover" />
      </div>
      <div>
        <img src={Slide3} alt="Slide 3" className="w-full h-72 object-cover" />
      </div>
    </Carousel>
  </div>);
}

export default Sidebar
  ;