/* Giỏ hàng: state dùng chung, lưu vào localStorage (có try/catch). */
import React, { createContext, useContext, useEffect, useReducer, useState, useRef } from 'react';

const KEY = 'lumi-cart-v1';
const CartCtx = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const found = items.find((i) => i.id === action.item.id);
      if (found) {
        return items.map((i) =>
          i.id === action.item.id
            ? { ...i, qty: Math.min(i.qty + action.item.qty, action.max) }
            : i
        );
      }
      return [...items, { ...action.item, qty: Math.min(action.item.qty, action.max) }];
    }
    case 'qty':
      return items.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, Math.min(action.qty, action.max)) } : i
      );
    case 'remove':
      return items.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);
  const returnFocus = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* bộ nhớ trình duyệt không khả dụng: giỏ hàng vẫn chạy trong phiên */
    }
  }, [items]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  const openCart = () => {
    returnFocus.current = document.activeElement;
    setOpen(true);
  };
  const closeCart = () => {
    setOpen(false);
    const el = returnFocus.current;
    if (el && el.focus) setTimeout(() => el.focus(), 0);
  };

  return (
    <CartCtx.Provider value={{ items, dispatch, count, subtotal, open, openCart, closeCart }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);

/* Hiệu ứng xuất hiện khi cuộn: chỉ dịch chuyển, nội dung luôn hiển thị. */
export function useReveal(key) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('motion');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

/* Giữ focus trong một vùng (menu, giỏ hàng, lightbox) và đóng bằng Esc. */
export function useFocusTrap(active, ref, onClose) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const sel = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const first = root.querySelector(sel);
    first && first.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const els = [...root.querySelectorAll(sel)].filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const a = els[0];
      const b = els[els.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        b.focus();
      } else if (!e.shiftKey && document.activeElement === b) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);
}
