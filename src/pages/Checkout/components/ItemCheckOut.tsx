import React from "react";
import { CartItemResponse } from "../../../model/CartResponse";

interface Props {
  itemCart: CartItemResponse; // Định nghĩa kiểu dữ liệu cho itemCart
}

const ItemCheckOut: React.FC<Props> = ({ itemCart }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="w-16 h-16 bg-gray-100 mr-4 flex-shrink-0">
        <img src={itemCart.imageUrl} alt={itemCart.imageUrl} className="w-full h-full object-cover rounded-sm" />
      </div>
      <div className="flex-grow">
        <h2 className="text-sm font-medium">{itemCart.nameOption}</h2>
      </div>
      <div className="text-right">
        <p className="font-medium text-orange-500 text-lg">{itemCart.salePrice.toLocaleString("vi-VN")}₫</p>
        <p className="font-medium text-sm line-through">{itemCart.price.toLocaleString("vi-VN")}₫</p>
      </div>
    </div>
  );
};

export default ItemCheckOut;
