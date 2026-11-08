import React, { useEffect, useRef, useState } from 'react';
import { BRAND } from '../data.js';
import { useCart, useFocusTrap } from '../cart.jsx';
import { useAccount } from '../account.jsx';
import { IconBag, IconMenu, IconClose, IconArrowRight, IconUser } from './Icons.jsx';

/* Thứ tự navbar: Logo · Trang chủ · Giới thiệu · Sản phẩm · Giỏ hàng · Tài khoản */
const NAV = [
  { href: '#trang-chu', view: 'trang-chu', label: 'Trang chủ' },
  { href: '#gioi-thieu', view: 'gioi-thieu', label: 'Giới thiệu' },
  { href: '#san-pham', view: 'san-pham', label: 'Sản phẩm' },
];

/* 1. Thanh thông báo — đóng được, nhớ trong phiên */
export function Announcement() {
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem('lumi-ann') === '1';
    } catch {
      return false;
    }
  });
  if (hidden) return null;
  const close = () => {
    setHidden(true);
    try {
      sessionStorage.setItem('lumi-ann', '1');
    } catch {}
  };
  return (
    <div className="ann" role="region" aria-label="Thông báo khuyến mãi">
      <a className="ann__text" href="#bo-suu-tap">
        {BRAND.announcement}
        <IconArrowRight size={14} />
      </a>
      <button className="ann__close" onClick={close} aria-label="Đóng thông báo">
        <IconClose size={16} />
      </button>
    </div>
  );
}

/* 2. Header dính, trong suốt → nền mờ khi cuộn */
export function Header({ view, overHero = false }) {
  const { count, openCart } = useCart();
  const { user, openAuth } = useAccount();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const closeMenu = () => {
    setMenu(false);
    setTimeout(() => btnRef.current && btnRef.current.focus(), 0);
  };
  useFocusTrap(menu, menuRef, closeMenu);

  const given = user
    ? user.email === 'demo@example.com'
      ? 'Tài khoản'
      : user.name.trim().split(/\s+/).pop()
    : '';
  const onAccount = view === 'tai-khoan';

  return (
    <header className={'hdr' + (solid || !overHero ? ' hdr--solid' : '')}>
      <div className="hdr__inner wrap">
        <a className="wordmark" href="#trang-chu" aria-label={BRAND.name + ', trang chủ'}>
          LUMI<span>Beauty</span>
        </a>
        <nav className="hdr__nav" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} aria-current={view === n.view ? 'page' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hdr__actions">
          <button className="hdr__act" onClick={openCart} aria-label={`Giỏ hàng, ${count} sản phẩm`}>
            <span className="hdr__ico">
              <IconBag size={22} />
              <span className="bag__count" aria-hidden="true">
                {count}
              </span>
            </span>
            <span className="hdr__lbl">Giỏ hàng</span>
          </button>
          {user ? (
            <a
              className={'hdr__act' + (onAccount ? ' is-on' : '')}
              href="#don-hang"
              aria-current={onAccount ? 'page' : undefined}
              aria-label={`Tài khoản của ${user.name}`}
            >
              <span className="hdr__ico hdr__ico--user">
                <IconUser size={22} />
                <span className="hdr__dot" aria-hidden="true" />
              </span>
              <span className="hdr__lbl">{given}</span>
            </a>
          ) : (
            <button
              className="hdr__act"
              onClick={() => openAuth('login')}
              aria-haspopup="dialog"
              aria-label="Tài khoản khách hàng, đăng nhập"
            >
              <span className="hdr__ico">
                <IconUser size={22} />
              </span>
              <span className="hdr__lbl">Tài khoản</span>
            </button>
          )}
          <button
            ref={btnRef}
            className="icon-btn hdr__burger"
            aria-label="Mở menu"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(true)}
          >
            <IconMenu size={22} />
          </button>
        </div>
      </div>

      {menu && (
        <div id="mobile-menu" className="mmenu" role="dialog" aria-modal="true" aria-label="Menu" ref={menuRef}>
          <div className="mmenu__top wrap">
            <span className="wordmark">
              LUMI<span>Beauty</span>
            </span>
            <button className="icon-btn" onClick={closeMenu} aria-label="Đóng menu">
              <IconClose size={24} />
            </button>
          </div>
          <nav className="mmenu__nav wrap" aria-label="Menu di động">
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={view === n.view ? 'page' : undefined}
                onClick={() => setMenu(false)}
                style={{ '--i': i }}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="wrap mmenu__foot">
            <button
              className="btn btn--primary"
              onClick={() => {
                setMenu(false);
                openCart();
              }}
            >
              <IconBag size={18} /> Giỏ hàng ({count})
            </button>
            {user ? (
              <a className="btn btn--ghost" href="#don-hang" onClick={() => setMenu(false)}>
                <IconUser size={18} /> Tài khoản của {given}
              </a>
            ) : (
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setMenu(false);
                  openAuth('login');
                }}
              >
                <IconUser size={18} /> Đăng nhập
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
