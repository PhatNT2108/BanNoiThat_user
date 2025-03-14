import React from "react";

const CheckoutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nội Thất MOHO</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Shipping and Payment Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Họ và tên" className="p-2 border rounded w-full" />
                <input type="text" placeholder="Số điện thoại" className="p-2 border rounded w-full" />
              </div>
              <input type="text" placeholder="Địa chỉ" className="p-2 border rounded w-full" />
              <div className="grid grid-cols-3 gap-4">
                <select className="p-2 border rounded w-full">
                  <option>Chọn tỉnh/thành</option>
                </select>
                <select className="p-2 border rounded w-full">
                  <option>Chọn quận/huyện</option>
                </select>
                <select className="p-2 border rounded w-full">
                  <option>Chọn phường/xã</option>
                </select>
              </div>
            </form>
          </div>

          {/* Payment Methods */}
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio" />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio" />
                <span>Ví MoMo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section: Cart Summary */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Giỏ hàng của bạn</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Ghế Đôn UBEDA</span>
              <span>749,000₫</span>
            </div>
            <div className="flex justify-between">
              <span>Bộ Bàn Ăn Scania</span>
              <span>9,700,000₫</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Tổng cộng</span>
              <span>10,539,000₫</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700">
            Hoàn tất đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
