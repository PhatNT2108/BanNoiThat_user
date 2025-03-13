import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail, ProductItemResponse } from '../../model/ProductDetail';
import clientAPI from '../../api/client-api/rest-client';
import ApiResponse from '../../model/ApiResponse';
import User from '../../model/User';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface CartItemRequest {
    productItem_Id: string;
    quantity: number;
    isAddManual: boolean;
}

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataProduct, setDataProducts] = useState<ProductDetail>();
    const [currentItemSelected, setCurrentItemSelected] = useState<ProductItemResponse>();
    let additionalImages: string[] = [];
    const userData: User = useSelector(
        (state: RootState) => state.users
    );

    //Lấy dữ liệu giỏ hàng
    const LoadForm = async () => {
        try {
            setIsLoading(true);
            const data: ApiResponse = await clientAPI.service(`products/${slug}`).find();
            setDataProducts(() => data.result);
            if (data) {
                dataProduct?.productItems.map((item) => {
                    additionalImages.push(item.thumbnailUrl);
                    //Tùy trường hợp
                });
                setIsLoading(false);
                setCurrentItemSelected((prev) => data?.result.productItems[0]);
            }
        }
        catch (error) {
            console.error("Error during signup", error);
        }
    }

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
    }, []);

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Left Section: Product Images */}
                <div className="flex flex-col gap-4">
                    <img
                        className="w-full h-auto rounded-md border"
                        src={dataProduct?.thumbnailUrl}
                        alt="Product Thumbnail"
                    />
                    <div className="flex gap-2">
                        {additionalImages?.map((image, index) => (
                            <img
                                key={index}
                                className="w-20 h-20 object-cover rounded-md border cursor-pointer"
                                src={image}
                                alt={`Additional Image ${index}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section: Product Details */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{dataProduct?.name}</h1>

                    {/* Price */}
                    <div className="text-xl text-orange-500 font-semibold mb-4">
                        {currentItemSelected?.salePrice} VND
                        <span className="text-gray-500 line-through text-sm ml-2">
                            {currentItemSelected?.price} VND
                        </span>
                    </div>

                    {/* Options */}
                    <div className="flex items-center gap-4 mb-4">
                        {dataProduct?.productItems?.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => triggerSelectItem(item)}
                                className={`w-1/5 h-8 rounded-xs border flex items-center justify-center cursor-pointer ${currentItemSelected?.id === item.id ? 'bg-black text-white' : 'bg-gray-200'}`}
                            >{item.nameOption}</div>
                        ))}
                    </div>

                    {/* Product Details */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Chi tiết sản phẩm:</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {dataProduct?.description}
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
            <div>
                <div>Product Description</div>
                <div>Product Detail</div>
                <div>Product Review</div>
            </div>
        </div>
    );
};

export default ProductDetailPage;