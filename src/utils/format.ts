/**
 * Formats a number as a price string in Kazakhstani Tenge (₸).
 * Example: 14990 -> "14 990 ₸"
 */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat('ru-RU').format(Math.round(amount));
  return `${formatted} ₸`;
}

/**
 * Formats date and time in Russian format: DD.MM.YYYY, HH:mm
 */
export function formatRussianDateTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
