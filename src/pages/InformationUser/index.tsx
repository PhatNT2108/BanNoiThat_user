import React, { useState, useEffect, ChangeEvent } from "react";
import clientAPI from "../../api/client-api/rest-client";
import ApiResponse from "../../model/ApiResponse";
import User from "../../model/User";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LocationSelector from "./LocationUserInput";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";

interface Province { code: string; name: string; }
interface District { code: string; name: string; }
interface Ward { code: string; name: string; }

function InformationUserPage() {
  const userData: User = useSelector((state: RootState) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const loadInfoUser = async () => {
    console.log(userData);
    try {
      const response: ApiResponse = await clientAPI.service(`users/${userData.user_id}`).find();
      if (response.isSuccess) setUserInfo(response.result);
    } catch {
      console.error("Error loading user information");
    }
  };

  const updateInfoUser = async (isOnlyUpdateInfo: string) => {
    if (!userInfo) return;
    if (!userInfo.birthday) {
      setError("Vui lòng chọn ngày sinh hợp lệ.");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("fullName", userInfo.fullName);
    formData.append("birthday", new Date(userInfo.birthday).toISOString());
    formData.append("isMale", userInfo.isMale);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("isOnlyUpdateInfo", isOnlyUpdateInfo);
    formData.append("shippingAddress", address);
    formData.append("province", provinces.find(p => p.code == selectedProvince)?.name || "");
    formData.append("district", districts.find(d => d.code == selectedDistrict)?.name || "");
    formData.append("ward", wards.find(w => w.code == selectedWard)?.name || "");

    const response: ApiResponse = await clientAPI.service("users").put(userData.user_id, formData);
    if (response.isSuccess) {
      setUserInfo(response.result);
      loadInfoUser();
    }
  };

  useEffect(() => {
    if (userData) {
      loadInfoUser();
    }
  }, [userData]);

  const handleEditInfoClick = (isSave: boolean) => {
    if (isSave) updateInfoUser("true");
    setIsEditing(!isEditing);
  };

  const handleEditAddressUserClick = (isSave: boolean) => {
    if (isSave) updateInfoUser("false");
    setIsEditAddress(!isEditAddress);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const Label = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <label className="flex items-center text-sm font-medium text-gray-700 gap-2 mb-1">
      {icon} {text}
    </label>
  );


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-100 py-12 px-4 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Thông tin cá nhân</h2>

        {userInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label icon={<AccountCircleIcon color="primary" />} text="Họ và tên" />
              {isEditing ? (
                <input name="fullName" value={userInfo.fullName || ""} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              ) : (
                <p className="text-gray-800">{userInfo.fullName}</p>
              )}
            </div>

            <div>
              <Label icon={<EmailIcon color="action" />} text="Email" />
              <input type="email" name="email" value={userInfo.email || ""} disabled
                className="w-full border bg-gray-100 text-gray-600 rounded-lg px-3 py-2" />
            </div>

            <div>
              <Label icon={<CalendarMonthIcon color="secondary" />} text="Ngày sinh" />
              {isEditing ? (
                <input type="date" name="birthday" value={userInfo.birthday}
                  onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
              ) : (
                <p className="text-gray-800">{userInfo.birthday?.substring(0, 10)}</p>
              )}
            </div>

            <div>
              <Label icon={<WcIcon color="primary" />} text="Giới tính" />
              {isEditing ? (
                <select name="isMale" value={userInfo?.isMale?.toString()} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2">
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              ) : (
                <p className="text-gray-800">{userInfo.isMale ? "Nam" : "Nữ"}</p>
              )}
            </div>

            <div>
              <Label icon={<PhoneIcon color="success" />} text="Số điện thoại" />
              {isEditing ? (
                <input type="number" name="phoneNumber" value={userInfo.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2" />
              ) : (
                <p className="text-gray-800">{userInfo.phoneNumber}</p>
              )}
            </div>
          </div>
        ) : <p>Đang tải thông tin người dùng...</p>}

        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <>
              <button onClick={() => handleEditInfoClick(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow">Lưu</button>
              <button onClick={() => handleEditInfoClick(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow">Hủy</button>
            </>
          ) : (
            <button onClick={() => handleEditInfoClick(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">Chỉnh sửa thông tin</button>
          )}
        </div>

        <hr className="my-8" />
        <h3 className="text-xl font-semibold text-blue-700 mb-3">Địa chỉ nhận hàng</h3>
        {isEditAddress ? (
          <LocationSelector
            selectedProvince={selectedProvince}
            selectedDistrict={selectedDistrict}
            selectedWard={selectedWard}
            shippingAddress={address}
            setSelectedProvince={setSelectedProvince}
            setSelectedDistrict={setSelectedDistrict}
            setSelectedWard={setSelectedWard}
            setProvincesOut={setProvinces}
            setDistrictsOut={setDistricts}
            setWardsOut={setWards}
            setAddress={setAddress}
          />
        ) : (
          <div className="text-gray-800">{userInfo?.address || "Chưa có địa chỉ nhận hàng."}</div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          {isEditAddress ? (
            <>
              <button onClick={() => handleEditAddressUserClick(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow">Lưu địa chỉ</button>
              <button onClick={() => handleEditAddressUserClick(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow">Hủy</button>
            </>
          ) : (
            <button onClick={() => handleEditAddressUserClick(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">Chỉnh sửa địa chỉ</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InformationUserPage;
