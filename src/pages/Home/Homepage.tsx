import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Sidebar from './Slidebar';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PagingBar from '../../components/common/PagingBar';
import PaginationDto from '../../model/PaginationDto';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';

const Homepage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");
    const stringSearch = searchParams.get("stringSearch") ? searchParams.get("stringSearch") : '';

    const [dataProducts, setDataProducts] = useState<ProductHome[]>([]);
    const [paginationDto, setPaginationDto] = useState<PaginationDto>() || "";
    const pageSize = 9;

    const [isLoading, setIsLoading] = useState(false);

    const LoadForm = async () => {
        try {
            setIsLoading(true);
            const result = await clientAPI.service("products").findPagedList<ApiResponse>(`pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${stringSearch}`);
            setDataProducts(() => result.data.result);
            setPaginationDto(() => result.pagination);
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    useEffect(() => {
        LoadForm();
    }, [pageCurrent, stringSearch]);

    const navigateProductDetail = (slug: string) => {
        navigate(`/products/${slug}`);
    }

    return isLoading ? (<Loading />) :
        (<div className="homepage">
            <Sidebar />
            <div className="grid grid-cols-4">
                {dataProducts.map((product, index) => (
                    //Card product
                    <div key={index} className="border w-1/8 rounded-lg p-4 m-4 shadow-md hover:cursor-pointer hover:opacity-75 " onClick={() => navigateProductDetail(product.slug)}>
                        <div className="relative w-full h-48 mb-4">
                            <img
                                src={product.thumbnailUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out hover:opacity-0"
                            />
                            <img
                                src={product.thumbnailUrl}
                                alt={product.name}
                                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <div className="flex flex-row items-center gap-2 text-gray-700 mb-2">
                            <div className='text-lg'> {product.salePrice}</div> VNĐ
                            <div className='text-xs text-red-500'>{((1 - product.salePrice / product.price) * 100).toFixed(2)} %</div>
                        </div>
                    </div>
                ))}
            </div>
            <PagingBar totalRecords={paginationDto?.TotalRecords} pageSize={pageSize} />
        </div>);
};

export default Homepage;