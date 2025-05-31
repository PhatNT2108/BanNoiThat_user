import React, { memo, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PaginationDto from '../../model/PaginationDto';
import ProductCard from './components/ProductCard/ProductCard';
import PagingBar from '../../components/common/PagingBar';
import RadioButtonBox from '../../components/layout/components/RadioButtonBox';
import ComboboxInput from '../../components/layout/components/ComboboxInput';

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

interface Fields {
  long: number;
  width: number;
  height: number;
}

var priceFilterSample: PriceFilter[] =
  [{ 'MinPrice': 0, 'MaxPrice': 200000, 'stringDescription': '0đ - 200.000đ', isChecked: false },
  { 'MinPrice': 200000, 'MaxPrice': 500000, 'stringDescription': '200.000đ - 500.000đ', isChecked: false },
  { 'MinPrice': 500000, 'MaxPrice': 1000000, 'stringDescription': '500.000đ - 1.000.000đ', isChecked: false },
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

var sizeSample: Fields = {
  long: 0,
  width: 0,
  height: 0
};

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
  const [sizeFilter, setSizeFilter] = useState<Fields>(sizeSample);
  const [paginationDto, setPaginationDto] = useState<PaginationDto>();
  const [isLoading, setIsLoading] = useState(false);

  const loadFilteredProducts = async () => {
    try {
      setIsLoading(true);
      var countIndexPrice = 0;
      var queryPriceFilter = "";

      var countIndexColor = 0;
      var queryColorFilter = "";

      var querySizeFilter = "";

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

      if (sizeFilter.long > 0) {
        querySizeFilter += `&size.longSize=${sizeFilter.long}`;
      }

      if (sizeFilter.width > 0) {
        querySizeFilter += `&size.widthSize=${sizeFilter.width}`;
      }

      if (sizeFilter.height > 0) {
        querySizeFilter += `&size.heightSize=${sizeFilter.height}`;
      }

      const result = await clientAPI.service('products/').findPagedList<ApiResponse>(
        `pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${finalString}` + queryPriceFilter + queryColorFilter + querySizeFilter
      );

      console.log(`pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${finalString}` + queryPriceFilter + queryColorFilter + querySizeFilter);

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

  return (
    <div className="mx-auto md:w-[80%] w-[100%]">
      <div className="flex sm:flex-row flex-col justify-between items-center flex-wrap  gap-2 text-3xl font-bold uppercase">

        <span className='flex justify-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          Bộ Lọc
        </span>

        <div className='flex lg:flex-row flex-col items-center gap-2'>
          <RadioButtonBox titleString="Giá sản phẩm"
            filters={priceFilter} setFilters={setPriceFilter} />
          <RadioButtonBox titleString="Màu sắc" renderHeader={(filter) => <p
            style={{ backgroundColor: filter?.codeColor }}
            className="p-3 rounded-full border-solid border-2"
          />}
            filters={colorFiler} setFilters={setColorFilter} />
          <ComboboxInput filters={sizeFilter} setFilters={setSizeFilter} />
        </div>

        <button className='bg-green-700 text-white px-4 py-2 rounded' onClick={loadFilteredProducts}>Lọc</button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
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