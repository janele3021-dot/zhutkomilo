export const TOKEN = "9230142587:AAF-TyS8gZFRNVRL5AHuIDNuHFkh7wAEqd0";
export const CHAT_ID = "5140754277";

import React, { useState } from 'react';
import { Page, Product, PlacedOrder } from './types';
import { PRODUCTS } from './data/products';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ThankYouPage } from './components/ThankYouPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    setLastPlacedOrder(order);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-100 flex justify-center">
        {/* Mobile device frame container */}
        <div className="w-full max-w-md min-h-screen bg-gray-50 flex flex-col shadow-2xl relative border-x border-gray-200">
          {/* Header */}
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            title={
              currentPage === 'product' && selectedProduct
                ? selectedProduct.name
                : undefined
            }
          />

          {/* Main Content Area */}
          <main className="flex-1 px-4 pt-3.5 pb-8">
            {currentPage === 'catalog' && (
              <CatalogPage
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'product' && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                onBack={() => handleNavigate('catalog')}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'cart' && (
              <CartPage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'checkout' && (
              <CheckoutPage
                onNavigate={handleNavigate}
                onOrderSuccess={handleOrderSuccess}
              />
            )}

            {currentPage === 'thank-you' && (
              <ThankYouPage
                order={lastPlacedOrder}
                onNavigate={handleNavigate}
              />
            )}
          </main>

          {/* Bottom Navigation for mobile-first app */}
          <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
        </div>
      </div>
    </CartProvider>
  );
}
