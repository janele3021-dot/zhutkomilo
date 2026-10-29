import React from 'react';
import { ShoppingBag, ArrowLeft, Store } from 'lucide-react';
import { Page } from '../types';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, title }) => {
  const { totalItems } = useCart();

  const isHome = currentPage === 'catalog';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {!isHome ? (
            <button
              onClick={() => onNavigate('catalog')}
              className="p-1.5 -ml-1 text-gray-700 hover:text-gray-950 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
              aria-label="Назад в каталог"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Store className="w-4 h-4" />
            </div>
          )}

          <div>
            {isHome ? (
              <button
                onClick={() => onNavigate('catalog')}
                className="text-left font-bold text-lg text-gray-900 tracking-tight flex items-center gap-1.5"
              >
                QazShop
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">
                  KZ
                </span>
              </button>
            ) : (
              <h1 className="font-semibold text-base text-gray-900 line-clamp-1">
                {title || (currentPage === 'cart' ? 'Корзина' : currentPage === 'checkout' ? 'Оформление заказа' : 'Заказ оформлен')}
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentPage !== 'cart' && (
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-700 hover:text-gray-950 hover:bg-gray-100 rounded-full transition-all active:scale-95"
              aria-label={`Корзина, товаров: ${totalItems}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
