import { useNavigate } from "react-router-dom";
import ProductHome from "../../../model/ProductHome";

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
      className="border w-1/8 rounded-lg p-4 m-4 shadow-md hover:cursor-pointer hover:opacity-75 "
      onClick={() => navigateProductDetail(product.slug)}
    >
      <div className="relative w-full h-48 mb-4">
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
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <div className="flex flex-row items-center gap-2 text-gray-700 mb-2">
        <div className="text-lg"> {product.salePrice}</div> VNĐ
        <div className="text-xs text-red-500">
          {((1 - product.salePrice / product.price) * 100).toFixed(2)} %
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
