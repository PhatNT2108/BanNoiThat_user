import { useNavigate } from "react-router-dom";
import ProductHome from "../../../../model/ProductHome";
import './productcard.css';

interface Props {
  product: ProductHome;
}

function ProductCard({ product }: Props) {
  const navigate = useNavigate();

  const navigateProductDetail = (slug: string) => {
    navigate(`/products/${slug}`);
  };

  return (
    //Card product
    <div
      className="card-product"
      onClick={() => navigateProductDetail(product.slug)}
    >
      <div className="relative w-full h-48 mb-6">
        <img
          src={product.thumbnailUrl || "https://placehold.co/600x400"}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out hover:opacity-0"
        />
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100"
        />
      </div>
      <div className="flex flex-row justify-between">
        <h3 className="font-sans text-[18px] font-bold">{product.name}</h3>
        <div className="flex flex-row justify-end items-center gap-2 text-gray-700 mb-2">
          {
            product.price !== 0 && (<div className="text-[16px] line-through text-gray-400"> {product.price.toLocaleString("vn")}đ</div>
            )
          }
          <div className="text-[19.2px] text-[#2b8a3e]"> {product.salePrice.toLocaleString()}đ</div>
          {product.salePrice !== 0 && (<div className="absolute top-1 right-1 flex justify-center items-center text-[16px] w-10 h-10 rounded-full text-white bg-[#c92a2a]">
            {((1 - product.salePrice / product.price) * 100).toFixed(0)}%
          </div>)
          }
        </div>
      </div>
    </div >
  );
}

export default ProductCard;
