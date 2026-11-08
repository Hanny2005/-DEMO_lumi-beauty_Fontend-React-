import React, { useState } from 'react';
import { CATALOG, CATEGORIES, BRANDS, formatVND } from '../data.js';
import { useCart } from '../cart.jsx';
import { IconBag } from './Icons.jsx';
import { RatingLine } from '../reviews.jsx';
import { SHOW_SAMPLE_REVIEWS } from '../details.js';

const MAX_QTY = 10;
const PAGE = 15;
const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || '';
const fullName = (p) => (p.brand ? `${p.brand} ${p.name}` : p.name);

/* Bộ sưu tập: lưới sản phẩm, lọc theo nhóm + thương hiệu, xem thêm theo trang */
export function Catalog() {
  const { dispatch, openCart } = useCart();
  const [cat, setCat] = useState('all');
  const [brand, setBrand] = useState('');
  const [shown, setShown] = useState(PAGE);

  const byBrand = brand ? CATALOG.filter((p) => p.brand === brand) : CATALOG;
  const list = cat === 'all' ? byBrand : byBrand.filter((p) => p.cat === cat);
  const visible = list.slice(0, shown);
  const count = (id) => (id === 'all' ? byBrand.length : byBrand.filter((p) => p.cat === id).length);

  const pickCat = (id) => {
    setCat(id);
    setShown(PAGE);
  };
  const pickBrand = (v) => {
    setBrand(v);
    setShown(PAGE);
  };

  const add = (p) => {
    dispatch({
      type: 'add',
      max: MAX_QTY,
      item: { id: p.id, name: fullName(p), variant: catLabel(p.cat), price: p.price, qty: 1 },
    });
    openCart();
  };

  return (
    <section className="cat" id="bo-suu-tap" aria-labelledby="cat-title">
      <div className="wrap">
        <div className="cat__head" data-reveal>
          <div>
            <p className="eyebrow">Sản phẩm</p>
            <h2 className="h2" id="cat-title">
              Đủ cho cả chu trình,
              <br />
              <em>từ sáng đến tối.</em>
            </h2>
          </div>
          <p className="cat__intro">
            {CATALOG.length} sản phẩm chăm sóc da, trang điểm, cơ thể và nước hoa, gồm hàng
            chính hãng từ {BRANDS.length} thương hiệu. Lọc theo nhóm hoặc thương hiệu.
          </p>
        </div>

        <div className="cat__bar">
          <div className="cat__filters" role="group" aria-label="Lọc theo nhóm sản phẩm">
            {CATEGORIES.map((c) => {
              const n = count(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  className={'chip' + (cat === c.id ? ' is-on' : '')}
                  aria-pressed={cat === c.id}
                  disabled={n === 0 && c.id !== 'all'}
                  onClick={() => pickCat(c.id)}
                >
                  {c.label}
                  <span className="chip__n">{n}</span>
                </button>
              );
            })}
          </div>
          <div className="cat__brand">
            <label htmlFor="brand-filter">Thương hiệu</label>
            <select id="brand-filter" value={brand} onChange={(e) => pickBrand(e.target.value)}>
              <option value="">Tất cả thương hiệu</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {SHOW_SAMPLE_REVIEWS && (
          <p className="cat__note">Bản demo: điểm sao đang gồm đánh giá mẫu. Bấm vào sản phẩm để xem chi tiết.</p>
        )}

        <p className="sr-only" aria-live="polite">
          Đang hiển thị {visible.length} trên {list.length} sản phẩm
        </p>

        {list.length === 0 ? (
          <div className="cat__empty">
            <p>Chưa có sản phẩm phù hợp với bộ lọc này.</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                pickCat('all');
                pickBrand('');
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <ul className="pgrid">
            {visible.map((p) => (
              <li className="pcard" key={p.id}>
                <a className="pcard__img" href={'#sp-' + p.id} tabIndex={-1} aria-hidden="true">
                  <img src={p.img} alt="" loading="lazy" />
                  <span className="pcard__cat">{catLabel(p.cat)}</span>
                </a>
                <div className="pcard__body">
                  {p.brand && <p className="pcard__brand">{p.brand}</p>}
                  <h3 className="pcard__name">
                    <a href={'#sp-' + p.id}>{p.name}</a>
                  </h3>
                  <RatingLine pid={p.id} />
                  <p className="pcard__benefits">{p.benefits.join(' · ')}</p>
                  <div className="pcard__foot">
                    <span className="pcard__price">{formatVND(p.price)}</span>
                    <button
                      type="button"
                      className="pcard__add"
                      onClick={() => add(p)}
                      aria-label={`Thêm ${fullName(p)} vào giỏ`}
                    >
                      <IconBag size={18} />
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {list.length > shown && (
          <div className="cat__more">
            <p>
              Đã xem {visible.length} / {list.length} sản phẩm
            </p>
            <button type="button" className="btn btn--ghost" onClick={() => setShown(shown + PAGE)}>
              Xem thêm {Math.min(PAGE, list.length - shown)} sản phẩm
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
