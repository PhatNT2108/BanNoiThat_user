import React, { memo, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PaginationDto from '../../model/PaginationDto';
import ProductCard from './components/ProductCard/ProductCard';
import PagingBar from '../../components/common/PagingBar';
import RadioButtonBox from '../../components/layout/components/RadioButtonBox';

interface PriceFilter {
  MinPrice: number;
  MaxPrice: number;
  stringDescription: string;
  isChecked?: boolean;
}

interface ColorFiler {
  Color: string;
  stringDescription: string;
  isChecked?: boolean;
  codeColor?: string;
}

var priceFilterSample: PriceFilter[] =
  [{ 'MinPrice': 0, 'MaxPrice': 200000, 'stringDescription': '0đ - 200.000đ', isChecked: false },
  { 'MinPrice': 200000, 'MaxPrice': 500000, 'stringDescription': '200.000đ - 500.000đ', isChecked: false },
  { 'MinPrice': 1000000, 'MaxPrice': 5000000, 'stringDescription': '1.000.000đ - 5.000.000đ', isChecked: false },
  { 'MinPrice': 5000000, 'MaxPrice': 10000000, 'stringDescription': '5.000.000đ - 10.000.000đ', isChecked: false },
  ];

var colorSample: ColorFiler[] =
  [{ 'Color': 'red', 'stringDescription': 'Đỏ', isChecked: false, codeColor: '#FF0000' },
  { 'Color': 'yellow', 'stringDescription': 'Vàng', isChecked: false, codeColor: '#FFFF00' },
  { 'Color': 'blue', 'stringDescription': 'Xanh', isChecked: false, codeColor: '#0000FF' },
  { 'Color': 'green', 'stringDescription': 'Xanh lá', isChecked: false, codeColor: '#008000' },
  { 'Color': 'black', 'stringDescription': 'Đen', isChecked: false, codeColor: '#000000' },
  { 'Color': 'white', 'stringDescription': 'Trắng', isChecked: false, codeColor: '#FFFFFF' },
  { 'Color': 'pink', 'stringDescription': 'Hồng', isChecked: false, codeColor: '#FFC0CB' },
  ];

const FilteredProductPage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const stringFilter = searchParams.get("stringSearch") || "";
  var finalString = stringFilter || slug;
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [filteredProducts, setFilteredProducts] = useState<ProductHome[]>([]);
  const [priceFilter, setPriceFilter] = useState<PriceFilter[]>(priceFilterSample);
  const [colorFiler, setColorFilter] = useState<ColorFiler[]>(colorSample);
  const [paginationDto, setPaginationDto] = useState<PaginationDto>();
  const [isLoading, setIsLoading] = useState(false);

  const loadFilteredProducts = async () => {
    try {
      setIsLoading(true);
      var countIndexPrice = 0;
      var queryPriceFilter = "";

      var countIndexColor = 0;
      var queryColorFilter = "";

      const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");

      if (!finalString) {
        finalString = "";
      }

      priceFilter?.forEach((price) => {
        if (price.isChecked === true) {
          queryPriceFilter += `&PriceRanges[${countIndexPrice}].minPrice=${price?.MinPrice}&PriceRanges[${countIndexPrice}].maxPrice=${price?.MaxPrice}`;
          countIndexPrice++;
        }
      });

      colorFiler?.forEach((color) => {
        if (color.isChecked === true) {
          queryColorFilter += `&Colors[${countIndexColor}]=${color?.Color}`;
          countIndexColor++;
        }
      });

      const result = await clientAPI.service('products/').findPagedList<ApiResponse>(
        `pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${finalString}` + queryPriceFilter + queryColorFilter
      );

      setPage(pageCurrent);
      setFilteredProducts(result.data.result);
      setPaginationDto(result.pagination);
    } catch (error) {
      console.error("Error loading filtered products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilteredProducts();
  }, [searchParams, stringFilter, slug]);

  console.log(colorFiler);

  return (
    <div className="mx-auto w-[80%] p-10 ">
      <div className="flex justify-between gap-3 text-3xl font-bold">
        <span>Bộ Lọc</span>
        <RadioButtonBox titleString="Giá sản phẩm"
          filters={priceFilter} setFilters={setPriceFilter} />
        <RadioButtonBox titleString="Màu sắc" renderHeader={(filter) => <p
          style={{ backgroundColor: filter?.codeColor }}
          className="p-3 rounded-full border-solid border-2"
        />}
          filters={colorFiler} setFilters={setColorFilter} />
        <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={loadFilteredProducts}>Lọc</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="text-center text-lg col-span-4">No products found</div>
        )}
      </div>
      <PagingBar totalRecords={paginationDto?.TotalRecords} pageSize={pageSize} />
    </div>
  );
};

export default memo(FilteredProductPage);