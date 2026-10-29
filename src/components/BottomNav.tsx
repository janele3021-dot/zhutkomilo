import React from 'react';
import { LayoutGrid, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Page } from '../types';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-150 py-1.5 px-3 max-w-md mx-auto shadow-lg pb-safe">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
            currentPage === 'catalog' || currentPage === 'product'
              ? 'text-blue-600 font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Каталог товаров"
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Каталог</span>
        </button>

        <button
          onClick={() => onNavigate('cart')}
          className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
            currentPage === 'cart' ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Корзина покупок"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px]">Корзина</span>
        </button>

        <button
          onClick={() => onNavigate('checkout')}
          disabled={totalItems === 0 && currentPage !== 'checkout'}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
            totalItems === 0 && currentPage !== 'checkout'
              ? 'opacity-40 cursor-not-allowed text-gray-400'
              : currentPage === 'checkout'
              ? 'text-blue-600 font-semibold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Оформление заказа"
        >
          <CheckCircle2 className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Заказ</span>
        </button>
      </div>
    </nav>
  );
};
