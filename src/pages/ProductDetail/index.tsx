import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail, ProductItemResponse } from '../../model/ProductDetail';
import clientAPI from '../../api/client-api/rest-client';
import ApiResponse from '../../model/ApiResponse';
import User from '../../model/User';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { saveInteraction } from '../../utils/HandleInteracted';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataProduct, setDataProducts] = useState<ProductDetail>();
    const [currentItemSelected, setCurrentItemSelected] = useState<ProductItemResponse>();
    const userData: User = useSelector(
        (state: RootState) => state.users
    );

    const [additionalImages, setAdditionalImages] = useState<string[]>([]);

    // Lấy chi tiết sản phẩm
    const LoadForm = async () => {
        try {
            setIsLoading(true);
            const data: ApiResponse = await clientAPI.service(`products/${slug}`).find();
            setDataProducts(() => data.result);
            if (data) {

                saveInteraction("view", data.result.id);

                const images = data.result.productItems.map((item: ProductItemResponse) => item.imageUrl);
                setAdditionalImages(images);
                setIsLoading(false);
                setCurrentItemSelected((prev) => data.result.productItems[0]);
            }
        } catch (error) {
            console.error("Error during signup", error);
        }
    };

    //Upsert với giỏ hàng
    const AddProductToCart = async (cartItem: FormData) => {
        try {
            const data: ApiResponse = await clientAPI.service(`carts?email=${userData.email}`).create(cartItem);
            console.log(data);
            window.location.reload();
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

    const triggerSelectItem = (item: ProductItemResponse) => {
        setCurrentItemSelected(() => item);
    }

    const triggerAddItemManual = () => {
        if (currentItemSelected?.id) {
            const data = new FormData();
            data.append("productItem_Id", currentItemSelected?.id);
            data.append("quantity", "1");
            data.append("isAddManual", "true");
            AddProductToCart(data);
        }
    }

    useEffect(() => {
        LoadForm();
        console.log("load")
    }, []);

    return (
        <div>
            <div className="flex flex-row w-2/3 gap-4 p-4 mx-auto">
                {/* Left Section: Product Images */}
                <div className="flex flex-col gap-2">
                    <img
                        className="w-[400px] h-[400px] overflow-hidden object-fit rounded-md border"
                        src={currentItemSelected?.imageUrl || "https://placehold.co/600x400"}
                        alt="Product Thumbnail"
                    />
                    <div className="flex flex-row gap-2">
                        {additionalImages?.map((image, index) => (
                            <img
                                key={index}
                                className="w-10 h-10 object-cover rounded-md border"
                                src={image || "https://placehold.co/600x400"}
                                alt={`Additional Image ${index}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section: Product Details */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{currentItemSelected?.nameOption}</h1>

                    {/* Sku */}
                    <div className="text-sm text-gray-500 font-semibold mb-4">
                        SKU: {currentItemSelected?.sku}
                    </div>

                    {/* Price */}
                    <div className="text-xl text-orange-500 font-semibold mb-4">
                        {currentItemSelected?.salePrice} VND
                        <span className="text-gray-500 line-through text-sm ml-2">
                            {currentItemSelected?.price} VND
                        </span>
                    </div>

                    {/* Options */}
                    <div className="flex items-center gap-4 mb-4">
                        {dataProduct?.productItems?.map((item, index) => {
                            return item.quantity > 0 && (<div
                                key={index}
                                onClick={() => triggerSelectItem(item)}
                                className={`w-1/5 h-8 rounded-xs border flex items-center justify-center cursor-pointer ${currentItemSelected?.id === item.id ? 'bg-black text-white' : 'bg-gray-200'}`}
                            >{item.nameOption}</div>
                            )
                        })}
                    </div>

                    {/* Product Details */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Chi tiết sản phẩm:</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {dataProduct?.description}
                        </ul>
                    </div>

                    {/* Product Details */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Thương thiệu: </h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {dataProduct?.brand.brandName}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4">
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={triggerAddItemManual}>
                            Thêm vào giỏ hàng
                        </button>
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>

            {/*Description*/}
            <div className='w-1/2 mx-auto'>
                <div>Product Description</div>
                <div>Product Detail</div>
                <div>Product Review</div>
            </div>
        </div>
    );
};

export default ProductDetailPage;