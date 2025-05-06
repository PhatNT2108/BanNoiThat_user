import React, { memo, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PaginationDto from '../../model/PaginationDto';
import Loading from '../../components/common/Loading';
import ProductCard from './components/ProductCard/ProductCard';
import PagingBar from '../../components/common/PagingBar';

const FilteredProductPage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const stringFilter = searchParams.get("stringSearch") || "";
  var finalString = stringFilter || slug;
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [filteredProducts, setFilteredProducts] = useState<ProductHome[]>([]);
  const [paginationDto, setPaginationDto] = useState<PaginationDto>();
  const [isLoading, setIsLoading] = useState(false);

  const loadFilteredProducts = async () => {
    try {
      setIsLoading(true);

      const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");

      if (!finalString) {
        finalString = "";
      }

      const result = await clientAPI.service('products/').findPagedList<ApiResponse>(
        `pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${finalString}`
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

  return (
    <div className="p-10">
      <div className="flex gap-3 text-3xl font-bold">
        <span>Bộ Lọc</span>
        <select
          className="appearance-none bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="option1">Tùy chọn 1</option>
          <option value="option2">Tùy chọn 2</option>
        </select>
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