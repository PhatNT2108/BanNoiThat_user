import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetail, ProductItemResponse } from "../../model/ProductDetail";
import clientAPI from "../../api/client-api/rest-client";
import ApiResponse from "../../model/ApiResponse";
import User from "../../model/User";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Tabs from "./Components/Tabs";
import ProductHome from "../../model/ProductHome";
import ProductCard from "../Home/components/ProductCard/ProductCard";
import QuantitySelector from "../../components/layout/components/QuantityPlusMinus/QuantityPlusMinus";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  addProductToLocalStorage,
  getRecentProducts
} from "../../utils/HandleInteracted";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProducts] = useState<ProductDetail>();
  const [currentItemSelected, setCurrentItemSelected] =
    useState<ProductItemResponse>();
  const [currentImageSelected, setCurrentImageSelected] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); // Sử dụng trực tiếp
  const userData: User = useSelector((state: RootState) => state.users);

  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [dataRecommendProducts, setRecommendDataProducts] = useState<
    ProductHome[]
  >([]);
  const [dataSameProductRecommend, setDataSameProductRecommend] = useState<
    ProductHome[]
  >([]);

  // Lấy chi tiết sản phẩm
  const LoadDetailProduct = async () => {
    try {
      setIsLoading(true);
      const data: ApiResponse = await clientAPI
        .service(`products/${slug}`)
        .find();
      setDataProducts(() => data.result);
      if (data) {
        addProductToLocalStorage(data?.result.id);

        const images = data.result.productItems.map(
          (item: ProductItemResponse) => item.imageUrl
        );
        setAdditionalImages(images);
        setCurrentImageSelected(images[0]);
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
      const interactedProductIds = getRecentProducts();
      if (!interactedProductIds.length) {
        console.warn("No interacted products found");
        setIsLoading(false);
        return;
      }
      let formData = new FormData();
      interactedProductIds.forEach((productId, index) => {
        formData.append(`InteractedProductIds[${index}]`, productId);
      });


      const result = await clientAPI
        .service("products/recommend")
        .findRecommend<ApiResponse>(`pageSize=${4}&pageCurrent=${1}`, formData);

      setRecommendDataProducts(result.data.result);
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  const LoadSameProductRecommend = async () => {
    try {
      let formData = new FormData();
      formData.append(`IsSpecial`, "true");
      formData.append(`InteractedProductIds[0]`, dataProduct?.id || "");

      const result = await clientAPI
        .service("products/recommend")
        .findRecommend<ApiResponse>(`pageSize=${4}&pageCurrent=${1}`, formData);

      setDataSameProductRecommend(result.data.result);
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  useEffect(() => {
    LoadDetailProduct(); // Đợi LoadDetailProduct hoàn thành
  }, [slug]);

  useEffect(() => {
    if (dataProduct?.id) {
      LoadProductRecommend(); // Sau đó mới gọi LoadProductRecommend
      LoadSameProductRecommend();
    }
  }, [dataProduct]);

  //Upsert với giỏ hàng
  const AddProductToCart = async (cartItem: FormData) => {
    try {
      const data: ApiResponse = await clientAPI
        .service(`carts?email=${userData.email}`)
        .create(cartItem);
      toast.success("Đã thêm vào giỏ hàng!");


    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessages?.[0] ?? "Đã xảy ra lỗi";
      console.error(errorMessage);
    }
  };

  const triggerSelectItem = (item: ProductItemResponse) => {
    setCurrentItemSelected(() => item);
    setCurrentImageSelected(() => item.imageUrl);
  };

  const triggerAddItemManual = () => {
    if (currentItemSelected?.id) {
      const data = new FormData();
      data.append("productItem_Id", currentItemSelected?.id);
      data.append("quantity", quantity.toString());
      data.append("isAddManual", "true");
      AddProductToCart(data);
    }
    setQuantity(1);
  };

  const triggerSelectCurrentImage = (image: string) => {
    setCurrentImageSelected(() => image);
  };

  const trigger3D = () => {
    let url = `${process.env.REACT_APP_MODEL3D}?productItemId=` + currentItemSelected?.id;
    window.location.href = url;
  };

  const triggerBuyNow = () => {
    if (!currentItemSelected) return; // phòng trường hợp chưa chọn sản phẩm

    const params = new URLSearchParams({
      id: currentItemSelected.id,
      quantity: quantity.toString(),
      name: dataProduct?.name || "",
      nameOption: currentItemSelected.nameOption || "",
      imageUrl: currentItemSelected.imageUrl || "",
      price: currentItemSelected.price?.toString() || "0",
      salePrice: currentItemSelected.salePrice?.toString() || "0",
      soldQuantity: currentItemSelected.soldQuantity?.toString() || "0",
    });

    navigate(`/checkout?${params.toString()}`);
  };
  return isLoading ? (
    <div> Loading...</div>
  ) : (
    <div className="w-full">
      <div className="relative flex sm:flex-row flex-col lg:w-3/4 w-full gap-2 p-4 mx-auto">

        <div className="flex sm:flex-row flex-col-reverse mx-auto gap-2">
          {/* Additional Images Section */}
          <div className="flex sm:flex-col flex-row gap-2 z-50 w-max max-h-[25em] overflow-y-auto">
            {additionalImages?.length > 0 ? (
              additionalImages.map((image, index) => (
                <img
                  key={index}
                  onClick={() => triggerSelectCurrentImage(image)}
                  className="w-20 h-20 object-cover rounded-md border hover:cursor-pointer hover:border-gray-500"
                  src={image || "https://placehold.co/600x400"}
                  alt={`Additional Image ${index}`}
                />
              ))
            ) : (
              <span className="text-gray-500">No additional images available</span>
            )}
          </div>

          {/* Main Image Section */}
          <div className="relative flex flex-col gap-2 z-10">
            <div className="relative">
              <img
                className="w-[400px] h-[400px] object-contain rounded-md border"
                src={currentImageSelected || "https://placehold.co/600x400"}
                alt="Product Thumbnail"
              />
              {currentItemSelected === undefined && (
                <div className="absolute flex w-1/2 h-1/2 justify-center items-center rounded-full inset-0 m-auto text-lg text-white bg-gray-700 opacity-50">
                  Hết hàng
                </div>
              )}
              {currentItemSelected?.saleProgram?.name && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold uppercase px-2 py-1 rounded shadow">
                  {currentItemSelected.saleProgram.name}
                </span>
              )}
            </div>
          </div>
        </div>


        {/* Product Details */}
        <div className="flex-1 sm:max-w-[50%] max-w-[90%]">
          <h1 className="text-2xl font-bold mb-2">{dataProduct?.name}</h1>

          {/* Thông tin phụ */}
          <div className="flex gap-5">
            <div className="text-sm text-gray-500 font-semibold mb-4">
              SKU: {currentItemSelected?.sku}
            </div>
            <div className="text-sm text-gray-500 font-semibold mb-4">
              Đã bán: <span className="font-bold text-black">{currentItemSelected?.soldQuantity}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-100 text-xl w-max p-2 text-red-700 font-semibold mb-4 flex gap-2 items-center">
            {currentItemSelected?.salePrice.toLocaleString()} &#8363;
            {currentItemSelected?.saleProgram?.name && (
              <span className=" text-white text-xs font-semibold uppercase">
                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/a67394e0bf3ee5f4d181.svg"></img>
              </span>
            )}
            <span className="text-gray-500 line-through text-sm ml-2">
              {currentItemSelected?.price.toLocaleString()} &#8363;
            </span>
          </div>

          {/* Options */}
          <h2 className="text-lg font-bold ">Phân loại:</h2>
          <div className="flex flex-wrap items-center gap-4 mb-4 p-3 max-w">
            {dataProduct?.productItems?.map((item, index) => {
              return item.quantity > 0 ? (
                <div
                  key={index}
                  onClick={() => triggerSelectItem(item)}
                  className={`p-2 text-sm w-max border flex items-center  justify-center cursor-pointer ${currentItemSelected?.id === item.id
                    ? "bg-black text-white rounded-md"
                    : "border-green-700 rounded-md"
                    }`}
                >
                  {item.nameOption}
                  {item.modelUrl && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  )}
                </div>
              ) : (
                <div
                  key={index}
                  className={`p-2 border w-max flex items-center justify-center bg-gray-300 rounded-md`}
                >
                  {item.nameOption}
                </div>
              );
            })}
          </div>

          {/* Thương hiệu*/}
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold">Thương thiệu:&nbsp;</h2>
            <ul className=" text-gray-700">{dataProduct?.brand?.name}</ul>
          </div>

          {/* Kích thước */}
          <div className="mb-4 flex flex-row gap-2 items-center">
            <h2 className="text-lg font-bold">Kích thước:</h2>
            <p>
              {currentItemSelected?.lengthSize &&
                currentItemSelected?.widthSize &&
                currentItemSelected?.heightSize
                ? `${currentItemSelected.lengthSize} x ${currentItemSelected.widthSize} x ${currentItemSelected.heightSize} cm`
                : "N/A"}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold">Số lượng:&nbsp;</h2>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          {/* Buttons */}
          {currentItemSelected !== undefined && (
            <div className="flex flex-row items-center sm:justify-start justify-center rounded-3xl gap-4">
              <button className="font-semibold font-sans rounded-3xl bg-[#da684c] uppercase text-white py-2 px-4 hover:bg-[#f89075]"
                onClick={triggerBuyNow}>
                Mua ngay
              </button>
              <button
                className="font-sans uppercase border rounded-3xl border-gray-950 py-2 px-4 hover:bg-gray-400"
                onClick={triggerAddItemManual}
              >
                Thêm vào giỏ hàng
              </button>
              {currentItemSelected.modelUrl && (
                <button
                  className="w-max px-3 py-1 h-full font-semibold rounded-sm bg-gray-300 flex justify-center items-center hover:bg-gray-200 hover:cursor-pointer"
                  onClick={trigger3D}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/*Tabs*/}
      <div className="sm:w-1/2 w-[90%] mx-auto">
        <Tabs
          description={dataProduct?.description || ""}
          product_id={dataProduct?.id || null}
        />
      </div>

      {/*Gợi ý sản phẩm*/}
      <div className="sm:p-10 p-5">
        <div className="flex justify-between px-4 text-3xl font-bold ">
          <span> Sản phẩm liên quan </span>
          {/* <span className="text-sm"> Xem thêm </span> */}
        </div>
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          {dataSameProductRecommend.length > 0 ? (
            dataSameProductRecommend.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center text-lg">Không có sản phẩm nào</div>
          )}
        </div>
      </div>

      {/*Gợi ý sản phẩm*/}
      <div className="sm:p-10 p-5">
        <div className="flex justify-between px-4 text-3xl font-bold py-4">
          <span> Gợi ý cho bạn</span>
          {/* <span className="text-sm"> Xem thêm </span> */}
        </div>
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          {dataRecommendProducts.length > 0 ? (
            dataRecommendProducts.map((product, index) => (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center text-lg">Không có sản phẩm nào</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
