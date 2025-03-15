import React, { ReactEventHandler, useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart';
import type { RootState } from '../../../../redux/store';
import User from '../../../../model/User';
import { ChevronDown } from "lucide-react";
import { setUser, emptyUserState } from '../../../../redux/features/userSlice';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stringSearch, setStringSearch] = useState('');
  const dispatch = useDispatch();

  const userData: User = useSelector(
    (state: RootState) => state.users
  );

  const triggerSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchParams({ stringSearch: stringSearch });
  }

  const triggerLogout = () => {
    localStorage.removeItem('userToken');
    dispatch(setUser(emptyUserState));
    window.location.reload();
  }

  return (
    <header className="w-full bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="//theme.hstatic.net/200000065946/1001264503/14/logo.png?v=815" alt="Nội Thất MOHO" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={stringSearch}
                onChange={(e) => setStringSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded" onClick={triggerSearch}>
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">
              3D HOUSE
            </button>

            <div className="flex items-center space-x-2">
              {
                userData.email ? (
                  <div className='flex items-center relative group'>
                    <span className='hover:text-orange-700'>{userData.email}</span>
                    <div className="">
                      <ChevronDown className="w-4 h-4 ml-1" />
                      <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'>
                        <Link to="/information" className='p-2 hover:text-orange-600 hover:cursor-pointer block'>Thông tin tài khoản</Link>
                        <Link to="/orders" className='p-2 hover:text-orange-600 hover:cursor-pointer block'>Đơn hàng</Link>
                        <div className='p-2 hover:text-orange-600 hover:cursor-pointer' onClick={triggerLogout}>Đăng xuất</div>
                      </div>
                    </div>
                  </div>
                ) : (<div className="text-sm">
                  <Link to="/auth" className="hover:text-orange-500">
                    Đăng nhập / Đăng ký
                  </Link>
                  <p className="text-gray-600">Tài khoản của tôi</p>
                </div>)
              }
            </div>
          </div>
          <div>
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;