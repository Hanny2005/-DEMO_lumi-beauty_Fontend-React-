/* ------------------------------------------------------------------
   Tài khoản khách hàng — BẢN XEM THỬ, chạy hoàn toàn trên trình duyệt.
   - Dữ liệu lưu trong localStorage của trình duyệt này (try/catch).
   - Không lưu mật khẩu, không kiểm tra mật khẩu.
   - Ngân hàng chỉ lưu tên ngân hàng, tên chủ tài khoản và 4 số cuối.
   Khi đưa lên thật: thay các hàm bên dưới bằng gọi API máy chủ, và liên kết
   ngân hàng qua cổng thanh toán (không tự lưu số tài khoản).
------------------------------------------------------------------- */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BRAND, CATALOG, CATEGORIES, PRODUCT } from './data.js';

const KEY = 'lumi-account-v1';
const Ctx = createContext(null);
export const DEMO_EMAIL = 'demo@example.com';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const d = raw ? JSON.parse(raw) : null;
    if (d && typeof d === 'object' && d.accounts) return d;
  } catch {}
  return { current: null, accounts: {} };
}

const rid = (p) =>
  p + Date.now().toString(36).slice(-4).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase();

export const lineFromId = (id, qty) => {
  if (id === PRODUCT.id)
    return { id, name: PRODUCT.name, variant: PRODUCT.size, price: PRODUCT.price, qty };
  const p = CATALOG.find((x) => x.id === id);
  if (!p) return null;
  const cat = CATEGORIES.find((c) => c.id === p.cat)?.label || '';
  return { id, name: (p.brand ? p.brand + ' ' : '') + p.name, variant: cat, price: p.price, qty };
};

export const shippingFor = (subtotal) =>
  subtotal >= BRAND.freeShippingThreshold ? 0 : BRAND.shippingFee;

export const addressLine = (a) => [a.street, a.ward, a.province].filter(Boolean).join(', ');
export const bankLabel = (b) => `${b.bank} •••• ${b.last4}`;

function makeOrder({ code, date, status, items, address, payment, sample }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = shippingFor(subtotal);
  return {
    code,
    date,
    status,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    address,
    payment,
    sample: !!sample,
  };
}

/* Tài khoản mẫu: dữ liệu đánh dấu "Mẫu" để không bị nhầm với dữ liệu thật */
function demoAccount() {
  const day = 86400000;
  const now = Date.now();
  const address = {
    id: 'addr-sample',
    name: 'Khách hàng mẫu',
    phone: '0900 000 000',
    street: '123 Đường Ví Dụ',
    ward: 'Phường Mẫu',
    province: 'TP. Hồ Chí Minh',
    isDefault: true,
    sample: true,
  };
  const bank = {
    id: 'bank-sample',
    bank: 'Vietcombank',
    holder: 'KHACH HANG MAU',
    last4: '6789',
    isDefault: true,
    sample: true,
  };
  const snap = { name: address.name, phone: address.phone, line: addressLine(address) };
  const L = (pairs) => pairs.map(([id, q]) => lineFromId(id, q)).filter(Boolean);
  return {
    user: { name: 'Khách hàng mẫu', email: DEMO_EMAIL, since: new Date(now - 120 * day).toISOString() },
    addresses: [address],
    banks: [bank],
    orders: [
      makeOrder({
        code: 'LUMI-M4K2',
        date: new Date(now - 2 * day).toISOString(),
        status: 'shipping',
        items: L([[PRODUCT.id, 1], ['br-17', 5]]),
        address: snap,
        payment: bankLabel(bank),
        sample: true,
      }),
      makeOrder({
        code: 'LUMI-J8P1',
        date: new Date(now - 14 * day).toISOString(),
        status: 'done',
        items: L([['br-25', 1], ['ba-05', 1], ['ba-09', 2]]),
        address: snap,
        payment: 'Thanh toán khi nhận hàng (COD)',
        sample: true,
      }),
      makeOrder({
        code: 'LUMI-F3X9',
        date: new Date(now - 37 * day).toISOString(),
        status: 'done',
        items: L([['br-11', 1]]),
        address: snap,
        payment: bankLabel(bank),
        sample: true,
      }),
      makeOrder({
        code: 'LUMI-C6T5',
        date: new Date(now - 52 * day).toISOString(),
        status: 'cancelled',
        items: L([['ba-13', 1], ['ba-14', 1]]),
        address: snap,
        payment: 'Thanh toán khi nhận hàng (COD)',
        sample: true,
      }),
    ],
  };
}

