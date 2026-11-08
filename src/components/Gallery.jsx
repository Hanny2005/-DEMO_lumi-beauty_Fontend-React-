import React, { useRef, useState, useEffect } from 'react';
import { GALLERY } from '../data.js';
import { useFocusTrap } from '../cart.jsx';
import { IconArrowLeft, IconArrowRight, IconClose, IconExpand } from './Icons.jsx';

/* 5. Bộ ảnh — kéo bằng chuột, vuốt trên điện thoại, phím mũi tên */
export function Gallery() {
  const track = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: 0 });
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState(-1);
  const lastTrigger = useRef(null);

  const step = () => {
    const card = track.current?.querySelector('.g-card');
    return card ? card.getBoundingClientRect().width + 20 : 320;
  };
  const go = (dir) => track.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  const onScroll = () => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setProgress(max > 0 ? t.scrollLeft / max : 0);
  };
  useEffect(onScroll, []);

  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: 0 };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 4 && !dragging) setDragging(true);
    track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    setTimeout(() => setDragging(false), 0);
  };
  const onClickCapture = (e) => {
    if (drag.current.moved > 4) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = 0;
    }
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const open = (i, e) => {
    lastTrigger.current = e.currentTarget;
    setLightbox(i);
  };
  const close = () => {
    setLightbox(-1);
    setTimeout(() => lastTrigger.current && lastTrigger.current.focus(), 0);
  };

  return (
    <section className="gallery" id="bo-anh" aria-labelledby="gallery-title">
      <div className="wrap gallery__head" data-reveal>
        <div>
          <p className="eyebrow">Bộ ảnh LUMI Glow</p>
          <h2 className="h2" id="gallery-title">
            Một giọt serum,
            <br />
            <em>nhiều khoảnh khắc.</em>
          </h2>
        </div>
        <p className="gallery__intro">
          Từ chai thủy tinh hồng đến lớp gel trong trên mu bàn tay. Kéo hoặc vuốt để xem, chạm
          vào ảnh để phóng to.
        </p>
      </div>

      <div
        ref={track}
        className={'g-track' + (dragging ? ' is-dragging' : '')}
        tabIndex={0}
        role="region"
        aria-roledescription="băng chuyền"
        aria-label="Bộ ảnh sản phẩm. Dùng phím mũi tên trái phải để chuyển ảnh."
        onScroll={onScroll}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={onClickCapture}
        onKeyDown={onKey}
      >
        {GALLERY.map((g, i) => (
          <figure className="g-card" key={i}>
            <button
              className="g-card__btn"
              onClick={(e) => open(i, e)}
              aria-label={`Phóng to ảnh: ${g.caption}`}
            >
              <img
                src={g.src}
                width={g.w}
                height={g.h}
                alt={g.alt}
                loading="lazy"
                draggable="false"
              />
              <span className="g-card__zoom" aria-hidden="true">
                <IconExpand size={16} />
              </span>
            </button>
            <figcaption>
              <span className="g-card__num">{String(i + 1).padStart(2, '0')}</span>
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="wrap g-controls">
        <div className="g-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
        <div className="g-btns">
          <button className="icon-btn icon-btn--line" onClick={() => go(-1)} aria-label="Ảnh trước">
            <IconArrowLeft />
          </button>
          <button className="icon-btn icon-btn--line" onClick={() => go(1)} aria-label="Ảnh tiếp theo">
            <IconArrowRight />
          </button>
        </div>
      </div>

      {lightbox >= 0 && (
        <Lightbox index={lightbox} setIndex={setLightbox} onClose={close} items={GALLERY} />
      )}
    </section>
  );
}

export function Lightbox({ index, setIndex, onClose, items }) {
  const ref = useRef(null);
  useFocusTrap(true, ref, onClose);
  const n = items.length;
  const item = items[index];
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowRight') setIndex((index + 1) % n);
      if (e.key === 'ArrowLeft') setIndex((index - 1 + n) % n);
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [index]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Ảnh ${index + 1} trên ${n}: ${item.caption}`}
      ref={ref}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className="icon-btn lightbox__close" onClick={onClose} aria-label="Đóng ảnh phóng to">
        <IconClose size={24} />
      </button>
      <figure className="lightbox__fig">
        <img src={item.src} alt={item.alt} />
        <figcaption>
          {index + 1} / {n} · {item.caption}
        </figcaption>
      </figure>
      <button
        className="icon-btn lightbox__nav lightbox__prev"
        onClick={() => setIndex((index - 1 + n) % n)}
        aria-label="Ảnh trước"
      >
        <IconArrowLeft size={24} />
      </button>
      <button
        className="icon-btn lightbox__nav lightbox__next"
        onClick={() => setIndex((index + 1) % n)}
        aria-label="Ảnh tiếp theo"
      >
        <IconArrowRight size={24} />
      </button>
    </div>
  );
}
