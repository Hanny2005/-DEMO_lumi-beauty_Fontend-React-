import React, { useEffect, useRef, useState } from 'react';
import { BRAND, PRODUCT, PAYMENT_METHODS, imageFor, formatVND, discountPct } from '../data.js';
import { RatingLine } from '../reviews.jsx';
import { useCart, useFocusTrap } from '../cart.jsx';
import { useAccount, addressLine, bankLabel, shippingFor } from '../account.jsx';
import {
  IconMinus,
  IconPlus,
  IconTruck,
  IconShield,
  IconReturn,
  IconChat,
  IconClose,
  IconBag,
  IconArrowRight,
} from './Icons.jsx';

const PERKS = [
  { icon: IconTruck, title: 'Miễn phí giao', sub: `Đơn từ ${formatVND(BRAND.freeShippingThreshold)}` },
  { icon: IconShield, title: 'Chính hãng', sub: 'Cam kết từ LUMI' },
  { icon: IconReturn, title: 'Đổi trả 7 ngày', sub: 'Khi lỗi hoặc giao sai' },
  { icon: IconChat, title: 'Hỗ trợ 24/7', sub: 'Tư vấn chọn sản phẩm' },
];

function QtyStepper({ value, onChange, max, id, label = 'Số lượng' }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Giảm số lượng"
      >
        <IconMinus size={16} />
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min="1"
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(n);
        }}
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Tăng số lượng"
      >
        <IconPlus size={16} />
      </button>
    </div>
  );
}

