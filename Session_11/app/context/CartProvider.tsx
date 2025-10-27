import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "../ProductListScreen";

export const CartContext = createContext({
  cart: [] as CartType[],
  addToCart: (newProduct: CartType) => {},
  increaseQuantity: (product: CartType) => {},
  decreaseQuantity: (product: CartType) => {},
  deleteProductInCart: (productId: number) => {},
});

export type CartType = {
  productId: number;
  quantity: number;
};

export default function CartProvider({ children }: any) {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    cart;
  }, []);

  const addToCart = (newProduct: CartType) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === newProduct.productId);
      if (existing) {
        // nếu sp đã có thì tăng số lượng
        return prev.map((p) =>
          p.productId === newProduct.productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...prev, { ...newProduct, quantity: 1 }];
      }
    })
  }

  const increaseQuantity = (product: CartType) => {
   setCart(prev => prev.map(p => p.productId === product.productId 
    ? {...p, quantity: p.quantity + 1}
    : p
   ))
  };

  const decreaseQuantity = (product: CartType) => {
     setCart((prev) =>
       prev.map((p) =>
         p.productId === product.productId
           ? { ...p, quantity:Math.max(1, p.quantity - 1) }
           : p
       )
     );
  };

  const deleteProductInCart = (productId: number) => {
    cart.filter((p) => p.productId != productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        deleteProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
