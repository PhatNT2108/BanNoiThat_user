import React, { useEffect, useState } from "react";
import ItemCheckOut from "./ItemCheckOut";
import { CartItemResponse, CartResponse } from "../../../model/CartResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import clientAPI from "../../../api/client-api/rest-client";
import ApiResponse from "../../../model/ApiResponse";
import { useLocation } from "react-router-dom";

interface ShippingFeeResponse {
  total: number;
  serviceFee: number;
  insuranceFee: number;
  pickStationFee: number;
  couponValue: number;
  r2sFee: number;
  returnAgain: number;
  documentReturn: number;
  doubleCheck: number;
  codFee: number;
  pickRemoteAreasFee: number;
  deliverRemoteAreasFee: number;
  codFailedFee: number;
}

const CheckOutBill: React.FC = () => {
  const [feeShipping, setFeeShipping] = useState<ShippingFeeResponse>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const cartData: CartResponse = useSelector(
    (state: RootState) => state.carts
  );

  const selectedItems: CartItemResponse[] = queryParams.has("id")
    ? [
      {
        id: queryParams.get("id")!,
        productItem_Id: queryParams.get("id")!,
        productName: queryParams.get("name") || "Sản phẩm chưa rõ tên",
        nameOption: queryParams.get("nameOption") || "Không có tùy chọn",
        imageUrl: queryParams.get("imageUrl") || "", // Giá trị mặc định là chuỗi rỗng
        price: Number(queryParams.get("price")) || 0, // Giá trị mặc định là 0
        salePrice: Number(queryParams.get("salePrice")) || 0, // Giá trị mặc định là 0
        quantity: Number(queryParams.get("quantity")) || 1, // Giá trị mặc định là 1
      },
    ]
    : cartData.cartItems;

  const loadPriceShippingEstimate = async () => {
    try {
      const query = selectedItems
        .map((item, index) => `listProductItem[${index}]=${item.productItem_Id}&&quantity[${index}]=${item.quantity}`)
        .join("&");

      const data: ApiResponse = await clientAPI.service("payment/shipping-fee").find(`${query}`);
      setFeeShipping(data.result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPriceShippingEstimate();
  }, [selectedItems]);

  const subtotal = selectedItems.reduce((total, item) => total + item.salePrice * item.quantity, 0);
  const discount = selectedItems.reduce((total, item) => total + (item.price - item.salePrice) * item.quantity, 0);
  const total = subtotal + (feeShipping?.total || 0);

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow">
      {/* Order Items */}
      <div className="mb-4">
        {selectedItems.map((item) => (
          <ItemCheckOut key={item.id} itemCart={item} />
        ))}
      </div>

      {/* Order Summary */}
      <div className="px-4 py-3 border-t">
        <div className="flex justify-between py-1.5">
          <p className="text-lg text-gray-600">Tạm tính</p>
          <p className="text-lg">{subtotal.toLocaleString("vi-VN")} ₫</p>
        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Giảm giá</p>
          <p className="text-sm">-{discount.toLocaleString("vi-VN")} ₫</p>
        </div>
        <div className="flex justify-between py-1.5">
          <p className="text-sm text-gray-600">Phí vận chuyển ước tính</p>
          <p className="text-sm text-blue-500">
            {feeShipping?.total && feeShipping.total !== 0 ? `${feeShipping.total.toLocaleString("vi-VN")} ₫` : "Chưa có phí cụ thể "}
          </p>
        </div>
        <div className="flex justify-between py-3 border-t mt-2">
          <p className="text-sm font-medium">Tổng cộng</p>
          <div className="text-right">
            <p className="text-lg font-medium">{total.toLocaleString("vi-VN")} ₫</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutBill;
