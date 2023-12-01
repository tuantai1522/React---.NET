import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../models/cart";

interface StoreContextValue {
  removeItem: (productId: number, quantity: number) => void;
  setCart: (basket: Cart) => void;
  cart: Cart | null;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  let context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("Oops - we do not seem to be inside the provider");
  }

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [cart, setCart] = useState<Cart | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!cart) return;

    const items = [...cart.items]; // new array of items

    const itemIndex = items.findIndex((i) => i.productId === productId);

    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setCart((prevState) => {
        return { ...prevState!, items };
      });
    }
  }

  return (
    <StoreContext.Provider value={{ cart, setCart, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
