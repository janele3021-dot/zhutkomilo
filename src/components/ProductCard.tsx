import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { items, addItem } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const inCartCount = cartItem?.quantity || 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-2xl p-3 border border-gray-150 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      role="button"
      tabIndex={0}
      aria-label={`Открыть товар ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
    >
      <div>
        {/* Image & Badge container */}
        <div className="relative aspect-square w-full rounded-xl bg-gray-100 overflow-hidden mb-2.5 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
            }}
          />

          {product.badge && (
            <span
              className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
                product.badge === 'Хит'
                  ? 'bg-amber-500 text-white'
                  : product.badge === 'Новинка'
                  ? 'bg-blue-600 text-white'
                  : 'bg-rose-500 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}

          {inCartCount > 0 && (
            <span className="absolute top-2 right-2 bg-blue-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs backdrop-blur-xs">
              <Check className="w-3 h-3" /> {inCartCount}
            </span>
          )}
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
          <span>{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500 font-medium">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            <span className="text-gray-700">{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-xs sm:text-sm text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
      </div>

      {/* Pricing and Action */}
      <div className="pt-2 mt-auto border-t border-gray-100 flex items-center justify-between gap-1.5">
        <div>
          <div className="font-bold text-sm sm:text-base text-gray-900">
            {formatPrice(product.price)}
          </div>
          {product.oldPrice && (
            <div className="text-[11px] text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </div>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className={`p-2 rounded-xl transition-all active:scale-95 flex items-center justify-center ${
            inCartCount > 0
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
          }`}
          aria-label={`Добавить в корзину ${product.name}`}
          title="Добавить в корзину"
        >
          {inCartCount > 0 ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
