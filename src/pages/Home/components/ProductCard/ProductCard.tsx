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
      className="card-product relative md:m-2 m-1 box-border min-w-[11.3em] max-h-[18rem]"
      onClick={() => navigateProductDetail(product.slug)}
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={product.thumbnailUrl || "https://placehold.co/600x400"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={product.thumbnailUrlSecond || "https://placehold.co/600x400"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col justify-between ml-3 mb-2">
        <h3 className="md:text-[1.1rem] ml-1 mt-2 min-h-[3.4rem] ">{product.name}</h3>
        <div className="flex items-center flex-wrap">
          <div className="text-[#2b8a3e] sm:pl-1 px-1">{product.salePrice.toLocaleString()}đ</div>
          {product.price !== 0 && (
            <div className="md:text-sm text-[0.8rem] line-through text-gray-400 ml-1">
              {product.price.toLocaleString("vn")}đ
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-1 left-1 flex flex-col gap-1">
        {product.salePrice !== product.price && (<div className="flex justify-center items-center text-[16px] w-10 h-10 rounded-full text-white bg-[#c92a2a]">
          {((1 - product.salePrice / product.price) * 100).toFixed(0)}%
        </div>)}
        {product.isHaveModel3D && (<button
          className="w-max px-3 py-1 h-full font-semibold rounded-sm bg-gray-300 flex justify-center items-center "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </button>)}
      </div>
    </div >
  );
}

export default ProductCard;
