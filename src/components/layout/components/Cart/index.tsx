import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // or adjust to your icon library
import clientAPI from '../../../../api/client-api/rest-client';
import { useSelector } from 'react-redux';
import User from '../../../../model/User';
import { RootState } from '../../../../redux/store';
import { CartResponse } from '../../../../model/CartResponse';
import ApiResponse from '../../../../model/ApiResponse';

function Cart() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartData, setCartData] = useState<CartResponse>();
  const navigate = useNavigate();

  const userData: User = useSelector(
    (state: RootState) => state.users
  );

  //Call Api
  const LoadData = async () => {
    const data: ApiResponse = await clientAPI.service("carts").find(`email=${userData.email}`);
    setCartData(data.result);
  }

  const deleteCartItem = async (idCart: string, idCartItem: string) => {
    console.log(idCart, idCartItem);
    const apiResponse: ApiResponse = await clientAPI.service(`carts/${idCart}/cartitems`).remove(`${idCartItem}?email=${userData.email}`);
    if (apiResponse.isSuccess) {
      LoadData();
    }
  }

  //None
  useEffect(() => {
    if (userData.email) {
      console.log(userData);
      LoadData();
    }
  }, [userData]);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const navigateCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="relative">
      <button className="relative" onClick={toggleCart}>
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartData?.cartItems.length}
        </span>
      </button>

      {cartOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50" onMouseLeave={() => setCartOpen(false)}>
          <div className="p-4">
            <h3 className="font-bold mb-4">GIỎ HÀNG</h3>

            {cartData?.cartItems.length! > 0 ? (
              <div>
                {cartData?.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center border-b border-gray-200 pb-4 mb-4">
                    <div className="w-24 h-24 bg-gray-100 mr-4">
                      <img src={item.imageUrl} alt={item.nameOption} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.nameOption}</h4>
                      <div className="flex items-center mt-1">
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="w-12 border border-gray-300 rounded text-center mr-2"
                          readOnly
                        />
                        <div>
                          <p className="text-orange-500 font-bold">{item.salePrice.toLocaleString()}đ</p>
                          <p className="text-gray-500 text-xs line-through">{item.price.toLocaleString()}đ</p>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => deleteCartItem(cartData?.id!, item.id!)}>
                      ✕
                    </button>
                  </div>
                ))}

                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">TỔNG TIỀN:</span>
                  <span className="text-orange-500 font-bold">{
                    cartData?.cartItems.reduce((total, item) => { return (total + item.salePrice) * item.quantity }, 0).toLocaleString()
                  }đ</span>
                </div>

                <div className="flex space-x-2">
                  <Link to="/checkOut" className="flex-1 py-2 bg-blue-700 text-white text-center rounded font-medium" onClick={navigateCheckout}>
                    THANH TOÁN
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">Giỏ hàng của bạn đang trống.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;