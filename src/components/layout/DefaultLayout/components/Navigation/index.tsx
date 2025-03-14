import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import clientAPI from "../../../../../api/client-api/rest-client";
import ApiResponse from "../../../../../model/ApiResponse";
import CategoriesResponse from "../../../../../model/CategoriesResponse";
import { useEffect, useState } from "react";

function Navigation() {
  const [dataCategories, setDataCategories] = useState<CategoriesResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategory = async () => {
    try {
      const response: ApiResponse = await clientAPI
        .service("Categories/client")
        .find();
      response.result.map((category: CategoriesResponse) => {
        category.isShow = false;
      })
      setDataCategories(response.result);
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  };

  const triggerShow = (idCategory: string, isShow: boolean) => {
    const updatedCategories = dataCategories.map((category) => {
      if (category.id === idCategory) {
        return {
          ...category,
          isShow: isShow,
        };
      }
      return category; // Giữ nguyên các đối tượng khác
    });

    setDataCategories(updatedCategories); // Cập nhật state
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const menuItems = [
    {
      label: "Sản Phẩm",
      href: "/san-pham",
      hasDropdown: true,
      data: dataCategories,
    },
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
              {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
            </Link>

            {(
              //Parent
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {loading ? (
                  <div className="p-4 text-gray-500">Đang tải...</div>
                ) : (
                  <ul className="p-2 space-y-2">
                    {
                      item.data?.map((category) => (
                        <li key={category.id || category.name} className="relative">
                          <Link
                            to={category.name || "#"}
                            className="text-gray-700 hover:text-orange-500 flex items-center"
                            onMouseEnter={() => (triggerShow(category.id || "", true))}
                            onMouseLeave={() => (triggerShow(category.id || "", false))}
                          >
                            {category.name}
                          </Link>
                          {
                            //Children
                            category.children?.length > 0 && (
                              <div className={`absolute left-full top-0 ml w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 ${category.isShow ? 'visible opacity-100' : 'invisible'} transition-all duration-300 z-50`}
                                onMouseEnter={() => (triggerShow(category.id || "", true))}>
                                <ul className="p-2 space-y-2">
                                  {category.children.map((child) => (
                                    <li key={child.id || child.name}>
                                      <Link
                                        to={child.name || "#"}
                                        className="text-gray-700 hover:text-orange-500"
                                      >
                                        {child.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}

        {/* Static menu items */}
        <li>
          <Link to="/about-us" className="text-gray-700 hover:text-orange-500">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/showroom" className="text-gray-700 hover:text-orange-500">
            Showroom
          </Link>
        </li>
      </ul>
    </nav >
  );
}

export default Navigation;
