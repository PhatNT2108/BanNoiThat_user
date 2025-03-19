import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SliderBar from './Slidebar';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PagingBar from '../../components/common/PagingBar';
import PaginationDto from '../../model/PaginationDto';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { getFromLocalStorage } from '../../utils/HandleInteracted';
import ProductCard from './components/ProductCard';

const Homepage: React.FC = () => {

    const [searchParams] = useSearchParams();
    var stringSearch = searchParams.get("stringSearch") ? searchParams.get("stringSearch") : '';

    const { slug } = useParams();
    const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");

    const [dataProducts, setDataProducts] = useState<ProductHome[]>([]);
    const [newProducts, setNewDataProducts] = useState<ProductHome[]>([]);

    const [paginationDto, setPaginationDto] = useState<PaginationDto>() || "";
    const pageSize = 9;

    const [isLoading, setIsLoading] = useState(false);

    const LoadForm = async () => {
        try {
            setIsLoading(true);
            if (slug) {
                stringSearch = slug;
            }
            let userInteractions = getFromLocalStorage("userInteractions") || {};
            let interactedProductIds = userInteractions["view"] || [];

            let formData = new FormData();
            interactedProductIds.forEach((productId: string, index: number) => {
                formData.append(`InteractedProductIds[${index}]`, productId);
            });

            const result = await clientAPI.service("products").findPagedList<ApiResponse>(`pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${stringSearch}`);
            // const result = await clientAPI.service("products/recommend").findRecommend<ApiResponse>(`pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${stringSearch}`, formData);

            setDataProducts(result.data.result);
            setPaginationDto(result.pagination);
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    useEffect(() => {
        LoadForm();
    }, [pageCurrent, searchParams, slug]);

    return isLoading ? (<Loading />) :
        (<div className="">
            <SliderBar />
            <div className='p-10'>
                <div className='text-3xl font-bold px-2'>
                    Sản phẩm mới
                </div>
                <div className="grid grid-cols-4 grid-rows-1">
                    {newProducts.length > 0 ? newProducts.map((product, index) => (
                        <div key={index} >
                            <ProductCard product={product} />
                        </div>
                    )) : <div className="text-center text-lg">Không có sản phẩm nào</div>}
                </div>
            </div>
            <div className='p-10'>
                <div className='text-3xl font-bold px-2'>
                    Gợi ý cho bạn
                </div>
                <div className="grid grid-cols-4">
                    {dataProducts.length > 0 ? dataProducts.map((product, index) => (
                        <div key={index} >
                            <ProductCard product={product} />
                        </div>
                    )) : <div className="text-center text-lg">Không có sản phẩm nào</div>}
                </div>
            </div>
            <PagingBar totalRecords={paginationDto?.TotalRecords} pageSize={pageSize} />
        </div>);
};

export default Homepage;