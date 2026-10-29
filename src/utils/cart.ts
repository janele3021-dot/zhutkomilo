import { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'qazshop_cart_v1';

export function calculateCartTotals(items: CartItem[]): {
  totalItems: number;
  subtotal: number;
  savings: number;
} {
  return items.reduce(
    (acc, item) => {
      const regularPrice = item.product.price * item.quantity;
      const originalPrice = (item.product.oldPrice || item.product.price) * item.quantity;
      acc.totalItems += item.quantity;
      acc.subtotal += regularPrice;
      acc.savings += Math.max(0, originalPrice - regularPrice);
      return acc;
    },
    { totalItems: 0, subtotal: 0, savings: 0 }
  );
}

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(item => item && item.product && typeof item.quantity === 'number' && item.quantity > 0);
    }
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
  }
  return [];
}

export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

export function addToCartList(items: CartItem[], product: Product, quantityToAdd = 1): CartItem[] {
  const index = items.findIndex(i => i.product.id === product.id);
  if (index >= 0) {
    const next = [...items];
    next[index] = {
      ...next[index],
      quantity: next[index].quantity + quantityToAdd,
    };
    return next;
  }
  return [...items, { product, quantity: quantityToAdd }];
}

export function updateItemQuantity(items: CartItem[], productId: string, nextQty: number): CartItem[] {
  if (nextQty <= 0) {
    return items.filter(i => i.product.id !== productId);
  }
  return items.map(item => {
    if (item.product.id === productId) {
      return { ...item, quantity: nextQty };
    }
    return item;
  });
}

export function removeFromCartList(items: CartItem[], productId: string): CartItem[] {
  return items.filter(i => i.product.id !== productId);
}
