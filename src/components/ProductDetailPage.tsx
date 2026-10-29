import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  Check,
  ShoppingBag,
  Zap,
  Minus,
  Plus,
} from 'lucide-react';
import { Page, Product } from '../types';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onNavigate,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs'>('desc');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const { addItem, items } = useCart();
  const existingCartItem = items.find((i) => i.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    onNavigate('checkout');
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Назад в каталог
        </button>
        <span className="text-xs text-gray-500 font-medium">{product.category}</span>
      </div>

      {/* Main Image View */}
      <div className="bg-white rounded-2xl p-3 border border-gray-150 shadow-xs space-y-3">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
          <img
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs ${
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
        </div>

        {/* Gallery Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImageIndex === idx
                    ? 'border-blue-600 ring-2 ring-blue-500/20'
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title & Rating */}
      <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount} отзывов)</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <Check className="w-3 h-3" /> В наличии
          </div>
        </div>

        <h1 className="text-lg font-bold text-gray-900 leading-tight">
          {product.name}
        </h1>

        {/* Price Block */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-gray-100">
          <span className="text-2xl font-extrabold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {product.oldPrice && (
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              Экономия {formatPrice(product.oldPrice - product.price)}
            </span>
          )}
        </div>

        {/* Quantity Stepper */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-gray-600">Количество:</span>
          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Уменьшить количество"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Увеличить количество"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            className={`py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              isAddedFeedback
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
            }`}
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4" /> Добавлено!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> В корзину
                {existingCartItem && (
                  <span className="text-[11px] opacity-80">({existingCartItem.quantity})</span>
                )}
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="py-3 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-gray-900 hover:bg-black text-white flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Zap className="w-4 h-4 text-amber-400" /> Купить сразу
          </button>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white p-3 rounded-xl border border-gray-150 flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-gray-700 leading-tight">Доставка по РК 1-3 дня</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-150 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-gray-700 leading-tight">Официальная гарантия</span>
        </div>
      </div>

      {/* Tabs: Description & Specs */}
      <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3">
        <div className="flex border-b border-gray-150">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'desc'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Описание
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Характеристики
          </button>
        </div>

        {activeTab === 'desc' ? (
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        ) : (
          <div className="divide-y divide-gray-100 text-xs">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="py-2 flex justify-between gap-4">
                <span className="text-gray-500">{key}</span>
                <span className="font-semibold text-gray-800 text-right">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
