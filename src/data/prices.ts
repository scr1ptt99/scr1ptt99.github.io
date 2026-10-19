/**
 * ⚠️ ЦІНИ — ЗРАЗКОВІ. Замініть числа на актуальні ціни центру.
 * Усі сторінки (Ціни, калькулятор, картки) беруть дані звідси.
 */
export interface Plan {
  id: string;
  name: string;
  note: string;
  pricePerLesson: number; // грн за заняття
  duration: string;
  features: string[];
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "group",
    name: "Міні-група",
    note: "3–6 учнів одного рівня",
    pricePerLesson: 300,
    duration: "60 хв",
    features: [
      "Програма під рівень групи",
      "Домашні завдання з перевіркою",
      "Звіт для батьків щомісяця",
      "Атмосфера командної роботи",
    ],
  },
  {
    id: "individual",
    name: "Індивідуально",
    note: "Один на один з викладачем",
    pricePerLesson: 550,
    duration: "60 хв",
    features: [
      "Персональна програма",
      "Гнучкий розклад",
      "Фокус на прогалинах учня",
      "Допомога з домашнім завданням",
      "Підготовка до олімпіад",
    ],
    highlight: true,
  },
  {
    id: "online",
    name: "Онлайн",
    note: "З будь-якого міста",
    pricePerLesson: 450,
    duration: "60 хв",
    features: [
      "Інтерактивна дошка",
      "Записи пояснень",
      "Ті самі викладачі",
      "Без дороги до центру",
    ],
  },
];

export const NMT_COURSE = {
  name: "Курс підготовки до НМТ",
  pricePerMonth: 2400,
  lessonsPerMonth: 8,
  features: [
    "Діагностичне тестування на старті",
    "Пробні НМТ щомісяця з розбором",
    "Банк завдань у форматі НМТ",
    "Стратегії розподілу часу",
  ],
};

export const DISCOUNTS = [
  { label: "Абонемент на 8 занять", value: 0.05 },
  { label: "Абонемент на 16 занять", value: 0.1 },
  { label: "Другий предмет", value: 0.1 },
];

export const formatUAH = (n: number) =>
  new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(Math.round(n)) + " грн";
