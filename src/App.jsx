import React, { useEffect, useLayoutEffect, useState } from 'react';
import { CartProvider, useReveal } from './cart.jsx';
import { Announcement, Header } from './components/Header.jsx';
import { Hero, Ticker } from './components/Hero.jsx';
import { Gallery } from './components/Gallery.jsx';
import { Features, Story, Faq, Closing, Footer } from './components/Sections.jsx';
import { Purchase, CartDrawer } from './components/Purchase.jsx';
import { Catalog } from './components/Catalog.jsx';
import { FlashSale, Intro, Contact } from './components/Home.jsx';
import { AccountProvider, useAccount } from './account.jsx';
import { AccountPage, AuthDialog } from './components/Account.jsx';
import { ReviewsProvider } from './reviews.jsx';
import { ProductDetail } from './components/ProductDetail.jsx';
import { getProduct } from './details.js';

/* ------------------------------------------------------------------
   Điều hướng theo hash: #trang-chu, #gioi-thieu, #san-pham.
   Link tới một section (vd. #mua, #hoi-dap) tự mở đúng trang rồi cuộn tới.
------------------------------------------------------------------- */
const VIEWS = {
  'trang-chu': 'Trang chủ',
  'gioi-thieu': 'Giới thiệu',
  'san-pham': 'Sản phẩm',
  'tai-khoan': 'Tài khoản',
};
// Các mục trong trang tài khoản, mỗi mục có link riêng
const ACCOUNT_TABS = ['don-hang', 'dia-chi', 'ngan-hang'];
const SECTION_VIEW = {
  'flash-sale': 'trang-chu',
  'gioi-thieu-nhanh': 'trang-chu',
  'hoi-dap': 'trang-chu',
  'lien-he': 'trang-chu',
  'cau-chuyen': 'gioi-thieu',
  'bo-anh': 'gioi-thieu',
  'thanh-phan': 'gioi-thieu',
  'lumi-glow': 'san-pham',
  mua: 'san-pham',
  'bo-suu-tap': 'san-pham',
};

function parseHash() {
  const h = decodeURIComponent(window.location.hash.slice(1));
  if (VIEWS[h]) return { view: h, section: null, tab: null };
  if (ACCOUNT_TABS.includes(h)) return { view: 'tai-khoan', section: null, tab: h };
  // Trang chi tiết: #sp-<mã sản phẩm>, ví dụ #sp-br-01
  if (h.startsWith('sp-') && getProduct(h.slice(3))) return { view: 'chi-tiet', section: null, tab: h.slice(3) };
  if (SECTION_VIEW[h]) return { view: SECTION_VIEW[h], section: h, tab: null };
  return { view: 'trang-chu', section: null, tab: null };
}

function useRoute() {
  const [route, setRoute] = useState(() => ({ ...parseHash(), n: 0 }));
  useEffect(() => {
    const onHash = () => setRoute({ ...parseHash(), n: Date.now() });
    // Bấm lại đúng link đang mở: hash không đổi nên tự xử lý
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a && a.getAttribute('href') === window.location.hash) {
        e.preventDefault();
        onHash();
      }
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return route;
}

function Page() {
  const route = useRoute();
  const { view, section, tab } = route;
  const { auth } = useAccount();
  useReveal(view);

  useEffect(() => {
    const name = view === 'chi-tiet' ? getProduct(tab).name : VIEWS[view];
    document.title = `${name} · LUMI Beauty`;
  }, [view, tab]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (section) {
      requestAnimationFrame(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [route.n, view, section]);

  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Bỏ qua tới nội dung chính
      </a>
      <Announcement />
      <Header view={view === 'chi-tiet' ? 'san-pham' : view} overHero={view === 'san-pham'} />
      <main id="main" key={view === 'chi-tiet' ? 'sp-' + tab : view} tabIndex={-1}>
        {view === 'trang-chu' && (
          <>
            <Intro />
            <FlashSale />
            <Faq />
            <Contact />
          </>
        )}
        {view === 'gioi-thieu' && (
          <>
            <Story />
            <Ticker />
            <Gallery />
            <Features />
            <Closing />
          </>
        )}
        {view === 'tai-khoan' && <AccountPage tab={tab} />}
        {view === 'chi-tiet' && <ProductDetail id={tab} />}
        {view === 'san-pham' && (
          <>
            <Hero />
            <Purchase />
            <Catalog />
          </>
        )}
      </main>
      <Footer />
      <CartDrawer />
      {auth && <AuthDialog key={auth.mode} />}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AccountProvider>
        <ReviewsProvider>
          <Page />
        </ReviewsProvider>
      </AccountProvider>
    </CartProvider>
  );
}
