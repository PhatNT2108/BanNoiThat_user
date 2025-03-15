import React from "react";
import ItemCheckOut from "./ItemCheckOut";

const CheckOutBill: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded shadow">
      {/* Order Items */}
      <div className="mb-4">
        <ItemCheckOut />
      </div>
      
      {/* Discount Code */}
      <div className="px-4 py-3 flex space-x-2">
        <input 
          type="text" 
          placeholder="Mã giảm giá" 
          className="flex-grow border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded text-sm font-medium">
          Sử dụng
        </button>
      </div>
      
      {/* Customer Status */}
      <div className="px-4 py-3 border-t border-b">
        <div className="flex justify-between items-center">
          <p className="text-sm">Khách hàng thân thiết</p>
          <button className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm">
            Đăng nhập
          </button>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="px-4 py-3">
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Tạm tính</p>
          <p className="text-sm">7.999.000₫</p>
        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Phí vận chuyển</p>
          <p className="text-sm text-blue-500">Miễn phí</p>
        </div>
        <div className="flex justify-between py-3 border-t mt-2">
          <p className="text-sm font-medium">Tổng cộng</p>
          <div className="text-right">
            <p className="text-xs text-gray-500">VND</p>
            <p className="text-lg font-medium">7.999.000₫</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutBill;