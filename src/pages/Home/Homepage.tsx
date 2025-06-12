import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import clientAPI from '../../api/client-api/rest-client';
import ProductHome from '../../model/ProductHome';
import ApiResponse from '../../model/ApiResponse';
import PagingBar from '../../components/common/PagingBar';
import PaginationDto from '../../model/PaginationDto';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/HandleInteracted';
import ProductCard from './components/ProductCard/ProductCard';
import SectionCategories from './components/SectionCategory';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import './Home.css';

const Homepage: React.FC = () => {
    const [searchParams] = useSearchParams();
    var stringSearch = searchParams.get("stringSearch") ? searchParams.get("stringSearch") : '';

    const { slug } = useParams();
    const pageCurrent = parseInt(searchParams.get("pageCurrent") || "1");

    const [dataRecommendProducts, setRecommendDataProducts] = useState<ProductHome[]>([]);
    const [dataNewProducts, setNewDataProducts] = useState<ProductHome[]>([]);

    const [paginationDto, setPaginationDto] = useState<PaginationDto>() || "";
    const pageSize = 12;

    const [isLoading, setIsLoading] = useState(false);

    const LoadProductRecommend = async () => {
        try {
            setIsLoading(true);
            if (slug) {
                stringSearch = slug;
            }
            let userInteractions = getFromLocalStorage("userInteractions") || {};
            let interactedProductIds = (userInteractions["view"] || []).slice(0, 30);
            let formData = new FormData();
            interactedProductIds.forEach((productId: string, index: number) => {
                formData.append(`InteractedProductIds[${index}]`, productId);
            });

            const result = await clientAPI.service("products/recommend").findRecommend<ApiResponse>(`pageSize=${pageSize}&pageCurrent=${pageCurrent}&stringSearch=${stringSearch}`, formData);

            setRecommendDataProducts(result.data.result);
            setIsLoading(false);
        }
        catch (error) {
            console.log("Error during signup", error);
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

            const result = await clientAPI.service("products").findPagedList<ApiResponse>(`pageSize=${10}&pageCurrent=${1}`);

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

    const navigateToFilterPage = () => {
        window.location.href = `/collections`;
    }

    return (
        <div className="">
            {/*new product*/}
            <div className='relative md:w-[80%] w-full md:p-10 p-2 mx-auto'>
                <div className="flex justify-between items-center p-4 md:text-3xl text-xl font-bold ">
                    <span> Sản phẩm mới </span>
                    <span className='hover:cursor-pointer text-lg text-black' onClick={() => navigateToFilterPage()}> Xem thêm </span>
                </div>
                <Swiper
                    spaceBetween={16} // Khoảng cách giữa các slide
                    slidesPerView={4} // Số lượng card hiển thị
                    loop={false} // Lặp lại slider
                    pagination={{ clickable: true }} // Pagination (chấm tròn bên dưới)
                    autoplay={{ delay: 3000 }} // Tự động lướt
                    modules={[Navigation]} // Sử dụng module Navigation
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2, // Hiển thị 2 sản phẩm
                        },
                        768: {
                            slidesPerView: 2, // Hiển thị 4 sản phẩm
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        }
                    }}
                >
                    {dataNewProducts?.length > 0 ? (
                        dataNewProducts.map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="text-center text-lg">Không có sản phẩm nào</div>
                    )}
                </Swiper>
            </div>

            <SectionCategories />

            {/*recommend product*/}
            <div className='md:w-[80%] w-full md:p-10 p-2 mx-auto'>
                <div className="flex justify-between items-center p-4 text-3xl font-bold ">
                    <span> Gợi ý cho bạn</span>
                </div>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-2">
                    {dataRecommendProducts?.length > 0 ? dataRecommendProducts?.map((product, index) => (
                        <div key={index} >
                            <ProductCard product={product} />
                        </div>
                    )) : <div className="text-center text-lg mx-auto">Không có sản phẩm nào</div>}
                </div>
            </div>
            <PagingBar totalRecords={paginationDto?.TotalRecords} pageSize={pageSize} />
        </div >);
};

export default Homepage;