import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PaginationDto from '../../model/PaginationDto';
import Loading from '../../components/common/Loading';
import ProductCard from './components/ProductCard';
import PagingBar from '../../components/common/PagingBar';

const FilteredProductPage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const stringFilter = searchParams.get("stringSearch") || "";
  var finalString = stringFilter || slug;
  console.log(slug);
  const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");
  const pageSize = 9;

  const [filteredProducts, setFilteredProducts] = useState<ProductHome[]>([]);
  const [paginationDto, setPaginationDto] = useState<PaginationDto>();
  const [isLoading, setIsLoading] = useState(false);

  const loadFilteredProducts = async () => {
    try {
      setIsLoading(true);
      // Adjust the endpoint as needed; here we use "products/filtered" for filtering
      const result = await clientAPI.service('products/').findPagedList<ApiResponse>(
        `pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${finalString}`
      );

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
  }, [pageCurrent, stringFilter, slug]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="p-10">
      <div className="flex justify-between px-4 text-3xl font-bold">
        <span>Filtered Products</span>
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

export default FilteredProductPage;