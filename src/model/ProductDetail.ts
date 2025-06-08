export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  slug: string;
  category: Category;
  brand: Brand;
  productItems: ProductItemResponse[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface ProductItemResponse {
  id: string;
  nameOption: string;
  quantity: number;
  price: number;
  salePrice: number;
  sku: string;
  imageUrl: string;
  modelUrl: string;
  lengthSize: number;
  widthSize: number;
  heightSize: number;
  saleProgram: SaleProgram;
  soldQuantity: number;
}

export interface SaleProgram {
  id: string;
  name: string;
  slug: string;
}
