import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart';
import type { RootState } from '../../../../redux/store';
import User from '../../../../model/User';
import { setUser, emptyUserState } from '../../../../redux/features/userSlice';
import Navigation from "../Navigation";
import "./headershort.css";

function HeaderShort() {
  const [stringSearch, setStringSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData: User = useSelector(
    (state: RootState) => state.users
  );

  const triggerSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate({
      pathname: "/collections",
      search: `?stringSearch=${stringSearch.toString()}`
    });
  }

  const triggerLogout = () => {
    localStorage.removeItem('userToken');
    dispatch(setUser(emptyUserState));
    window.location.reload();
  }

  return (
    <header className="header-short max-w-full relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-4">
          {/* Logo */}
          <Link to="/" className="h-[5rem] w-[5rem] ml-10">
            <img src='https://productstorageimages.blob.core.windows.net/bannoithat-3dmodel/logo-pratise.svg' alt="Nội Thất MOHO" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={stringSearch}
                onChange={(e) => setStringSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full p-2 border-2 border-white rounded-lg focus:outline-none focus:border-white"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded" onClick={triggerSearch}>
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
            <Navigation />
          </div>

          {/* Right Section */}
          <div className="header-user-info">
            {
              userData.email ? (
                <div className="icon-user">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-green-100">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                  </svg>

                  <div className='dropdown-menu-user'>
                    <Link to="/information" className='p-2 hover:cursor-pointer block'>Thông tin tài khoản</Link>
                    <Link to="/orders" className='p-2 hover:cursor-pointer block'>Đơn hàng</Link>
                    <div className='p-2 hover:cursor-pointer' onClick={triggerLogout}>Đăng xuất</div>
                  </div>
                </div>
              ) : (<div className="text-sm">
                <Link to="/auth" className="hover:text-orange-500">
                  Đăng nhập / Đăng ký
                </Link>
              </div>)
            }
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-green-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            {/* Cart */}
            <Cart />
          </div>
        </div >
      </div >
    </header >
  );
}

export default HeaderShort;