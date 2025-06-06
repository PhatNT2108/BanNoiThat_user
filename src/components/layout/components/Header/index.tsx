import React, { memo, ReactEventHandler, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../../model/User";
import Cart from "../Cart";
import type { RootState } from "../../../../redux/store";
import { setUser, emptyUserState } from "../../../../redux/features/userSlice";
import "./Header_style.css";
import Navigation from "../Navigation";

const Header = () => {
  const [stringSearch, setStringSearch] = useState("");
  const [isOpenUser, setIsOpenUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData: User = useSelector((state: RootState) => state.users);

  const triggerSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/collections",
      search: `?stringSearch=${stringSearch.toString()}`,
    });
  };

  const triggerLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("conversationId");
    dispatch(setUser(emptyUserState));
    window.location.reload();
  };

  return (
    <header className="header max-w-full relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {/* Logo */}
          <Link to="/">
            <img
              className="sm:size-20 size-12"
              src="https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/logo-pratise.svg"
              alt="Nội Thất MOHO"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <div className="flex flex-row justify-center items-center">
              <input
                type="text"
                value={stringSearch}
                onChange={(e) => setStringSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full sm:w-[20rem] md:w-[30rem] lg:w-[40rem] xl:w-[45rem] p-2 pr-10 border-2 border-white rounded-lg focus:outline-none focus:border-white"
              ></input>
              <button
                className="transform -translate-x-10 bg-gray-800 p-2 rounded"
                onClick={triggerSearch}
              >
                <Search className="w-4 h-4 text-white" />
              </button>
              {userData ? (
                <div className="flex sm:flex-row sm:hidden gap-2">
                  <div className="icon-user">
                    <div onClick={() => setIsOpenUser((prev) => !prev)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-8 text-green-100"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div
                      className={`dropdown-menu-user ${isOpenUser ? "open-menu-user" : ""
                        }`}
                    >
                      <div className="text-lg p-3 border-b-2 mx-auto">
                        {" "}
                        Thông tin tài khoản{" "}
                      </div>
                      <Link
                        to="/information"
                        className="p-2 hover:cursor-pointer block"
                      >
                        Tài khoản của bạn
                      </Link>
                      <Link
                        to="/orders"
                        className="p-2 hover:cursor-pointer block"
                      >
                        Đơn hàng
                      </Link>
                      <div
                        className="p-2 hover:cursor-pointer"
                        onClick={triggerLogout}
                      >
                        Đăng xuất
                      </div>
                      <svg
                        onClick={() => setIsOpenUser((prev) => !prev)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="absolute top-2 right-2 z-30 hover:cursor-pointer size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <Cart />
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="md:hidden  text-gray-200 hover:text-orange-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className="header-user-info">
            {userData.email ? (
              <div className="flex flex-row gap-4 hidden sm:flex">
                {/* Icon yêu thích */}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 text-green-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>

                {/* Cart */}
                <Cart />

                {/* Icon người dùng */}
                <div className="icon-user">
                  <div onClick={() => setIsOpenUser((prev) => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-8 text-green-100"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div
                    className={`dropdown-menu-user relative ${isOpenUser ? "open-menu-user" : ""
                      } z-10`}
                  >
                    <Link
                      to="/information"
                      className="p-2 hover:cursor-pointer block"
                    >
                      Thông tin tài khoản
                    </Link>
                    <Link
                      to="/orders"
                      className="p-2 hover:cursor-pointer block"
                    >
                      Đơn hàng
                    </Link>
                    <div
                      className="p-2 hover:cursor-pointer"
                      onClick={triggerLogout}
                    >
                      Đăng xuất
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                <Link
                  to="/auth"
                  className="max-[640px]:hidden flex bg-slate-200 px-2 py-1 rounded-full items-center text-black hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <span>Đăng nhập/Đăng ký</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="navigate-section-header">
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
