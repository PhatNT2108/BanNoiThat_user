import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import clientAPI from "../../../../api/client-api/rest-client";
import ApiResponse from "../../../../model/ApiResponse";
import CategoriesResponse from "../../../../model/CategoriesResponse";
import { memo, useEffect, useState } from "react";
import NavItem from "./components/CategoriesNav";
import BrandsResponse from "../../../../model/BrandsResponse";

export interface SaleProgram {
  id: string;
  name: string;
  slug: string;
  children: any[] | null;
  isShow: boolean;
}

function Navigation() {
  const [dataCategories, setDataCategories] = useState<CategoriesResponse[]>([]);
  const [dataBrands, setDataBrands] = useState<BrandsResponse[]>([]);
  const [salePrograms, setSalePrograms] = useState<SaleProgram[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategory = async () => {
    try {
      const response: ApiResponse = await clientAPI
        .service("Categories/client")
        .find();
      response?.result?.map((category: CategoriesResponse) => {
        category.isShow = false;
      })
      setDataCategories(response.result);
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async () => {
    try {
      const response: ApiResponse = await clientAPI
        .service("brands")
        .find();
      response?.result?.map((brand: BrandsResponse) => {
        brand.isShow = false;
      })
      setDataBrands(response.result);
    } catch (error) {
      console.error("Failed to load brands", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSalePrograms = async () => {
    try {
      const response: ApiResponse = await clientAPI
        .service("saleprogram/homepage")
        .find();
      response?.result?.map((saleProgram: SaleProgram) => {
        saleProgram.isShow = false;
      })
      console.log(response.result);
      setSalePrograms(response.result);
    } catch (error) {
      console.error("Failed to load brands", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory();
    loadBrands();
    loadSalePrograms();
  }, []);

  const menuItems = [
    {
      label: "Danh mục",
      href: "/categories",
      hasDropdown: true,
      data: dataCategories,
    },
    {
      label: "Thương hiệu",
      href: "/brands",
      hasDropdown: true,
      data: dataCategories,
    },
    {
      label: "Khuyến mãi %",
      href: "/saleprograms",
      hasDropdown: true,
      data: dataCategories,
    }
  ];

  return (
    <nav className="flex flex-row justify-center py-4 px-4 shadow-sm font-bold">
      {/*Dynamic*/}
      <ul className="flex space-x-8">
        {menuItems.map((item) => (
          <li key={item.label} className="relative group background">
            <div
              className="text-[#d7f0db] hover:text-[#87d194] flex items-center"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
            </div>
            {(
              //Parent
              <div className="absolute left-0 mt-2 w-max bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 font-bold">
                {loading ? (
                  <div className="p-4 text-gray-500">Đang tải...</div>
                ) : (
                  <ul className="p-2 space-y-2">
                    {item.href === "/categories" && (<NavItem items={dataCategories} setState={setDataCategories} />)}
                    {item.href === "/brands" && (<NavItem items={dataBrands} setState={setDataBrands} />)}
                    {item.href === "/saleprograms" && (<NavItem items={salePrograms} setState={setSalePrograms} />)}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}

        <li>
          <Link to="/about-us" className="text-[#d7f0db] hover:text-[#d7f0db]">
            About Us
          </Link>
        </li>
      </ul>
    </nav >
  );
}

export default memo(Navigation);
