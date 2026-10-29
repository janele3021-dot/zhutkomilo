import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';
import { CartItem, OrderFormData, Page, PlacedOrder } from '../types';
import { formatPrice } from '../utils/format';
import { sendTelegramOrder } from '../utils/telegram';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderSuccess }) => {
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If cart is empty, show prompt to return to catalog
  if (items.length === 0) {
    return (
      <div className="py-12 px-4 text-center space-y-4 pb-24">
        <div className="w-16 h-16 bg-gray-100 text-gray-500 rounded-2xl mx-auto flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-base font-bold text-gray-900">В корзине нет товаров</h2>
        <p className="text-xs text-gray-500">Добавьте хотя бы один товар для оформления заказа.</p>
        <button
          onClick={() => onNavigate('catalog')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона';
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = 'Укажите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDate = new Date();
      // Send Telegram notification via Bot API strictly as required
      const result = await sendTelegramOrder(items, subtotal, formData, orderDate);

      if (result.ok) {
        // Success: construct placed order object, clear cart and show thank-you page
        const placedOrder: PlacedOrder = {
          orderId: `KZ-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [...items],
          total: subtotal,
          customer: { ...formData },
          createdAt: orderDate.toISOString(),
        };

        clearCart();
        onOrderSuccess(placedOrder);
        onNavigate('thank-you');
      } else {
        // Error from Telegram API
        setErrorMessage(
          result.description ||
            result.error ||
            'Не удалось отправить заказ в Telegram. Пожалуйста, попробуйте еще раз.'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Ошибка при отправке: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Назад в корзину
        </button>
        <span className="text-xs text-gray-500 font-semibold">Оформление</span>
      </div>

      {/* Error alert banner if Telegram failed */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-rose-800 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold">Ошибка оформления заказа</div>
            <p className="text-rose-700 leading-relaxed">{errorMessage}</p>
            <p className="text-[11px] text-rose-500 pt-1">
              Корзина сохранена. Проверьте подключение и нажмите «Оформить заказ» снова.
            </p>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Info Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3.5">
          <h2 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" /> Контактные данные
          </h2>

          {/* Name Field (Required) */}
          <div className="space-y-1">
            <label htmlFor="customer-name" className="block text-xs font-semibold text-gray-700">
              Ваше имя <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="customer-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Например, Арман Сериков"
                className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white transition-all ${
                  errors.name
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                }`}
                disabled={isSubmitting}
                required
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-600 font-medium pl-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Field (Required) */}
          <div className="space-y-1">
            <label htmlFor="customer-phone" className="block text-xs font-semibold text-gray-700">
              Номер телефона <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="customer-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="+7 (707) 123-45-67"
                className={`w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white transition-all ${
                  errors.phone
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                }`}
                disabled={isSubmitting}
                required
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-rose-600 font-medium pl-1">{errors.phone}</p>
            )}
            <p className="text-[10px] text-gray-400 pl-1">
              Для подтверждения заказа и связи курьера
            </p>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3.5">
          <h2 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> Адрес доставки
          </h2>

          <div className="space-y-1">
            <label htmlFor="customer-address" className="block text-xs font-semibold text-gray-700">
              Город, улица, дом, квартира
            </label>
            <input
              id="customer-address"
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="г. Алматы, пр. Аль-Фараби 77, кв. 45"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="customer-comment" className="block text-xs font-semibold text-gray-700">
              Комментарий к заказу
            </label>
            <div className="relative">
              <textarea
                id="customer-comment"
                rows={2}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Подъезд, этаж, домофон или пожелания к доставке..."
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-gray-900 flex items-center justify-between">
            <span>Ваш заказ</span>
            <span className="text-xs font-semibold text-gray-500">
              {items.length} {items.length === 1 ? 'позиция' : 'позиции'}
            </span>
          </h3>

          <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover shrink-0 bg-gray-100"
                  />
                  <div className="truncate">
                    <span className="font-medium text-gray-800">{item.product.name}</span>
                    <span className="text-gray-400 block text-[10px]">{item.quantity} шт.</span>
                  </div>
                </div>
                <span className="font-bold text-gray-900 shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
            <span className="font-bold text-sm text-gray-900">Итого к оплате:</span>
            <span className="font-extrabold text-lg text-blue-600">{formatPrice(subtotal)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="space-y-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-blue-500/25 active:scale-98 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Отправка заказа...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Оформить заказ
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-gray-400">
            Оплата при получении курьеру наличными или Kaspi QR
          </p>
        </div>
      </form>
    </div>
  );
};
