import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail, ProductItemResponse } from '../../model/ProductDetail';
import clientAPI from '../../api/client-api/rest-client';
import ApiResponse from '../../model/ApiResponse';
import User from '../../model/User';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getFromLocalStorage, saveInteraction } from '../../utils/HandleInteracted';
import Tabs from './Components/Tabs';
import ProductHome from '../../model/ProductHome';
import ProductCard from '../Home/components/ProductCard/ProductCard';
import QuantitySelector from '../../components/layout/components/QuantityPlusMinus/QuantityPlusMinus';
import { toast } from "react-toastify";

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataProduct, setDataProducts] = useState<ProductDetail>();
    const [currentItemSelected, setCurrentItemSelected] = useState<ProductItemResponse>();
    const [currentImageSelected, setCurrentImageSelected] = useState<string>();
    const [quantity, setQuantity] = useState(1);
    const userData: User = useSelector(
        (state: RootState) => state.users
    );

    const [additionalImages, setAdditionalImages] = useState<string[]>([]);
    const [dataRecommendProducts, setRecommendDataProducts] = useState<ProductHome[]>([]);

    // Lấy chi tiết sản phẩm
    const LoadDetailProduct = async () => {
        try {
            setIsLoading(true);
            const data: ApiResponse = await clientAPI.service(`products/${slug}`).find();
            setDataProducts(() => data.result);
            if (data) {
                saveInteraction("view", data.result.id);

                const images = data.result.productItems.map((item: ProductItemResponse) => item.imageUrl);
                setAdditionalImages(images);
                setIsLoading(false);
                for (const productItem of data.result.productItems) {
                    if (productItem.quantity > 0) {
                        setCurrentItemSelected(productItem);
                        break;
                    }
                }
            }
        } catch (error) {
            console.error("Error during signup", error);
        }
    };

    const LoadProductRecommend = async () => {
        try {
            setIsLoading(true);
            let userInteractions = getFromLocalStorage("userInteractions") || {};
            let interactedProductIds = userInteractions["view"] || [];

            let formData = new FormData();
            interactedProductIds.forEach((productId: string, index: number) => {
                formData.append(`InteractedProductIds[0]`, dataProduct?.id || "");
            });

            const result = await clientAPI.service("products/recommend").findRecommend<ApiResponse>(`pageSize=${4}&pageCurrent=${1}`, formData);

            setRecommendDataProducts(result.data.result);
            setIsLoading(false);
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    useEffect(() => {
        LoadDetailProduct(); // Đợi LoadDetailProduct hoàn thành
    }, [slug]);

    useEffect(() => {
        LoadProductRecommend(); // Sau đó mới gọi LoadProductRecommend
    }, [dataProduct]);

    //Upsert với giỏ hàng
    const AddProductToCart = async (cartItem: FormData) => {
        try {
            const data: ApiResponse = await clientAPI.service(`carts?email=${userData.email}`).create(cartItem);
            toast.success("Đã thêm vào giỏ hàng!");

            window.location.reload();
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    const triggerSelectItem = (item: ProductItemResponse) => {
        setCurrentItemSelected(() => item);
        setCurrentImageSelected(() => item.imageUrl);
    }

    const triggerAddItemManual = () => {
        if (currentItemSelected?.id) {
            const data = new FormData();
            data.append("productItem_Id", currentItemSelected?.id);
            data.append("quantity", quantity.toString());
            data.append("isAddManual", "true");
            AddProductToCart(data);
        }
        setQuantity(1);
    }

    const triggerSelectCurrentImage = (image: string) => {
        setCurrentImageSelected(() => image);
    }

    const trigger3D = () => {
        let url = 'http://localhost:5173/?productItemId=' + currentItemSelected?.id
        window.location.href = url;
    }

    return (isLoading ? <div> Loading...</div > :
        <div>
            <div className="relative flex flex-row w-2/3 gap-4 p-4 mx-auto">
                <div className="flex flex-col gap-2 z-50">
                    {additionalImages?.map((image, index) => (
                        <img
                            key={index}
                            onClick={() => triggerSelectCurrentImage(image)}
                            className="w-20 h-20 object-cover rounded-md border hover:cursor-pointer hover:border-gray-500"
                            src={image || "https://placehold.co/600x400"}
                            alt={`Additional Image ${index}`}
                        />
                    ))}
                </div>

                {/* Left Section: Product Images */}
                <div className="relative flex flex-col gap-2 z-10">
                    <div className="relative">
                        <img
                            className="w-[400px] h-[400px]  overflow-hidden object-fit rounded-md border"
                            src={currentImageSelected || "https://placehold.co/600x400"}
                            alt="Product Thumbnail"
                        />
                        {
                            currentItemSelected === undefined && <div className="absolute flex w-1/2 h-1/2 justify-center items-center rounded-full inset-0 m-auto text-lg text-white bg-gray-700 opacity-45 ">Hết hàng</div>
                        }
                    </div>
                </div>

                {/* Right Section: Product Details */}
                <div className="flex-1">

                    <h1 className="text-2xl font-bold mb-2">{dataProduct?.name}</h1>

                    {/* Sku */}
                    <div className="text-sm text-gray-500 font-semibold mb-4">
                        SKU: {currentItemSelected?.sku}
                    </div>

                    {/* Price */}
                    <div className="text-xl text-green-700 font-semibold mb-4">
                        {currentItemSelected?.salePrice.toLocaleString()} &#8363;
                        <span className="text-gray-500 line-through text-sm ml-2">
                            {currentItemSelected?.price.toLocaleString()} &#8363;
                        </span>
                    </div>

                    {/* Options */}
                    <h2 className="text-lg font-bold ">Phân loại:</h2>
                    <div className="flex items-center gap-4 mb-4 p-3">
                        {dataProduct?.productItems?.map((item, index) => {
                            return item.quantity > 0 ? (<div
                                key={index}
                                onClick={() => triggerSelectItem(item)}
                                className={`p-2 border flex items-center justify-center cursor-pointer ${currentItemSelected?.id === item.id ? 'bg-black text-white rounded-md' : 'border-green-700 rounded-md'}`}
                            >{item.nameOption}</div>
                            ) : (
                                <div
                                    key={index}
                                    className={`p-2 border flex items-center justify-center cursor-pointer bg-gray-300 rounded-md`}
                                >{item.nameOption}</div>
                            )
                        })}
                    </div>

                    {/* Product Details */}
                    <div className="flex items-center mb-2 ">
                        <h2 className="text-lg font-bold ">Thông tin chung:&nbsp;</h2>
                        <ul className="text-gray-700">
                            {dataProduct?.description}
                        </ul>
                    </div>

                    {/* Product Details */}
                    <div className="flex items-center mb-4">
                        <h2 className="text-lg font-bold">Thương thiệu:&nbsp;</h2>
                        <ul className=" text-gray-700">
                            {dataProduct?.brand?.name}
                        </ul>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center mb-4">
                        <h2 className="text-lg font-bold">Số lượng:&nbsp;</h2>
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                    </div>

                    {/* Buttons */}
                    {
                        currentItemSelected !== undefined && (
                            <div className="flex flex-row items-center rounded-3xl gap-4">
                                <button className="font-semibold font-sans rounded-3xl bg-[#da684c] uppercase text-white py-2 px-4 hover:bg-[#f89075]">
                                    Mua ngay
                                </button>
                                <button className="font-sans uppercase border rounded-3xl border-gray-950 py-2 px-4 hover:bg-gray-400" onClick={triggerAddItemManual}>
                                    Thêm vào giỏ hàng
                                </button>
                                {
                                    currentItemSelected.modelUrl && (<button className="w-max px-3 py-1 h-full font-semibold rounded-sm bg-gray-300 flex justify-center items-center hover:bg-gray-100 hover:cursor-pointer" onClick={trigger3D}>
                                        3D
                                    </button>)
                                }

                            </div>
                        )}
                </div>
            </div>

            {/*Tabs*/}
            <div className='w-1/2 mx-auto'>
                <Tabs description={dataProduct?.description || ""} product_id={dataProduct?.id || null} />
            </div>

            {/*Gợi ý sản phẩm*/}
            <div className='p-10'>
                <div className="flex justify-between px-4 text-3xl font-bold ">
                    <span> Sản phẩm liên quan </span>
                    <span className='text-blue-500 text-sm'> Xem thêm </span>
                </div>
                <div className="grid grid-cols-4">
                    {dataRecommendProducts.length > 0 ? dataRecommendProducts.map((product, index) => (
                        <div key={index} >
                            <ProductCard product={product} />
                        </div>
                    )) : <div className="text-center text-lg">Không có sản phẩm nào</div>}
                </div>
            </div>
        </div >)
};

export default ProductDetailPage;