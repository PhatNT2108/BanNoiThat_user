import React, { useState } from "react";
import clientAPI from "../../api/client-api/rest-client";
import ApiResponse from "../../model/ApiResponse";
import User from "../../model/User";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LocationSelector from "./LocationUserInput";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

interface Ward {
  code: string;
  name: string;
}

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

  // Call API để load thông tin user
  const loadInfoUser = async () => {
    try {
      const response: ApiResponse = await clientAPI.service(`users/${userData.user_id}`).find();
      if (response.isSuccess) {
        setUserInfo(response.result);
      }
    } catch {
      console.error("Error loading user information");
    }

  };

  // Call API để cập nhật thông tin user
  const updateInfoUser = async (isOnlyUpdateInfo: string) => {
    if (!userInfo) return;

    if (!userInfo.birthday) {
      setError("Please select a valid date of birth.");
      return;
    }

    setError(""); // Xóa thông báo lỗi nếu hợp lệ

    const formData = new FormData();
    formData.append("fullName", userInfo.fullName);
    formData.append("birthday", new Date(userInfo.birthday).toISOString());
    formData.append("isMale", userInfo.isMale);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("isOnlyUpdateInfo", isOnlyUpdateInfo);

    formData.append("shippingAddress", address);
    formData.append("province", provinces.find(province => province.code == selectedProvince)?.name || "");
    formData.append("district", districts.find(district => district.code == selectedDistrict)?.name || "");
    formData.append("ward", wards.find(wards => wards.code == selectedWard)?.name || "");

    console.log(provinces.find(province => province.code == selectedProvince)?.name)

    const response: ApiResponse = await clientAPI
      .service("users")
      .put(userData.user_id, formData);

    if (response.isSuccess) {
      setUserInfo(response.result);
      loadInfoUser();
    }
  };

  React.useEffect(() => {
    loadInfoUser();
  }, []);

  // Xử lý nút Edit/Save
  const handleEditInfoClick = (isSave: boolean) => {
    setIsEditing(!isEditing);
    if (isSave) {
      updateInfoUser("true");
    }
  };

  const handleEditAddressUserClick = (isSave: boolean) => {
    setIsEditAddress(!isEditAddress);
    if (isSave) {
      updateInfoUser("false");
    }
  };

  // Xử lý thay đổi thông tin user
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-1/2">
        <span className="font-bold text-lg px-auto text-center p-2 block">Thông tin cá nhân</span>
        <div className="flex flex-col items-center">
          {/* Xử lý user info */}
          <div className="text-center">
            {userInfo ? (
              isEditing ? (
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={userInfo.fullName || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email || ""}
                    disabled={true}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  />
                  <input
                    type="date"
                    name="birthday"
                    value={userInfo.birthday}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  />
                  <input
                    type="number"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <select
                    name="isMale"
                    value={userInfo.isMale.toString()}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  >
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl text-gray-800">
                    {userInfo.fullName}
                  </h2>
                  <p className="text-gray-600 mt-1">{userInfo.email}</p>
                  <p className="text-gray-600 mt-1">
                    Ngày sinh: {userInfo.birthday ? userInfo.birthday.substring(0, 10) : "N/A"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Giới tính: {userInfo.isMale ? "Nam" : "Nữ"}
                  </p>
                </div>
              )
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
          {
            //Xử lý nút Edit/Save
            userInfo && (
              <div>
                {isEditing ? (<div className="flex gap-2">
                  <button
                    onClick={() => handleEditInfoClick(true)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleEditInfoClick(false)}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Cancel
                  </button>
                </div>)
                  :
                  (
                    <button
                      onClick={() => handleEditInfoClick(false)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Chỉnh sửa thông tin cá nhân
                    </button>
                  )}
              </div>
            )
          }


          {/* Xử lý address */}
          <div>
            <span className="font-bold text-lg px-auto text-center p-2 block mt-3">Địa chỉ nhận hàng</span>
            {
              userInfo ? (isEditAddress ? (<div className="mt-4 w-full">
                <LocationSelector
                  selectedProvince={selectedProvince || ""}
                  selectedDistrict={selectedDistrict || ""}
                  selectedWard={selectedWard || ""}
                  shippingAddress={address || ""}
                  setSelectedProvince={setSelectedProvince}
                  setSelectedDistrict={setSelectedDistrict}
                  setSelectedWard={setSelectedWard}
                  setProvincesOut={setProvinces}
                  setDistrictsOut={setDistricts}
                  setWardsOut={setWards}
                  setAddress={setAddress}
                />
              </div>) : (<div>{userInfo?.address}</div>))
                : (<div>Chưa có thông tin</div>)
            }
          </div>
          {
            userInfo && (
              <div>
                {isEditAddress ? (<div className="flex gap-2">
                  <button
                    onClick={() => handleEditAddressUserClick(true)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleEditAddressUserClick(false)}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Cancel
                  </button>
                </div>)
                  :
                  (
                    <button
                      onClick={() => handleEditAddressUserClick(false)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Chỉnh sửa địa chỉ
                    </button>
                  )}
              </div>
            )
          }
        </div>
      </div>
    </div >
  );
}

export default InformationUserPage;
