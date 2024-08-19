export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy: string;
  keyWord?: string;
  types: string[];
  pageNumber: number;
  pageSize: number;
}
