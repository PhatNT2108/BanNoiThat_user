import React, { useState } from 'react';  
import { Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  
  const menuItems = [
    { label: 'Sản Phẩm', href: '/san-pham', hasDropdown: true },
    { label: 'BST Bắc Âu', href: '/bst-bac-au', hasDropdown: true },
    { label: 'Tủ Bếp', href: '/tu-bep', hasDropdown: true },
    { label: 'Khuyến Mãi', href: '/khuyen-mai', hasDropdown: true },
    { label: 'Tin tức', href: '/tin-tuc', hasDropdown: true },
    { label: 'About Us', href: '/about-us' },
    { label: 'Showroom', href: '/showroom' },
  ];

  // Sample cart item for demonstration
  const cartItems = [
    { id: 1, name: 'GHẾ SOFA MOHO LYNGBY 601 BE', price: 7999000, quantity: 1, imageUrl: '/sofa-image.png', originalPrice: 10990000 }
  ];

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/moho-logo.png" alt="COME HOME" className="h-8" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">
              3D HOUSE
            </button>

            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <div className="text-sm">
                <Link to="/auth" className="hover:text-orange-500">
                  Đăng nhập / Đăng ký
                </Link>
                <p className="text-gray-600">Tài khoản của tôi</p>
              </div>
            </div>

            <div className="relative">
              <button className="relative" onClick={toggleCart}>
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
              
              {cartOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-bold mb-4">GIỎ HÀNG</h3>
                    
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center border-b border-gray-200 pb-4 mb-4">
                            <div className="w-24 h-24 bg-gray-100 mr-4">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{item.name}</h4>
                              <div className="flex items-center mt-1">
                                <input 
                                  type="number" 
                                  value={item.quantity} 
                                  min="1" 
                                  className="w-12 border border-gray-300 rounded text-center mr-2"
                                  readOnly
                                />
                                <div>
                                  <p className="text-orange-500 font-bold">{item.price.toLocaleString()}đ</p>
                                  <p className="text-gray-500 text-xs line-through">{item.originalPrice.toLocaleString()}đ</p>
                                </div>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              ✕
                            </button>
                          </div>
                        ))}
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">TỔNG TIỀN:</span>
                          <span className="text-orange-500 font-bold">{(7999000).toLocaleString()}đ</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link to="/cart" className="flex-1 py-2 bg-gray-800 text-white text-center rounded font-medium">
                            XEM GIỎ HÀNG
                          </Link>
                          <Link to="/checkOut" className="flex-1 py-2 bg-blue-700 text-white text-center rounded font-medium">
                            THANH TOÁN
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-700">Giỏ hàng của bạn đang trống.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="text-gray-700 hover:text-orange-500 flex items-center"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </Link>
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li><Link to="#" className="text-gray-700 hover:text-orange-500">Sub Item 1</Link></li>
                        <li><Link to="#" className="text-gray-700 hover:text-orange-500">Sub Item 2</Link></li>
                        <li><Link to="#" className="text-gray-700 hover:text-orange-500">Sub Item 3</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;