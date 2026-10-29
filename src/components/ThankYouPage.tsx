import React from 'react';
import { CheckCircle2, ArrowRight, Package, Clock, Phone, MapPin, Sparkles } from 'lucide-react';
import { Page, PlacedOrder } from '../types';
import { formatPrice, formatRussianDateTime } from '../utils/format';

interface ThankYouPageProps {
  order: PlacedOrder | null;
  onNavigate: (page: Page) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onNavigate }) => {
  const orderDate = order ? new Date(order.createdAt) : new Date();

  return (
    <div className="space-y-4 pb-24 animate-in fade-in">
      {/* Hero Success Badge */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs text-center space-y-3">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 animate-in zoom-in duration-300" />
          </div>
          <span className="absolute -top-1 -right-1 text-emerald-500">
            <Sparkles className="w-4 h-4 fill-emerald-400 stroke-none" />
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Спасибо за заказ!
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            Ваш заказ принят и передан менеджеру в Telegram. Мы свяжемся с вами в течение 15 минут.
          </p>
        </div>

        {order?.orderId && (
          <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            Номер заказа: {order.orderId}
          </div>
        )}
      </div>

      {/* Order Info Card */}
      {order && (
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3.5">
          <h2 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" /> Детали заказа
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-gray-500 py-1 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> Дата и время
              </span>
              <span className="font-medium text-gray-800">{formatRussianDateTime(orderDate)}</span>
            </div>

            <div className="flex items-center justify-between text-gray-500 py-1 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" /> Получатель
              </span>
              <span className="font-medium text-gray-800 text-right">
                {order.customer.name} ({order.customer.phone})
              </span>
            </div>

            {order.customer.address && (
              <div className="flex items-start justify-between text-gray-500 py-1 border-b border-gray-100">
                <span className="flex items-center gap-1.5 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> Адрес
                </span>
                <span className="font-medium text-gray-800 text-right pl-4">
                  {order.customer.address}
                </span>
              </div>
            )}

            {order.customer.comment && (
              <div className="text-gray-500 py-1 border-b border-gray-100">
                <span className="block text-[11px] text-gray-400 mb-0.5">Комментарий:</span>
                <p className="text-gray-700 italic">«{order.customer.comment}»</p>
              </div>
            )}
          </div>

          {/* Items Summary */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-gray-700 mb-2">Купленные товары:</h3>
            <div className="space-y-2 divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-9 h-9 rounded-lg object-cover shrink-0 bg-gray-100"
                    />
                    <div className="truncate">
                      <div className="font-medium text-gray-900 truncate">{item.product.name}</div>
                      <div className="text-[10px] text-gray-400">
                        {item.quantity} шт. × {formatPrice(item.product.price)}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-gray-150 flex items-baseline justify-between">
            <span className="font-bold text-sm text-gray-900">Итого:</span>
            <span className="font-extrabold text-lg text-emerald-600">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      )}

      {/* Action CTA */}
      <button
        onClick={() => onNavigate('catalog')}
        className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 active:scale-98 transition-all"
      >
        Вернуться в каталог <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
