import { CartItem } from "./cartItem";

export interface Cart {
  cartId: number;
  customerID: string;
  items: CartItem[];
}
