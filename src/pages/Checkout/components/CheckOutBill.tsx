import React from "react";
import ItemCheckOut from "./ItemCheckOut";
import { CartResponse } from "../../../model/CartResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CheckOutBill: React.FC = () => {
  const [priceShip, setPriceShip] = React.useState(0);

  const cartData: CartResponse = useSelector(
    (state: RootState) => state.carts
  );

  console.log(cartData);

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow">
      {/* Order Items */}
      <div className="mb-4">
        {cartData.cartItems.map((item) => (
          <ItemCheckOut key={item.id} itemCart={item} />
        ))}
      </div>

      {/* Order Summary */}
      <div className="px-4 py-3">
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Tạm tính</p>
          <p className="text-sm">{cartData.cartItems.reduce((total, cartItem) => total + cartItem.salePrice, 0)}</p>
        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Phí vận chuyển</p>
          <p className="text-sm text-blue-500">Miễn phí</p>
        </div>
        <div className="flex justify-between py-3 border-t mt-2">
          <p className="text-sm font-medium">Tổng cộng</p>
          <div className="text-right">
            <p className="text-xs text-gray-500">VND</p>
            <p className="text-lg font-medium">{cartData.cartItems.reduce((total, cartItem) => total + cartItem.salePrice, 0) + priceShip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutBill;