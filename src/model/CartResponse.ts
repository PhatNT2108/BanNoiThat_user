export interface CartResponse {
  id: string;
  cartItems: CartItemResponse[];
}

export interface CartItemResponse {
  id: string;
  productItem_Id: string;
  productName: string;
  nameOption: string;
  imageUrl: string;
  quantity: number;
  price: number;
  salePrice: number;
}
