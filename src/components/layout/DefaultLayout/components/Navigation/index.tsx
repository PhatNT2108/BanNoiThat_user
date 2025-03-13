/* spell-checker: disable */
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

function Navigation() {

  const menuItems = [
    { label: 'Sản Phẩm', href: '/san-pham', hasDropdown: true },
  ];

  return (
    <nav className="flex flex-row justify-center py-4 shadow-sm">
      <ul className="flex space-x-8">
        {menuItems.map((item) => (
          <li key={item.label} className="relative group">
            <Link
              to={item.href}
              className="text-gray-700 hover:text-orange-500 flex items-center"
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </Link>
            {item.hasDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                  <ul className="space-y-2">
                    <li><Link to="#" className="text-gray-700 hover:text-orange-500">Sub Item 1</Link></li>
                    <li><Link to="#" className="text-gray-700 hover:text-orange-500">Sub Item 2</Link></li>
                    <li><Link to="#" className="text-gray-700 hover:text-orange-500">Sub Item 3</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
        <li>About Us</li>
        <li>Showroom</li>
      </ul>
    </nav >);
}

export default Navigation;