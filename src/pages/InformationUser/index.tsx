import React, { useState } from "react";

function InformationUserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: "https://via.placeholder.com/150",
    fullName: "John Doe",
    email: "johndoe@example.com",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

  interface FileReaderEvent extends ProgressEvent<FileReader> { }

  const handleImageChange = (e: ImageChangeEvent): void => {
    const file: File | undefined = e.target.files ? e.target.files[0] : undefined;
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (event: FileReaderEvent): void => {
        if (event.target && event.target.result) {
          setUserInfo((prev) => ({ ...prev, avatar: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={userInfo.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full shadow-lg mb-4"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M4 13l6 6L20 7m-8-2h7a2 2 0 012 2v7"
                  />
                </svg>
              </label>
            )}
          </div>
          <div className="text-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">
                  {userInfo.fullName}
                </h2>
                <p className="text-gray-600 mt-1">{userInfo.email}</p>
              </>
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
