import React, { useState } from "react";
import ItemCheckOut from "./ItemCheckOut";
import { CartResponse } from "../../../model/CartResponse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import clientAPI from "../../../api/client-api/rest-client";
import ApiResponse from "../../../model/ApiResponse";
import { Coupon } from "../../../model/Coupon";
import { setCoupon } from "../../../redux/features/couponSlice";

const CheckOutBill: React.FC = () => {
  const [priceShip, setPriceShip] = React.useState(0);
  const [codeCoupon, setCodeCoupon] = useState("");
  const [currentMessageCoupon, setCurrentMessageCoupon] = useState("");
  const cartData: CartResponse = useSelector(
    (state: RootState) => state.carts
  );

  const couponData: Coupon[] = useSelector(
    (state: RootState) => state.coupons
  );
  const dispatch = useDispatch();

  const loadCoupon = async (codeCoupon: string) => {
    try {
      var data: ApiResponse = await clientAPI.service("coupon/checkcoupon").find(`codeCoupon=${codeCoupon}`);
      if (!data.result?.isCanApply || couponData.some((coupon) => coupon.codeCoupon === data.result?.codeCoupon)) {
        setCurrentMessageCoupon("Mã đã được áp dụng")
        return;
      }
      dispatch(setCoupon(data.result));
      setCodeCoupon("");
    }
    catch (e) {
      console.log(e);
    }
  }

  const triggerAddCoupon = () => {
    console.log("trigger ")
    loadCoupon(codeCoupon);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow">
      {/* Order Items */}
      <div className="mb-4">
        {cartData.cartItems.map((item) => (
          <ItemCheckOut key={item.id} itemCart={item} />
        ))}
      </div>
      {/* Nhập mã giảm giá */}
      <div className="flex flex-col gap-2 p-3 mt-2">
        <label htmlFor="voucherCode" className="block text-sm text-gray-600 mb-2">Nhập mã giảm giá</label>
        <div className="flex">
          <input
            id="voucherCode"
            type="text"
            placeholder="Nhập mã"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none "
            value={codeCoupon}
            onChange={(e) => setCodeCoupon(e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600"
            onClick={triggerAddCoupon}
          >
            Áp dụng
          </button>
        </div>
        <div className="text-red-500">
          {currentMessageCoupon}
        </div>
        <div className="flex flex-row gap-1 flex-wrap">
          {
            couponData.map((coupon: Coupon, index: number) => (
              coupon.isCanApply ? (
                <div className="flex flex-row gap-1 bg-red-300 w-max p-2" key={index}>
                  <p>{coupon.nameCoupon}</p>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>) : ""
            ))
          }
        </div>
      </div>
      {/* Order Summary */}
      <div className="px-4 py-3 border-t">
        <div className="flex justify-between py-1.5">
          <p className="text-lg text-gray-600">Tạm tính</p>
          <p className="text-lg">{cartData.cartItems.reduce((total, cartItem) => total + cartItem.price, 0).toLocaleString("vi-VN")} ₫</p>
        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Giảm giá</p>
          <p className="text-sm">-{cartData.cartItems.reduce((total, cartItem) => (total + cartItem.price - cartItem.salePrice), 0).toLocaleString("vi-VN")} ₫</p>
        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Giảm từ coupon</p>
          <p className="text-sm">-
            {(
              couponData.reduce((totalDiscount, coupon) => totalDiscount + coupon.amountDiscount, 0)
            ).toLocaleString("vi-VN")} ₫
          </p>        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Phí vận chuyển</p>
          <p className="text-sm text-blue-500">Miễn phí</p>
        </div>

        <div className="flex justify-between py-3 border-t mt-2">
          <p className="text-sm font-medium">Tổng cộng</p>
          <div className="text-right">
            <p className="text-lg font-medium">
              {(
                cartData.cartItems.reduce((total, cartItem) => total + cartItem.salePrice, 0) +
                priceShip -
                couponData.reduce((totalDiscount, coupon) => totalDiscount + coupon.amountDiscount, 0)
              ).toLocaleString("vi-VN")} ₫
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutBill;