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
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={product.thumbnailUrlSecond || "https://placehold.co/600x400"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col justify-between ml-3 mb-2">
        <h3 className="font-sans font-medium md:text-[1.1rem] ml-1 mt-1 min-h-[3.4rem] ">{product.name}</h3>
        <div className="flex items-center flex-wrap">
          <div className="text-[#2b8a3e] sm:pl-1 px-1">{product.salePrice.toLocaleString()}đ</div>
          {product.price !== 0 && (
            <div className="md:text-sm text-[0.8rem] line-through text-gray-400 ml-1">
              {product.price.toLocaleString("vn")}đ
            </div>
          )}
        </div>
      </div>
      {product.salePrice !== 0 && (<div className="absolute top-1 left-1 flex justify-center items-center text-[16px] w-10 h-10 rounded-full text-white bg-[#c92a2a]">
        {((1 - product.salePrice / product.price) * 100).toFixed(0)}%
      </div>)
      }
    </div >
  );
}

export default ProductCard;
