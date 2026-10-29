import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Page, Product } from '../types';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onSelectProduct }) => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, subtotal, savings } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="py-12 px-4 text-center space-y-4 pb-24">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-gray-900">Ваша корзина пуста</h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            В корзине пока нет товаров. Выберите понравившиеся гаджеты и аксессуары в нашем каталоге.
          </p>
        </div>
        <button
          onClick={() => onNavigate('catalog')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-95"
        >
          Перейти в каталог <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28">
      {/* Items Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-gray-600">
          В корзине {totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}
        </span>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors"
        >
          Очистить всё
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="bg-white rounded-2xl p-3 border border-gray-150 shadow-xs flex gap-3 items-center"
          >
            {/* Thumbnail */}
            <div
              onClick={() => onSelectProduct(item.product)}
              className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 cursor-pointer"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info and controls */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <h3
                  onClick={() => onSelectProduct(item.product)}
                  className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  {item.product.name}
                </h3>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-1 text-gray-400 hover:text-rose-600 transition-colors -mr-1"
                  aria-label={`Удалить ${item.product.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-gray-500 mb-1.5">{item.product.category}</div>

              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-sm text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-[10px] text-gray-400">
                      {formatPrice(item.product.price)} / шт.
                    </div>
                  )}
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    aria-label="Уменьшить"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center font-bold text-xs text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    aria-label="Увеличить"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-gray-900">Сумма заказа</h3>

        <div className="divide-y divide-gray-100 text-xs space-y-2">
          <div className="flex justify-between pt-1">
            <span className="text-gray-500">Товары ({totalItems} шт.)</span>
            <span className="font-semibold text-gray-900">{formatPrice(subtotal + savings)}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between pt-2 text-rose-600">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Скидка
              </span>
              <span className="font-semibold">-{formatPrice(savings)}</span>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <span className="text-gray-500">Доставка</span>
            <span className="font-semibold text-emerald-600">Бесплатно</span>
          </div>

          <div className="flex justify-between pt-2.5 items-baseline">
            <span className="font-bold text-sm text-gray-900">Итого:</span>
            <span className="font-extrabold text-lg text-blue-600">{formatPrice(subtotal)}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('checkout')}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 active:scale-98 transition-all"
        >
          Перейти к оформлению <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigate('catalog')}
          className="w-full py-2.5 text-center text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Продолжить покупки
        </button>
      </div>
    </div>
  );
};
