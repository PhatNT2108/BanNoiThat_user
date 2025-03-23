import React, { useState } from "react";
import clientAPI from "../../api/client-api/rest-client";
import ApiResponse from "../../model/ApiResponse";
import User from "../../model/User";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function InformationUserPage() {
  const userData: User = useSelector((state: RootState) => state.users);

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  // Call API để load thông tin user
  const loadForm = async () => {
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
  const updateInfoUser = async () => {
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

    const response: ApiResponse = await clientAPI
      .service("users")
      .put(userData.user_id, formData);

    if (response.isSuccess) {
      setUserInfo(response.result);
      loadForm();
    }
  };

  React.useEffect(() => {
    loadForm();
  }, []);

  // Xử lý nút Edit/Save
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      updateInfoUser();
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
        <span className="text-lg px-auto text-center p-2 block">Thông tin cá nhân</span>
        <div className="flex flex-col items-center">
          <div className="text-center">
            {userInfo ? (
              isEditing ? (
                <>
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
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <select
                    name="isMale"
                    value={userInfo.isMale}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  >
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </select>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userInfo.fullName}
                  </h2>
                  <p className="text-gray-600 mt-1">{userInfo.email}</p>
                  <p className="text-gray-600 mt-1">
                    Birthday: {userInfo.birthday ? userInfo.birthday.substring(0, 10) : "N/A"}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Gender: {userInfo.isMale === "true" ? "Male" : "Female"}
                  </p>
                </>
              )
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InformationUserPage;
