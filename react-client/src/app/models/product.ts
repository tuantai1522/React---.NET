export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  quantityInStock?: number;
}
