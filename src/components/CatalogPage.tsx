import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Sparkles, Truck } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface CatalogPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const CatalogPage: React.FC<CatalogPageProps> = ({ products, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'Все' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // popular
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-4 pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> Спецпредложение
          </div>
          <h2 className="text-base font-bold leading-tight mb-1">
            Бесплатная экспресс-доставка
          </h2>
          <p className="text-xs text-blue-100 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> По Алматы, Астане и всему Казахстану
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск товаров в магазине..."
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
            aria-label="Очистить поиск"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills & Sort */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Найдено: {filteredProducts.length}</span>
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-0 text-gray-700 font-medium focus:ring-0 cursor-pointer text-xs pr-2"
              aria-label="Сортировка"
            >
              <option value="popular">По популярности</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-150 my-6">
          <p className="text-gray-500 text-sm mb-3">Ничего не найдено по запросу «{searchQuery}»</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Все');
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-xl"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};