export function AccountProvider({ children }) {
  const [store, setStore] = useState(load);
  const [auth, setAuth] = useState(null); // { mode, after }
  const returnFocus = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {}
  }, [store]);

  const acct = store.current ? store.accounts[store.current] : null;
  const update = (fn) =>
    setStore((s) =>
      s.current ? { ...s, accounts: { ...s.accounts, [s.current]: fn(s.accounts[s.current]) } } : s
    );

  /* ---- Đăng nhập / đăng ký ---- */
  const login = (email) => {
    const key = email.trim().toLowerCase();
    if (!store.accounts[key])
      return { error: 'Chưa có tài khoản với email này. Bạn tạo tài khoản mới nhé.' };
    setStore((s) => ({ ...s, current: key }));
    return { ok: true };
  };
  const register = (name, email) => {
    const key = email.trim().toLowerCase();
    if (store.accounts[key]) return { error: 'Email này đã có tài khoản. Bạn đăng nhập nhé.' };
    const fresh = {
      user: { name: name.trim(), email: key, since: new Date().toISOString() },
      addresses: [],
      banks: [],
      orders: [],
    };
    setStore((s) => ({ current: key, accounts: { ...s.accounts, [key]: fresh } }));
    return { ok: true };
  };
  const loginDemo = () => {
    setStore((s) => ({
      current: DEMO_EMAIL,
      accounts: { ...s.accounts, [DEMO_EMAIL]: s.accounts[DEMO_EMAIL] || demoAccount() },
    }));
    return { ok: true };
  };
  const logout = () => setStore((s) => ({ ...s, current: null }));

  /* ---- Địa chỉ ---- */
  const saveAddress = (a) =>
    update((ac) => {
      let list = a.id
        ? ac.addresses.map((x) => (x.id === a.id ? { ...x, ...a, sample: false } : x))
        : [...ac.addresses, { ...a, id: rid('addr-') }];
      const target = a.id || list[list.length - 1].id;
      if (a.isDefault || list.length === 1)
        list = list.map((x) => ({ ...x, isDefault: x.id === target }));
      if (!list.some((x) => x.isDefault)) list[0] = { ...list[0], isDefault: true };
      return { ...ac, addresses: list };
    });
  const removeAddress = (id) =>
    update((ac) => {
      let list = ac.addresses.filter((x) => x.id !== id);
      if (list.length && !list.some((x) => x.isDefault)) list[0] = { ...list[0], isDefault: true };
      return { ...ac, addresses: list };
    });
  const setDefaultAddress = (id) =>
    update((ac) => ({ ...ac, addresses: ac.addresses.map((x) => ({ ...x, isDefault: x.id === id })) }));

  /* ---- Ngân hàng liên kết (chỉ giữ 4 số cuối) ---- */
  const addBank = ({ bank, holder, number, isDefault }) =>
    update((ac) => {
      const digits = number.replace(/\D/g, '');
      const item = { id: rid('bank-'), bank, holder: holder.trim().toUpperCase(), last4: digits.slice(-4) };
      let list = [...ac.banks, item];
      if (isDefault || list.length === 1) list = list.map((x) => ({ ...x, isDefault: x.id === item.id }));
      return { ...ac, banks: list };
    });
  const removeBank = (id) =>
    update((ac) => {
      let list = ac.banks.filter((x) => x.id !== id);
      if (list.length && !list.some((x) => x.isDefault)) list[0] = { ...list[0], isDefault: true };
      return { ...ac, banks: list };
    });
  const setDefaultBank = (id) =>
    update((ac) => ({ ...ac, banks: ac.banks.map((x) => ({ ...x, isDefault: x.id === id })) }));

  /* ---- Đơn hàng ---- */
  const placeOrder = ({ items, addressId, payment }) => {
    if (!acct) return null;
    const a = acct.addresses.find((x) => x.id === addressId);
    if (!a) return null;
    const order = makeOrder({
      code: rid('LUMI-').slice(0, 9),
      date: new Date().toISOString(),
      status: 'pending',
      items: items.map(({ id, name, variant, price, qty }) => ({ id, name, variant, price, qty })),
      address: { name: a.name, phone: a.phone, line: addressLine(a) },
      payment,
    });
    update((ac) => ({ ...ac, orders: [order, ...ac.orders] }));
    return order;
  };
  const cancelOrder = (code) =>
    update((ac) => ({
      ...ac,
      orders: ac.orders.map((o) => (o.code === code && o.status === 'pending' ? { ...o, status: 'cancelled' } : o)),
    }));

  /* ---- Hộp đăng nhập dùng chung ---- */
  const openAuth = (mode = 'login', after = null) => {
    returnFocus.current = document.activeElement;
    setAuth({ mode, after });
  };
  const closeAuth = (success) => {
    const after = auth && auth.after;
    setAuth(null);
    if (success) {
      if (after) setTimeout(after, 0);
      else window.location.hash = '#don-hang';
      return;
    }
    const el = returnFocus.current;
    if (el && el.focus) setTimeout(() => el.focus(), 0);
  };

  return (
    <Ctx.Provider
      value={{
        user: acct ? acct.user : null,
        addresses: acct ? acct.addresses : [],
        banks: acct ? acct.banks : [],
        orders: acct ? acct.orders : [],
        login,
        register,
        loginDemo,
        logout,
        saveAddress,
        removeAddress,
        setDefaultAddress,
        addBank,
        removeBank,
        setDefaultBank,
        placeOrder,
        cancelOrder,
        auth,
        openAuth,
        closeAuth,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAccount = () => useContext(Ctx);
