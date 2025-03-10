import React, { useState } from 'react';
import { Star, Minus, Plus, ShoppingBag, Check } from 'lucide-react';

const Image1 = require('../../../assets/images/1.jpg');
const Image2 = require('../../../assets/images/2.jpg');
const Image3 = require('../../../assets/images/3.jpg');
const Image4 = require('../../../assets/images/4.jpg');
const Image5 = require('../../../assets/images/5.jpg');
const Image6 = require('../../../assets/images/6.jpg');
const ProductDetailMain = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('natural');
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    name: 'Tủ Quần Áo Gỗ MOHO MONZA 4 Cánh 1m6',
    rating: 5,
    reviews: 2,
    sku: 'MFWRCE001N16',
    originalPrice: 11990000,
    salePrice: 8990000,
    discount: 25,
    sold: 8,
    colors: [
      { name: 'natural', label: 'Màu Tự Nhiên', hex: '#E6D2B5' },
      { name: 'light', label: 'Màu Sáng', hex: '#F1E7D4' },
      { name: 'dark', label: 'Màu Đậm', hex: '#8B5A2B' },
    ],
    dimensions: {
      width: 160,
      depth: 60,
      height: 200
    },
    material: 'Gỗ công nghiệp phủ Melamine CARB-P2',
    images: [
      Image1,
      Image2,
      Image3,
      Image4,
      Image5,
      Image6
    ]
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-8">
      {/* Left column - Product images */}
      <div className="md:w-1/2 flex gap-4">
        <div className="hidden md:flex flex-col gap-2">
          {product.images.map((img, index) => (
            <div 
              key={index}
              className={`w-16 h-16 border cursor-pointer ${activeImage === index ? 'border-gray-500' : 'border-gray-200'}`}
              onClick={() => setActiveImage(index)}
            >
              <img 
                src= {img} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex-1 relative group">
          <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button className="bg-white p-2 rounded-full shadow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          </div>
          <img 
            src={activeImage === 0 ? product.images[0] : product.images[activeImage]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right column - Product details */}
      <div className="md:w-1/2">
        <div className="bg-orange-500 text-white px-3 py-1 inline-block mb-2 text-sm font-medium">NEW</div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">({product.reviews})</span>
          <div className="ml-4 text-sm">
            Chia sẻ: <span className="bg-blue-600 text-white rounded-full w-5 h-5 inline-flex items-center justify-center">f</span>
          </div>
          <div className="ml-4 text-sm">Đã bán: {product.sold}</div>
        </div>

        <div className="flex items-center mb-6">
          <div className="text-red-500 font-bold text-xl">-{product.discount}%</div>
          <div className="ml-4 text-xl font-bold text-orange-500">{product.salePrice.toLocaleString()}đ</div>
          <div className="ml-2 text-gray-500 line-through">{product.originalPrice.toLocaleString()}đ</div>
        </div>

        <div className="mb-4">
          <div className="font-medium mb-2">{product.colors[0].label}</div>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`w-8 h-8 rounded-full border ${selectedColor === color.name ? 'border-black border-2' : 'border-gray-300'}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-medium mb-1">Kích thước:</div>
          <div>Dài {product.dimensions.width} x Rộng {product.dimensions.depth} x Cao {product.dimensions.height} cm</div>
        </div>

        <div className="mb-6">
          <div className="font-medium mb-1">Chất liệu:</div>
          <div>
            {product.material} <span className="text-orange-500">(*)</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <span className="text-orange-500">(*)</span> Tiêu chuẩn California Air Resources Board xuất khẩu Mỹ, đảm bảo gỗ không độc hại, an toàn cho sức khỏe người dùng và thân thiện với môi trường.
          </div>
        </div>

        <div className="flex items-center mb-6">
          <button 
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            onClick={decrementQuantity}
          >
            <Minus size={16} />
          </button>
          <div className="w-12 h-8 border-t border-b border-gray-300 flex items-center justify-center">
            {quantity}
          </div>
          <button 
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            onClick={incrementQuantity}
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-blue-600 text-white py-3 px-4 font-medium uppercase flex items-center justify-center">
            Thêm vào giỏ
          </button>
          <button className="bg-orange-500 text-white py-3 px-4 font-medium uppercase flex items-center justify-center">
            Mua ngay
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <p>Miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP.HCM, Hà Nội, khu đô thị Ecopark, Biên Hòa và một số quận thuộc Bình Dương <span className="text-orange-500">(*)</span></p>
          </div>
          <div className="flex items-start">
            <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <p>Miễn phí 1 đổi 1 - Bảo hành 2 năm - Bảo trì trọn đời <span className="text-orange-500">(**)</span></p>
          </div>
          <div className="ml-6 text-sm text-gray-600">
            <p><span className="text-orange-500">(*)</span> Không áp dụng cho danh mục Đồ Trang Trí</p>
            <p><span className="text-orange-500">(**)</span> Không áp dụng cho các sản phẩm Clearance. Chỉ bảo hành 01 năm cho khung ghế, mâm và cần đòi với Ghế Văn Phòng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailMain;