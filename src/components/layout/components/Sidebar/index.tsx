import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div
      className="fixed top-0 left-0 z-40 h-screen w-1/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64"
    >
      <div className="p-4">
        <h2 className="text-lg font-bold">Thông tin cá nhân</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/information" className="block p-2 text-gray-700 rounded hover:bg-gray-200">
              Thông tin tài khoản
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block p-2 text-gray-700 rounded hover:bg-gray-200">
              Đơn hàng
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
