import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Image1 = require('../../assets/images/1.jpg');
const Image2 = require('../../assets/images/2.jpg');
const Image3 = require('../../assets/images/3.jpg');
const Image4 = require('../../assets/images/4.jpg');
const Slide1 = require('../../assets/images/slide1.jpg');
const Slide2 = require('../../assets/images/slide2.jpg');
const Slide3 = require('../../assets/images/slide3.jpg');

const products = [
    {
        id: 1,
        image: Image1,
        image2: Image3,
        name: 'Product 1',
        price: '$100',
        colors: ['Red', 'Blue', 'Green'],
        sold: 150,
    },
    {
        id: 2,
        image: Image2,
        image2: Image4,
        name: 'Product 2',
        price: '$200',
        colors: [],
        sold: 200,
    },
    // Add more products as needed
];

const Homepage: React.FC = () => {
    return (
        <div className="homepage">
            <div className="max-w-screen-lg mx-auto">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4 ml-auto mr-auto max-w-7xl mt-8">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-md">
                        <div className="relative w-full h-48 mb-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out hover:opacity-0"
                            />
                            <img
                                src={product.image2}
                                alt={product.name}
                                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-700 mb-2">{product.price}</p>
                        {product.colors.length > 0 && (
                            <div className="mb-2">
                                <span className="text-gray-600">Colors: </span>
                                {product.colors.map((color, index) => (
                                    <button key={index} className="ml-2 px-2 py-1 border rounded text-sm">{color}</button>
                                ))}
                            </div>
                        )}
                        <p className="text-gray-600">Sold: {product.sold}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;