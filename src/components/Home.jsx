import React, { useEffect, useState } from 'react';
import {
  BRAND,
  CATALOG,
  CATEGORIES,
  FLASH_SALE,
  STORE_FACTS,
  STORY_IMAGE,
  formatVND,
  discountPct,
} from '../data.js';
import { useCart } from '../cart.jsx';
import { IconBag, IconArrowRight } from './Icons.jsx';

const pad = (n) => String(n).padStart(2, '0');
const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || '';

function saleEnd(now) {
  if (FLASH_SALE.endsAt) return new Date(FLASH_SALE.endsAt).getTime();
  const d = new Date(now);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

/* Flash Sale — đếm ngược và danh sách sản phẩm giảm giá */
export function FlashSale() {
  const { dispatch, openCart } = useCart();
  const now = useNow();
  const left = Math.max(0, saleEnd(now) - now);
  const ended = left === 0;
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);

  const items = FLASH_SALE.items
    .map((it) => {
      const p = CATALOG.find((x) => x.id === it.id);
      return p ? { ...p, ...it, original: p.price } : null;
    })
    .filter(Boolean);

  const add = (p) => {
    dispatch({
      type: 'add',
      max: Math.min(10, p.limit),
      item: {
        id: p.id + '-fs',
        name: (p.brand ? p.brand + ' ' : '') + p.name,
        variant: 'Flash Sale',
        price: p.salePrice,
        qty: 1,
      },
    });
    openCart();
  };

  return (
    <section className="fs" id="flash-sale" aria-labelledby="fs-title">
      <div className="wrap">
        <div className="fs__head">
          <div>
            <p className="eyebrow">Ưu đãi giới hạn</p>
            <h2 className="fs__title" id="fs-title">
              Flash <em>Sale</em>
            </h2>
          </div>
          <div className="fs__clock">
            <p className="fs__clock-label">{ended ? 'Đợt ưu đãi đã kết thúc' : 'Kết thúc sau'}</p>
            <div className="fs__digits" role="timer" aria-label={`Còn ${h} giờ ${m} phút`}>
              {[
                [h, 'giờ'],
                [m, 'phút'],
                [s, 'giây'],
              ].map(([v, u], i) => (
                <React.Fragment key={u}>
                  {i > 0 && (
                    <span className="fs__colon" aria-hidden="true">
                      :
                    </span>
                  )}
                  <span className="fs__unit">
                    <strong>{pad(v)}</strong>
                    <small>{u}</small>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <ul className="fs__grid">
          {items.map((p) => {
            const pct = discountPct(p.salePrice, p.original);
            return (
              <li className="fcard" key={p.id}>
                <a className="fcard__img" href={'#sp-' + p.id} tabIndex={-1} aria-hidden="true">
                  <img src={p.img} alt="" loading="lazy" />
                  <span className="fcard__pct">−{pct}%</span>
                </a>
                <div className="fcard__body">
                  <p className="fcard__brand">{p.brand || catLabel(p.cat)}</p>
                  <h3 className="fcard__name">
                    <a href={'#sp-' + p.id}>{p.name}</a>
                  </h3>
                  <p className="fcard__price">
                    <strong>{formatVND(p.salePrice)}</strong>
                    <s>{formatVND(p.original)}</s>
                  </p>
                  <p className="fcard__limit">Giới hạn {p.limit} suất</p>
                  <button
                    type="button"
                    className="btn btn--primary btn--block fcard__add"
                    onClick={() => add(p)}
                    disabled={ended}
                    aria-label={`Thêm ${p.name} giá Flash Sale vào giỏ`}
                  >
                    <IconBag size={18} /> {ended ? 'Đã kết thúc' : 'Thêm vào giỏ'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="fs__foot">
          <a className="btn btn--ghost" href="#bo-suu-tap">
            Xem tất cả {STORE_FACTS.products} sản phẩm <IconArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* Giới thiệu sơ lược về cửa hàng */
export function Intro() {
  const facts = [
    { n: STORE_FACTS.products, l: 'sản phẩm' },
    { n: STORE_FACTS.brands, l: 'thương hiệu' },
    { n: '0₫', l: 'phí giao cho đơn từ 499K' },
    { n: '7 ngày', l: 'đổi trả khi lỗi' },
  ];
  return (
    <section className="intro" id="gioi-thieu-nhanh" aria-labelledby="intro-title">
      <div className="wrap intro__grid">
        <figure className="intro__media" data-reveal>
          <div className="arch">
            <img src={STORY_IMAGE} width="1000" height="1000" alt="Người mẫu cầm chai serum LUMI Glow" loading="lazy" />
          </div>
        </figure>
        <div className="intro__copy">
          <p className="eyebrow">Về LUMI Beauty</p>
          <h1 className="h2" id="intro-title">
            Mỹ phẩm chính hãng,
            <br />
            <em>chọn lọc kỹ cho bạn.</em>
          </h1>
          <p className="intro__body">
            LUMI Beauty là cửa hàng mỹ phẩm trực tuyến. Bên cạnh dòng chăm sóc da của riêng
            LUMI, chúng tôi bán hàng chính hãng từ các thương hiệu Hàn, Nhật, Pháp và Mỹ. Mỗi
            sản phẩm đều ghi rõ công dụng và giá, để bạn dễ chọn đúng thứ làn da cần.
          </p>
          <dl className="intro__facts">
            {facts.map((f) => (
              <div key={f.l}>
                <dt>{f.n}</dt>
                <dd>{f.l}</dd>
              </div>
            ))}
          </dl>
          <div className="intro__ctas">
            <a className="btn btn--primary" href="#san-pham">
              Xem sản phẩm
            </a>
            <a className="btn btn--ghost" href="#gioi-thieu">
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Liên hệ — thông tin + form (bản xem thử nếu chưa có contactEndpoint) */
export function Contact() {
  const c = BRAND.contact;
  const [form, setForm] = useState({ name: '', reach: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', msg: '' });

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: '' });
    if (status.msg) setStatus({ type: '', msg: '' });
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Vui lòng nhập họ tên.';
    const reach = form.reach.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(reach);
    const isPhone = /^(\+?84|0)\d{9,10}$/.test(reach.replace(/[\s.]/g, ''));
    if (!isEmail && !isPhone) err.reach = 'Nhập email hoặc số điện thoại hợp lệ. Ví dụ: 0901234567';
    if (form.message.trim().length < 10) err.message = 'Nội dung cần ít nhất 10 ký tự.';
    setErrors(err);
    if (Object.keys(err).length) return;
    if (BRAND.contactEndpoint) {
      try {
        const r = await fetch(BRAND.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!r.ok) throw new Error();
        setStatus({ type: 'ok', msg: 'Đã gửi. LUMI sẽ phản hồi bạn sớm.' });
        setForm({ name: '', reach: '', message: '' });
      } catch {
        setStatus({ type: 'err', msg: 'Chưa gửi được. Bạn thử lại sau ít phút hoặc gọi hotline nhé.' });
      }
      return;
    }
    setStatus({ type: 'demo', msg: 'Bản xem thử: form chưa kết nối máy chủ, tin nhắn chưa được gửi đi.' });
  };

  const rows = [
    { label: 'Hotline', value: c.hotline },
    { label: 'Zalo', value: c.zalo },
    { label: 'Email', value: c.email },
    { label: 'Địa chỉ', value: c.address },
    { label: 'Giờ làm việc', value: c.hours },
  ];

  return (
    <section className="contact" id="lien-he" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div className="contact__info">
          <p className="eyebrow eyebrow--light">Liên hệ</p>
          <h2 className="contact__title" id="contact-title">
            Cần tư vấn?
            <br />
            <em>Nhắn cho LUMI.</em>
          </h2>
          <dl className="contact__list">
            {rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="contact__social">
            {BRAND.socials.map((s) => (
              <a key={s.label} href={s.href}>
                {s.label}
              </a>
            ))}
          </p>
        </div>

        <form className="contact__form" onSubmit={submit} noValidate>
          {[
            ['name', 'Họ và tên', 'input', 'name'],
            ['reach', 'Email hoặc số điện thoại', 'input', 'email'],
            ['message', 'Bạn cần LUMI hỗ trợ gì?', 'textarea'],
          ].map(([k, label, tag, auto]) => (
            <div className="acc-f" key={k}>
              <label htmlFor={'ct-' + k}>{label}</label>
              {tag === 'input' ? (
                <input
                  id={'ct-' + k}
                  autoComplete={auto}
                  value={form[k]}
                  onChange={set(k)}
                  aria-invalid={!!errors[k]}
                  aria-describedby={errors[k] ? 'ct-' + k + '-err' : undefined}
                />
              ) : (
                <textarea
                  id={'ct-' + k}
                  rows="4"
                  value={form[k]}
                  onChange={set(k)}
                  aria-invalid={!!errors[k]}
                  aria-describedby={errors[k] ? 'ct-' + k + '-err' : undefined}
                />
              )}
              {errors[k] && (
                <p className="acc-f__err" id={'ct-' + k + '-err'}>
                  {errors[k]}
                </p>
              )}
            </div>
          ))}
          <button className="btn btn--primary btn--block" type="submit">
            Gửi tin nhắn
          </button>
          <p className={'contact__status ' + status.type} role="status">
            {status.msg}
          </p>
        </form>
      </div>
    </section>
  );
}
