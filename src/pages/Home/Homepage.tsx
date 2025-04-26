import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PagingBar from '../../components/common/PagingBar';
import PaginationDto from '../../model/PaginationDto';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { getFromLocalStorage } from '../../utils/HandleInteracted';
import ProductCard from './components/ProductCard';
import './Home.css';
import SectionCategories from '../../components/layout/components/SectionCategory';

const Homepage: React.FC = () => {

    const [searchParams] = useSearchParams();
    var stringSearch = searchParams.get("stringSearch") ? searchParams.get("stringSearch") : '';

    const { slug } = useParams();
    const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");

    const [dataRecommendProducts, setRecommendDataProducts] = useState<ProductHome[]>([]);
    const [dataNewProducts, setNewDataProducts] = useState<ProductHome[]>([]);

    const [paginationDto, setPaginationDto] = useState<PaginationDto>() || "";
    const pageSize = 9;

    const [isLoading, setIsLoading] = useState(false);

    const LoadProductRecommend = async () => {
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

            const result = await clientAPI.service("products/recommend").findRecommend<ApiResponse>(`pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${stringSearch}`, formData);

            setRecommendDataProducts(result.data.result);
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    const LoadProductNew = async () => {
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

            const result = await clientAPI.service("products").findPagedList<ApiResponse>(`pageSize=${4}&pageCurrent=${1}`);

            setNewDataProducts(result.data.result);
            setPaginationDto(result.pagination);
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    useEffect(() => {
        LoadProductRecommend();
    }, [pageCurrent, searchParams, slug]);

    useEffect(() => {
        LoadProductNew();
    }, []);

    return isLoading ? (<Loading />) :
        (<div className="">
            {/*new product*/}
            <div className='p-10'>
                <div className="headline flex justify-between items-center p-4 text-3xl font-bold ">
                    <span> Sản phẩm mới </span>
                    <span className='hover:cursor-pointer text-sm text-green-300'> Xem thêm </span>
                </div>
                <div className="grid grid-cols-4 grid-rows-1">
                    {dataNewProducts.length > 0 ? dataNewProducts.map((product, index) => (
                        <div key={index} >
                            <ProductCard product={product} />
                        </div>
                    )) : <div className="text-center text-lg">Không có sản phẩm nào</div>}
                </div>
            </div>

            <SectionCategories />

            {/*recommend product*/}
            <div className='p-10'>
                <div className="headline flex justify-between items-center p-4 text-3xl font-bold ">
                    <span> Gợi ý cho bạn</span>
                    <span className='hover:cursor-pointer text-sm text-green-300'> Xem thêm </span>
                </div>
                <div className="grid grid-cols-4">
                    {dataRecommendProducts.length > 0 ? dataRecommendProducts.map((product, index) => (
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