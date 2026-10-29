export const TOKEN = "9230142587:AAF-TyS8gZFRNVRL5AHuIDNuHFkh7wAEqd0";
export const CHAT_ID = "5140754277";

import { CartItem, OrderFormData } from '../types';
import { formatPrice, formatRussianDateTime } from './format';

export interface TelegramSendResult {
  ok: boolean;
  description?: string;
  error?: string;
}

/**
 * Builds the Russian message for the Telegram Bot API as required:
 * Starts with "🛒 Новый заказ", lists items with quantity and price, total,
 * name, phone, address, comment, date and time.
 */
export function buildOrderMessage(
  items: CartItem[],
  total: number,
  customer: OrderFormData,
  date: Date = new Date()
): string {
  const dateTimeStr = formatRussianDateTime(date);

  const itemsListStr = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name}\n   Количество: ${item.quantity} шт. × ${formatPrice(item.product.price)} = ${formatPrice(item.quantity * item.product.price)}`
    )
    .join('\n');

  const lines = [
    '🛒 Новый заказ',
    '━━━━━━━━━━━━━━━━━━',
    `📅 Дата и время: ${dateTimeStr}`,
    '',
    '📦 Состав заказа:',
    itemsListStr,
    '',
    `💰 Итого к оплате: ${formatPrice(total)}`,
    '━━━━━━━━━━━━━━━━━━',
    '👤 Данные покупателя:',
    `• Имя: ${customer.name.trim()}`,
    `• Телефон: ${customer.phone.trim()}`,
    `• Адрес: ${customer.address.trim() ? customer.address.trim() : 'Не указан'}`,
    `• Комментарий: ${customer.comment.trim() ? customer.comment.trim() : 'Нет комментария'}`,
  ];

  return lines.join('\n');
}

/**
 * Sends order message to Telegram Bot API.
 * Uses exact specified fetch call:
 * fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
 *   method: "POST",
 *   body: new URLSearchParams({ chat_id: CHAT_ID, text: message })
 * })
 * Strictly without custom headers.
 */
export async function sendTelegramOrder(
  items: CartItem[],
  total: number,
  customer: OrderFormData,
  date: Date = new Date()
): Promise<TelegramSendResult> {
  const message = buildOrderMessage(items, total, customer, date);

  try {
    const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
      method: "POST",
      body: new URLSearchParams({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();
    if (data && data.ok === true) {
      return { ok: true };
    }

    return {
      ok: false,
      description: data?.description || 'Неизвестная ошибка Telegram API',
      error: `Telegram error code: ${data?.error_code || response.status}`,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      description: 'Сетевая ошибка при отправке в Telegram. Проверьте интернет-соединение.',
      error: errorMessage,
    };
  }
}
