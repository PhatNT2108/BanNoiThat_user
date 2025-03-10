import React, {useState, useEffect} from "react";
import axios from "axios";

const CheckOutMain = () => {
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
  
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
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
                        (district : any) => String(district.province_code) === String(selectedProvince)
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
                        (ward : any) => String(ward.district_code) === String(selectedDistrict)
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
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Thông tin giao hàng</h1>
      
      <div className="border rounded shadow p-4 space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Họ và tên" />
        <div className="grid grid-cols-2 gap-4">
          <input className="w-full p-2 border rounded" placeholder="Email" />
          <input className="w-full p-2 border rounded" placeholder="Số điện thoại" />
        </div>
        
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
        <input className="w-full p-2 border rounded" placeholder="Địa chỉ" />
      </div>
      
      <h2 className="text-xl font-bold mt-6 mb-2">Phương thức thanh toán</h2>
      <div className="border rounded shadow p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" value="bank" id="bank" defaultChecked />
            <label htmlFor="bank">Thanh toán chuyển khoản qua ngân hàng</label>
          </div>
          <div className="pl-6 text-sm text-gray-500">
            Tên tài khoản: Công Ty Cổ Phần Hợp Tác Kinh Tế Và Xuất Nhập Khẩu Savimex
            <br />Số tài khoản: 0071001303687 (Vietcombank - CN HCM)
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" value="pos" id="pos" />
            <label htmlFor="pos">Thanh toán quẹt thẻ khi giao hàng (POS)</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" value="vnpay" id="vnpay" />
            <label htmlFor="vnpay">Thanh toán online qua VNPay</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" value="momo" id="momo" />
            <label htmlFor="momo">Ví MoMo</label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button className="border rounded p-2">Giỏ hàng</button>
        <button className="border rounded p-2 bg-blue-500 text-white">Hoàn tất đơn hàng</button>
      </div>
    </div>
  );
};

export default CheckOutMain;
