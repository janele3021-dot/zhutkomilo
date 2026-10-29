import { Product } from '../types';

export const CATEGORIES = ['Все', 'Гаджеты', 'Аудио', 'Аксессуары', 'Для дома'];

export const PRODUCTS: Product[] = [
  {
    id: 'air-sound-pro',
    name: 'Беспроводные наушники SoundCore Pro ANC',
    category: 'Аудио',
    price: 32990,
    oldPrice: 42990,
    badge: 'Хит',
    rating: 4.9,
    reviewsCount: 184,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    ],
    description:
      'Премиальные накладные наушники с активным гибридным шумоподавлением до 40 дБ. Чистый Hi-Res звук, мягкие амбушюры с эффектом памяти и до 45 часов автономной работы. Быстрая зарядка за 10 минут даёт 5 часов музыки.',
    specs: {
      'Тип подключения': 'Bluetooth 5.3 / AUX 3.5mm',
      'Автономность': 'До 45 часов (с ANC 35ч)',
      'Шумоподавление': 'Активное ANC + режим прозрачности',
      'Вес': '250 г',
      'Гарантия': '12 месяцев',
    },
    inStock: true,
  },
  {
    id: 'smart-watch-ultra',
    name: 'Смарт-часы Apex Horizon Ultra 46mm',
    category: 'Гаджеты',
    price: 49990,
    oldPrice: 59990,
    badge: 'Новинка',
    rating: 4.8,
    reviewsCount: 96,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    ],
    description:
      'Титановый корпус, сапфировое стекло и яркий AMOLED-дисплей с функцией Always-On. Мониторинг пульса, SpO2, уровня стресса, сна и более 100 спортивных режимов. Защита от воды IP68 (до 50 м).',
    specs: {
      'Дисплей': '1.43" AMOLED 466x466',
      'Материал': 'Авиационный титан + сапфир',
      'Влагозащита': '5 ATM / IP68',
      'Совместимость': 'iOS / Android',
      'Время работы': 'До 12 дней',
    },
    inStock: true,
  },
  {
    id: 'powerbank-mag',
    name: 'Внешний аккумулятор MagSafe Turbo 10000 mAh',
    category: 'Аксессуары',
    price: 16990,
    oldPrice: 21990,
    badge: 'Скидка',
    rating: 4.9,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    ],
    description:
      'Компактный магнитный повербанк с поддержкой быстрой беспроводной зарядки MagSafe 15W и кабельной зарядки PD 22.5W через Type-C. Прорезиненный корпус soft-touch не царапает смартфон.',
    specs: {
      'Емкость': '10 000 мАч (38.5 Вт·ч)',
      'Беспроводная зарядка': '15W MagSafe',
      'Проводная зарядка': 'Type-C PD 22.5W',
      'Индикатор': 'LED дисплей с процентами',
      'Габариты': '105 x 68 x 16 мм',
    },
    inStock: true,
  },
  {
    id: 'keyboard-retro-mech',
    name: 'Механическая клавиатура Lumina Pro RGB',
    category: 'Гаджеты',
    price: 38500,
    oldPrice: 45000,
    badge: 'Хит',
    rating: 4.9,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
    ],
    description:
      'Беспроводная 75% механическая клавиатура с переключателями Gateron Yellow Pro с заводской смазкой. Шумоизоляция в 3 слоя для тихого и приятного звука печати. Подключение по Bluetooth, 2.4G и Type-C.',
    specs: {
      'Форм-фактор': '75% (82 клавиши + энкодер)',
      'Свитчи': 'Gateron Pro Yellow (Hot-swap)',
      'Подсветка': 'RGB с 18 режимами',
      'Подключение': 'Bluetooth / 2.4G / USB-C',
      'Аккумулятор': '4000 мАч',
    },
    inStock: true,
  },
  {
    id: 'speaker-waterproof',
    name: 'Портативная акустика Pulse Wave 30W',
    category: 'Аудио',
    price: 23990,
    oldPrice: 28990,
    badge: 'Хит',
    rating: 4.9,
    reviewsCount: 154,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    ],
    description:
      'Колонка с глубоким 360-градусным басом и динамической подсветкой. Полная защита от погружения в воду по стандарту IPX7. Можно объединять две колонки в стереопару.',
    specs: {
      'Мощность': '30 Вт (2x 15W + пассивный радиатор)',
      'Защита': 'IPX7 (водонепроницаемая)',
      'Время работы': 'До 18 часов',
      'Подключение': 'Bluetooth 5.3, AUX, TF-карта',
    },
    inStock: true,
  },
  {
    id: 'leather-backpack',
    name: 'Городской рюкзак Urban Voyager Pro',
    category: 'Аксессуары',
    price: 27900,
    oldPrice: 34900,
    badge: 'Новинка',
    rating: 4.8,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
    ],
    description:
      'Минималистичный водонепроницаемый рюкзак с защитным отделением для ноутбука до 16 дюймов. Потайной карман для документов, скрытые молнии YKK и ортопедическая дышащая спинка.',
    specs: {
      'Объем': '22 литра',
      'Материал': 'Cordura 600D + эко-кожа',
      'Отделение для ноутбука': 'До 16 дюймов',
      'Влагозащита': 'Водоотталкивающее покрытие',
      'Размеры': '44 x 30 x 14 см',
    },
    inStock: true,
  },
  {
    id: 'ambient-lamp',
    name: 'Умная лампа-ночник Aurora Smart Glow',
    category: 'Для дома',
    price: 19490,
    oldPrice: 24900,
    rating: 4.7,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    ],
    description:
      'Дизайнерский светильник с плавной регулировкой яркости и 16 миллионами цветов. Поддерживает режимы заката, рассвета и цветомузыку под ритм треков. Сенсорное управление на базе и через приложение.',
    specs: {
      'Цветовая температура': '2000K – 6500K + RGB',
      'Управление': 'Сенсорное + Wi-Fi / Bluetooth',
      'Питание': 'USB Type-C',
      'Мощность': '10 Вт',
    },
    inStock: true,
  },
  {
    id: 'thermo-cup',
    name: 'Умная термокружка с дисплеем TempGuard 500ml',
    category: 'Для дома',
    price: 9990,
    oldPrice: 13990,
    badge: 'Скидка',
    rating: 4.7,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80',
    ],
    description:
      'Кружка из пищевой стали SUS 316 с LED-экраном на крышке, отображающим точную температуру напитка в реальном времени. Сохраняет напиток горячим до 12 часов и холодным до 24 часов.',
    specs: {
      'Объем': '500 мл',
      'Материал': 'Медицинская сталь SUS 316',
      'Экран': 'Сенсорный LED термометр',
      'Удержание тепла': 'До 12 часов',
    },
    inStock: true,
  },
];
