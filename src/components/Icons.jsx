import React from 'react';

const S = ({ children, size = 20, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    {children}
  </svg>
);

export const IconBag = (p) => (
  <S {...p}>
    <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </S>
);
export const IconMenu = (p) => (
  <S {...p}>
    <path d="M4 8h16M4 16h16" />
  </S>
);
export const IconClose = (p) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);
export const IconArrowRight = (p) => (
  <S {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </S>
);
export const IconArrowLeft = (p) => (
  <S {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </S>
);
export const IconArrowDown = (p) => (
  <S {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </S>
);
export const IconArrowUpRight = (p) => (
  <S {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </S>
);
export const IconPlus = (p) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const IconMinus = (p) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
);
export const IconExpand = (p) => (
  <S {...p}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </S>
);
export const IconTruck = (p) => (
  <S {...p}>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </S>
);
export const IconShield = (p) => (
  <S {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </S>
);
export const IconReturn = (p) => (
  <S {...p}>
    <path d="M4 9h11a5 5 0 0 1 0 10H9" />
    <path d="M8 5 4 9l4 4" />
  </S>
);
export const IconChat = (p) => (
  <S {...p}>
    <path d="M5 5h14v10H9l-4 4V5Z" />
  </S>
);
export const IconStar = (p) => (
  <S {...p}>
    <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6L12 4Z" />
  </S>
);
export const IconUser = (p) => (
  <S {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" />
  </S>
);
export const IconBox = (p) => (
  <S {...p}>
    <path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9Z" />
    <path d="M4 7.5 12 11l8-3.5M12 11v9" />
  </S>
);
export const IconPin = (p) => (
  <S {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </S>
);
export const IconBank = (p) => (
  <S {...p}>
    <path d="M3 9.5 12 4l9 5.5M5 10v7M9.7 10v7M14.3 10v7M19 10v7M3 20h18" />
  </S>
);
export const IconLogout = (p) => (
  <S {...p}>
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M9 16l-4-4 4-4M5 12h11" />
  </S>
);
export const IconChevron = (p) => (
  <S {...p}>
    <path d="m6 9 6 6 6-6" />
  </S>
);