/* 9. Khu vực mua hàng */
export function Purchase() {
  const { dispatch, openCart } = useCart();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const buyRef = useRef(null);
  const pct = discountPct(PRODUCT.price, PRODUCT.comparePrice);
  const clamp = (n) => Math.max(1, Math.min(PRODUCT.maxQty, n));

  const add = (thenOpen = true) => {
    dispatch({
      type: 'add',
      max: PRODUCT.maxQty,
      item: {
        id: PRODUCT.id,
        name: PRODUCT.name,
        variant: PRODUCT.size,
        price: PRODUCT.price,
        qty,
      },
    });
    if (thenOpen) openCart();
  };

  // Thanh mua dính đáy trên điện thoại khi nút mua đã cuộn khỏi màn hình
  useEffect(() => {
    if (!buyRef.current || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(buyRef.current);
    return () => io.disconnect();
  }, []);

  const current = PRODUCT.images[img];

  return (
    <section className="buy" id="mua" aria-labelledby="buy-title">
      <div className="wrap buy__grid">
        <div className="buy__media" data-reveal>
          <div className="buy__main">
            {pct > 0 && <span className="badge">−{pct}%</span>}
            <img key={img} src={current.src} width={current.w} height={current.h} alt={current.alt} />
          </div>
          <div className="buy__thumbs" role="radiogroup" aria-label="Chọn ảnh sản phẩm">
            {PRODUCT.images.map((im, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={img === i}
                className={'thumb' + (img === i ? ' is-on' : '')}
                onClick={() => setImg(i)}
                aria-label={`Ảnh ${i + 1}: ${im.alt}`}
              >
                <img src={im.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="buy__panel">
          <p className="eyebrow">{PRODUCT.category}</p>
          <h2 className="buy__title" id="buy-title">
            {PRODUCT.name}
          </h2>
          <p className="buy__desc">{PRODUCT.description}</p>
          <a className="buy__rating" href={'#sp-' + PRODUCT.id}>
            <RatingLine pid={PRODUCT.id} size={15} />
            <span className="pd__rating-link">Xem chi tiết & đánh giá</span>
          </a>

          <div className="price price--lg">
            <span className="price__now">{formatVND(PRODUCT.price)}</span>
            {pct > 0 && (
              <>
                <s className="price__was">{formatVND(PRODUCT.comparePrice)}</s>
                <span className="price__tag">−{pct}%</span>
              </>
            )}
          </div>

          <fieldset className="opt">
            <legend>
              Dung tích <span className="opt__val">{PRODUCT.size}</span>
            </legend>
            <div className="chips">
              <button type="button" className="chip is-on" aria-pressed="true">
                {PRODUCT.size}
              </button>
            </div>
          </fieldset>

          <p className={'stock' + (PRODUCT.inStock ? '' : ' stock--out')}>
            <span className="stock__dot" aria-hidden="true" />
            {PRODUCT.inStock ? 'Còn hàng' : 'Tạm hết hàng'}
          </p>

          <div className="buy__row" ref={buyRef}>
            <QtyStepper id="buy-qty" value={qty} onChange={(n) => setQty(clamp(n))} max={PRODUCT.maxQty} />
            <button
              className="btn btn--primary btn--grow"
              onClick={() => add(true)}
              disabled={!PRODUCT.inStock}
            >
              <IconBag size={18} /> Thêm vào giỏ
            </button>
          </div>
          <button
            className="btn btn--dark btn--block"
            onClick={() => add(true)}
            disabled={!PRODUCT.inStock}
          >
            Mua ngay <IconArrowRight size={18} />
          </button>

          <ul className="perks">
            {PERKS.map(({ icon: I, title, sub }) => (
              <li key={title}>
                <I size={22} />
                <span>
                  <strong>{title}</strong>
                  {sub}
                </span>
              </li>
            ))}
          </ul>

          <p className="pay">
            <span>Thanh toán:</span>
            {PAYMENT_METHODS.map((p) => (
              <span className="pay__tag" key={p}>
                {p}
              </span>
            ))}
          </p>

          <div className="details">
            {PRODUCT.details.map((d, i) => (
              <details key={d.title} open={i === 0}>
                <summary>
                  {d.title}
                  <IconPlus size={16} />
                </summary>
                <p>{d.body}</p>
              </details>
            ))}
            <p className="details__legal">Số phiếu công bố: {BRAND.notificationNumber}</p>
          </div>
        </div>
      </div>

      <div className={'mbar' + (showBar ? ' is-on' : '')} aria-hidden={!showBar}>
        <div className="mbar__price">
          <span>{PRODUCT.shortName}</span>
          <strong>{formatVND(PRODUCT.price)}</strong>
        </div>
        <button className="btn btn--primary" onClick={() => add(true)} tabIndex={showBar ? 0 : -1}>
          Thêm vào giỏ
        </button>
      </div>
    </section>
  );
}

/* 10. Giỏ hàng dạng ngăn kéo */
export function CartDrawer() {
  const { items, dispatch, subtotal, open, openCart, closeCart } = useCart();
  const { user, addresses, banks, openAuth, placeOrder } = useAccount();
  const ref = useRef(null);
  const [addrId, setAddrId] = useState('');
  const [pay, setPay] = useState('cod');
  const [placed, setPlaced] = useState(null);
  useFocusTrap(open, ref, closeCart);
  useEffect(() => {
    if (!open) setPlaced(null);
  }, [open]);

  const remain = Math.max(0, BRAND.freeShippingThreshold - subtotal);
  const ratio = Math.min(1, subtotal / BRAND.freeShippingThreshold);
  const imgFor = (it) => imageFor(it.id);
  const fee = shippingFor(subtotal);
  const defAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const chosenAddr = addresses.some((a) => a.id === addrId) ? addrId : defAddr && defAddr.id;

  const payLabel = () => {
    if (pay === 'cod') return 'Thanh toán khi nhận hàng (COD)';
    if (pay === 'transfer') return 'Chuyển khoản ngân hàng';
    const b = banks.find((x) => x.id === pay);
    return b ? bankLabel(b) : 'Thanh toán khi nhận hàng (COD)';
  };

  const place = () => {
    const o = placeOrder({ items, addressId: chosenAddr, payment: payLabel() });
    if (o) {
      setPlaced(o);
      dispatch({ type: 'clear' });
    }
  };

  const loginFirst = () => {
    closeCart();
    setTimeout(() => openAuth('login', openCart), 20);
  };

  return (
    <div className={'drawer-wrap' + (open ? ' is-open' : '')} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={closeCart} />
      {open && (
        <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" ref={ref}>
          <div className="drawer__head">
            <h2 id="cart-title">Giỏ hàng</h2>
            <button className="icon-btn" onClick={closeCart} aria-label="Đóng giỏ hàng">
              <IconClose size={22} />
            </button>
          </div>

          {placed ? (
            <div className="drawer__empty drawer__done" role="status">
              <p className="drawer__empty-title">Đặt hàng thành công</p>
              <p>
                Mã đơn <strong>{placed.code}</strong> · {formatVND(placed.total)}
              </p>
              <p>Bạn có thể theo dõi đơn trong mục Lịch sử mua hàng.</p>
              <a className="btn btn--primary" href="#don-hang" onClick={closeCart}>
                Xem đơn hàng
              </a>
              <button className="link-btn" onClick={closeCart}>
                Tiếp tục mua sắm
              </button>
              <p className="sub__demo">Bản xem thử: đơn chỉ lưu trên trình duyệt này, chưa gửi đến cửa hàng.</p>
            </div>
          ) : items.length === 0 ? (
            <div className="drawer__empty">
              <p className="drawer__empty-title">Giỏ hàng đang trống</p>
              <p>Thêm LUMI Glow để bắt đầu chu trình dưỡng sáng của bạn.</p>
              <a className="btn btn--primary" href="#bo-suu-tap" onClick={closeCart}>
                Xem sản phẩm
              </a>
            </div>
          ) : (
            <>
              <div className="ship" aria-live="polite">
                <p>
                  {remain > 0 ? (
                    <>
                      Mua thêm <strong>{formatVND(remain)}</strong> để được miễn phí giao hàng
                    </>
                  ) : (
                    <>Đơn của bạn được miễn phí giao hàng</>
                  )}
                </p>
                <div className="ship__bar">
                  <span style={{ transform: `scaleX(${ratio})` }} />
                </div>
              </div>

              <ul className="lines">
                {items.map((it) => (
                  <li className="line" key={it.id}>
                    <img src={imgFor(it)} alt="" width="72" height="80" />
                    <div className="line__info">
                      <p className="line__name">{it.name}</p>
                      <p className="line__var">{it.variant}</p>
                      <QtyStepper
                        id={'cart-qty-' + it.id}
                        label={`Số lượng ${it.name}`}
                        value={it.qty}
                        max={PRODUCT.maxQty}
                        onChange={(n) => dispatch({ type: 'qty', id: it.id, qty: n, max: PRODUCT.maxQty })}
                      />
                    </div>
                    <div className="line__end">
                      <p className="line__price">{formatVND(it.price * it.qty)}</p>
                      <button className="link-btn" onClick={() => dispatch({ type: 'remove', id: it.id })}>
                        Xóa
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="drawer__foot">
                <p className="sub">
                  <span>Tạm tính</span>
                  <strong>{formatVND(subtotal)}</strong>
                </p>
                {BRAND.checkoutUrl ? (
                  <>
                    <p className="sub__note">Phí vận chuyển được tính khi thanh toán</p>
                    <a className="btn btn--primary btn--block" href={BRAND.checkoutUrl}>
                      Thanh toán
                    </a>
                  </>
                ) : !user ? (
                  <>
                    <p className="sub__note">Đăng nhập để chọn địa chỉ giao hàng và lưu đơn vào lịch sử mua hàng.</p>
                    <button className="btn btn--primary btn--block" onClick={loginFirst}>
                      Đăng nhập để đặt hàng
                    </button>
                  </>
                ) : addresses.length === 0 ? (
                  <>
                    <p className="sub__note">Thêm địa chỉ giao hàng trước khi đặt.</p>
                    <a className="btn btn--primary btn--block" href="#dia-chi" onClick={closeCart}>
                      Thêm địa chỉ giao hàng
                    </a>
                  </>
                ) : (
                  <>
                    <p className="sub sub--sm">
                      <span>Phí giao hàng</span>
                      <span>{fee ? formatVND(fee) : 'Miễn phí'}</span>
                    </p>
                    <div className="co">
                      <label htmlFor="co-addr">Giao đến</label>
                      <select id="co-addr" value={chosenAddr} onChange={(e) => setAddrId(e.target.value)}>
                        {addresses.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name} · {addressLine(a)}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="co-pay">Thanh toán</label>
                      <select id="co-pay" value={pay} onChange={(e) => setPay(e.target.value)}>
                        <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                        <option value="transfer">Chuyển khoản ngân hàng</option>
                        {banks.map((b) => (
                          <option key={b.id} value={b.id}>
                            {bankLabel(b)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="sub sub--total">
                      <span>Tổng cộng</span>
                      <strong>{formatVND(subtotal + fee)}</strong>
                    </p>
                    <button className="btn btn--primary btn--block" onClick={place}>
                      Đặt hàng
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </aside>
      )}
    </div>
  );
}
