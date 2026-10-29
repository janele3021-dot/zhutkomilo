import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import {
  addToCartList,
  calculateCartTotals,
  loadCartFromStorage,
  removeFromCartList,
  saveCartToStorage,
  updateItemQuantity,
} from '../utils/cart';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  savings: number;
  lastAddedProduct: { product: Product; timestamp: number } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [lastAddedProduct, setLastAddedProduct] = useState<{ product: Product; timestamp: number } | null>(null);

  // Sync to localStorage whenever items change
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => addToCartList(prev, product, quantity));
    setLastAddedProduct({ product, timestamp: Date.now() });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => updateItemQuantity(prev, productId, quantity));
  };

  const removeItem = (productId: string) => {
    setItems((prev) => removeFromCartList(prev, productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const { totalItems, subtotal, savings } = calculateCartTotals(items);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        savings,
        lastAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
