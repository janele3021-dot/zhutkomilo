import test from 'node:test';
import assert from 'node:assert/strict';
import { TOKEN, CHAT_ID, buildOrderMessage } from './telegram';
import { calculateCartTotals, addToCartList, updateItemQuantity, removeFromCartList } from './cart';
import { formatPrice } from './format';
import { CartItem, Product, OrderFormData } from '../types';

const mockProductA: Product = {
  id: 'prod-1',
  name: 'Беспроводные наушники Pro Max',
  category: 'Аудио',
  price: 24990,
  oldPrice: 29990,
  badge: 'Хит',
  rating: 4.9,
  reviewsCount: 142,
  images: ['https://example.com/img1.jpg'],
  description: 'Отличное шумоподавление',
  specs: { 'Время работы': '30 часов' },
  inStock: true,
};

const mockProductB: Product = {
  id: 'prod-2',
  name: 'Смарт-часы Active 2',
  category: 'Гаджеты',
  price: 18500,
  rating: 4.8,
  reviewsCount: 89,
  images: ['https://example.com/img2.jpg'],
  description: 'Фитнес-трекер',
  specs: { 'Экран': 'AMOLED' },
  inStock: true,
};

test('Telegram constants match the prompt requirements', () => {
  assert.equal(TOKEN, '9230142587:AAF-TyS8gZFRNVRL5AHuIDNuHFkh7wAEqd0');
  assert.equal(CHAT_ID, '5140754277');
});

test('buildOrderMessage contains all required fields in Russian', () => {
  const items: CartItem[] = [
    { product: mockProductA, quantity: 2 },
    { product: mockProductB, quantity: 1 },
  ];
  const total = 24990 * 2 + 18500; // 68480
  const customer: OrderFormData = {
    name: 'Азамат Кусаинов',
    phone: '+7 777 123 45 67',
    address: 'г. Алматы, пр. Абая 52, кв 12',
    comment: 'Домофон 12В, позвонить за 15 минут',
  };

  const fixedDate = new Date('2026-10-28T14:30:00Z');
  const message = buildOrderMessage(items, total, customer, fixedDate);

  // Must include "🛒 Новый заказ"
  assert.match(message, /🛒 Новый заказ/);
  // Must include items with quantity and price
  assert.match(message, /Беспроводные наушники Pro Max/);
  assert.match(message, /2 шт\./);
  assert.match(message, /Смарт-часы Active 2/);
  assert.match(message, /1 шт\./);
  // Must include total
  assert.match(message, /68\s?480\s*₸/);
  // Must include customer info
  assert.match(message, /Азамат Кусаинов/);
  assert.match(message, /\+7 777 123 45 67/);
  assert.match(message, /г\. Алматы, пр\. Абая 52, кв 12/);
  assert.match(message, /Домофон 12В, позвонить за 15 минут/);
  // Must include date and time
  assert.match(message, /Дата и время:/);
});

test('calculateCartTotals calculates quantities and subtotals accurately', () => {
  const items: CartItem[] = [
    { product: mockProductA, quantity: 2 },
    { product: mockProductB, quantity: 3 },
  ];
  const { totalItems, subtotal, savings } = calculateCartTotals(items);

  assert.equal(totalItems, 5);
  assert.equal(subtotal, 24990 * 2 + 18500 * 3);
  // Savings: (29990 - 24990) * 2 = 10000
  assert.equal(savings, 10000);
});

test('cart state management functions (add, update, remove)', () => {
  let cart: CartItem[] = [];
  cart = addToCartList(cart, mockProductA, 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  // Adding same product again increments quantity
  cart = addToCartList(cart, mockProductA, 2);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);

  // Adding second product
  cart = addToCartList(cart, mockProductB, 1);
  assert.equal(cart.length, 2);

  // Update quantity
  cart = updateItemQuantity(cart, mockProductA.id, 5);
  assert.equal(cart.find(i => i.product.id === mockProductA.id)?.quantity, 5);

  // Updating quantity to 0 removes the item
  cart = updateItemQuantity(cart, mockProductB.id, 0);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].product.id, mockProductA.id);

  // Remove directly
  cart = removeFromCartList(cart, mockProductA.id);
  assert.equal(cart.length, 0);
});

test('formatPrice formats numbers with tenge currency symbol', () => {
  const formatted = formatPrice(15000);
  assert.match(formatted, /15\s?000\s*₸/);
});
