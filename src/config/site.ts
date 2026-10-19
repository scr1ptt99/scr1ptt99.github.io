/**
 * Головні дані центру. Змінюйте тут — оновиться весь сайт.
 */
export const SITE = {
  name: "Ерудит Плюс",
  fullName: "Репетиторський центр «Ерудит Плюс»",
  tagline: "Знання, що відкривають двері",
  phones: [
    { label: "+38 (050) 659-75-80", href: "tel:+380506597580" },
    { label: "+38 (050) 041-11-85", href: "tel:+380500411185" },
  ],
  address: {
    street: "вул. Княжий Затон, 10А",
    office: "3 поверх, офіс 305",
    district: "Осокорки",
    city: "м. Київ",
    mapQuery: "Київ, вул. Княжий Затон, 10А",
    metro: "м. Осокорки",
  },
  hours: [
    { days: "Понеділок – П’ятниця", time: "09:00 – 20:00" },
    { days: "Субота", time: "10:00 – 18:00" },
    { days: "Неділя", time: "вихідний" },
  ],
  /** Підставте адресу обробника форм (Formspree, Getform, власний бекенд). Порожньо — форма показує дзвінок. */
  formEndpoint: "",
  /** HLS-відео для фінальної CTA-секції */
  ctaVideo: "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8",
  year: 2026,
};

export const NAV = [
  { label: "Головна", to: "/" },
  { label: "Предмети", to: "/predmety", mega: true },
  { label: "НМТ", to: "/nmt" },
  { label: "Ціни", to: "/tsiny" },
  { label: "Відгуки", to: "/vidguky" },
  { label: "Блог", to: "/blog" },
  { label: "Контакти", to: "/kontakty" },
] as const;
