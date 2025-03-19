import React, { useState, useEffect } from "react";
import axios from "axios";
import clientAPI from "../../../api/client-api/rest-client";
import ApiResponse from "../../../model/ApiResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import User from "../../../model/User";
import { useNavigate } from "react-router-dom";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
  province_code: string;
}

interface Ward {
  code: string;
  name: string;
  district_code: string;
}

interface OrderInfo {
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
  paymentMethod: string;
}

const CheckOutMain = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({ fullName: "", paymentMethod: "", shippingAddress: "", phoneNumber: "" });
  const navigate = useNavigate();
  const userData: User = useSelector(
    (state: RootState) => state.users
  );
  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/p");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts based on province
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await axios.get("https://provinces.open-api.vn/api/d/");
          const filteredDistricts = response.data.filter(
            (district: any) => String(district.province_code) === String(selectedProvince)
          );
          setDistricts(filteredDistricts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Fetch wards based on district
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await axios.get("https://provinces.open-api.vn/api/w/");
          const filteredWards = response.data.filter(
            (ward: any) => String(ward.district_code) === String(selectedDistrict)
          );
          setWards(filteredWards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      } else {
        setWards([]);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  console.log(orderInfo);

  //Call Api
  const createOrder = async () => {
    var formOrder = new FormData();
    formOrder.append("fullName", orderInfo.fullName);
    formOrder.append("phoneNumber", orderInfo.phoneNumber);
    formOrder.append("shippingAddress", orderInfo.shippingAddress);
    formOrder.append("paymentMethod", orderInfo.paymentMethod);

    try {
      const response: ApiResponse = await clientAPI.service(`Payment`).create(formOrder);
      if (response.isSuccess && orderInfo.paymentMethod === "cod") {
        navigate("/");
        console.log("Create order success");
      }
      else if (response.isSuccess && orderInfo.paymentMethod === "momo") {
        window.location.href = response.result;
        console.log("Create order success");
      }
      else {
        console.log("Create order failed");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/*Thông tin giao hàng*/}
      <h1 className="text-2xl font-bold mb-4">Thông tin giao hàng</h1>
      <div className="border rounded shadow p-4 space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Họ và tên" value={orderInfo.fullName} onChange={(e) => setOrderInfo((prev) => ({ ...prev, fullName: e.target.value }))
        } />
        <div className="grid grid-cols-2 gap-4">
          <input className="w-full p-2 border rounded" placeholder="Email" />
          <input className="w-full p-2 border rounded" placeholder="Số điện thoại" value={orderInfo.phoneNumber} onChange={(e) => setOrderInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))} />
        </div>

        {/*get api Tỉnh thành*/}
        <div className="mb-4 flex flex-row space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Tỉnh/Thành phố:</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Quận/Huyện:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Xã/Phường:</label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="">Chọn xã/phường</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input className="w-full p-2 border rounded" placeholder="Địa chỉ" value={orderInfo.shippingAddress} onChange={(e) => setOrderInfo((prev) => ({ ...prev, shippingAddress: e.target.value }))} />
      </div>

      {/*Phương thức thanh toán*/}
      <h2 className="text-xl font-bold mt-6 mb-2">Phương thức thanh toán</h2>
      <div className="border rounded shadow p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" value="cod" id="cod" onChange={(e) => setOrderInfo((prev) => ({ ...prev, paymentMethod: e.target.value }))} />
            <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" value="momo" id="momo" onChange={(e) => setOrderInfo((prev) => ({ ...prev, paymentMethod: e.target.value }))} />
            <label htmlFor="momo">Ví MoMo</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="border rounded p-2 bg-green-700 text-white" onClick={createOrder}>Hoàn tất đơn hàng</button>
      </div>
    </div>
  );
};

export default CheckOutMain;
