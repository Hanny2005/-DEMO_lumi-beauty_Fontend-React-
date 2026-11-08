import React, { useEffect, useRef } from 'react';
import { PRODUCT, TICKER, formatVND, discountPct } from '../data.js';
import { IconArrowDown } from './Icons.jsx';

/* 3. Hero — khung vòm chứa chai serum, chữ LUMI cỡ lớn phía sau */
export function Hero() {
  const visual = useRef(null);
  const pct = discountPct(PRODUCT.price, PRODUCT.comparePrice);
  const img = PRODUCT.images[0];

  // Parallax nhẹ, tắt khi người dùng chọn giảm chuyển động
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        if (visual.current) visual.current.style.setProperty('--py', `${y * 0.08}px`);
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="lumi-glow" aria-labelledby="hero-title">
      <div className="hero__word" aria-hidden="true">
        LUMI
      </div>
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <p className="eyebrow">
            {PRODUCT.category} · {PRODUCT.size}
          </p>
          <h1 className="display" id="hero-title">
            Sáng mịn,
            <br />
            rạng ngời
            <em className="hero__em"> tự nhiên.</em>
          </h1>
          <p className="hero__name">{PRODUCT.name}</p>
          <p className="hero__desc">{PRODUCT.description}</p>
          <div className="price" aria-label={`Giá ${formatVND(PRODUCT.price)}`}>
            <span className="price__now">{formatVND(PRODUCT.price)}</span>
            {pct > 0 && (
              <>
                <s className="price__was">{formatVND(PRODUCT.comparePrice)}</s>
                <span className="price__tag">−{pct}%</span>
              </>
            )}
          </div>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#mua">
              Mua ngay
            </a>
            <a className="btn btn--ghost" href="#thanh-phan">
              Xem thành phần
            </a>
          </div>
        </div>

        <figure className="hero__visual" ref={visual}>
          <div className="hero__ring" aria-hidden="true" />
          <div className="arch hero__arch">
            <img
              src={img.src}
              width={img.w}
              height={img.h}
              alt={img.alt}
              fetchpriority="high"
            />
          </div>
          <figcaption className="hero__cap">
            <span>{PRODUCT.shortName}</span>
            <span>Glow Serum · Brightening · {PRODUCT.size}</span>
          </figcaption>
        </figure>
      </div>
      <a className="scroll-cue" href="#mua">
        Cuộn để khám phá <IconArrowDown size={16} />
      </a>
    </section>
  );
}

/* 4. Dải chữ chạy */
export function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="ticker" role="region" aria-label="Điểm nổi bật">
      <ul className="ticker__track">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= TICKER.length ? 'true' : undefined}>
            <span>{t}</span>
            <span className="ticker__dot" aria-hidden="true">
              ✦
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
