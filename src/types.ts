export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: 'Хит' | 'Новинка' | 'Скидка';
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  specs: { [key: string]: string };
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  comment: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  total: number;
  customer: OrderFormData;
  createdAt: string;
}

export type Page = 'catalog' | 'product' | 'cart' | 'checkout' | 'thank-you';
