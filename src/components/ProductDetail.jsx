import React, { useState } from 'react';
import { formatVND, discountPct } from '../data.js';
import { getProduct, getDetail, variantPrice, catLabel, relatedTo, SKIN_TYPES, SHOW_SAMPLE_REVIEWS } from '../details.js';
import { useCart } from '../cart.jsx';
import { useAccount } from '../account.jsx';
import { useReviews, Stars, RatingLine } from '../reviews.jsx';
import { IconBag, IconArrowRight, IconMinus, IconPlus } from './Icons.jsx';

const MAX_QTY = 10;
const fullName = (p) => (p.brand && !p.name.includes(p.brand.split(' ')[0]) ? `${p.brand} ${p.name}` : p.name);
const fmtDay = (iso) => new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));
const skinLabel = (id) => SKIN_TYPES.find((s) => s.id === id)?.label || '';

export function ProductDetail({ id }) {
  const p = getProduct(id);
  const d = getDetail(id);
  if (!p || !d) return <NotFound />;
  return (
    <>
      <Overview key={id} p={p} d={d} />
      <ReviewsBlock key={'r-' + id} p={p} d={d} />
      <Related p={p} />
    </>
  );
}

function NotFound() {
  return (
    <section className="pd">
      <div className="wrap empty">
        <p className="empty__title">Không tìm thấy sản phẩm</p>
        <a className="btn btn--primary" href="#bo-suu-tap">
          Xem tất cả sản phẩm
        </a>
      </div>
    </section>
  );
}

/* ---------------- Phần trên: ảnh + chọn phân loại + mua ---------------- */
function Overview({ p, d }) {
  const { dispatch, openCart } = useCart();
  const { summary } = useReviews();
  const opts = d.variants ? d.variants.options : [];
  const [optKey, setOptKey] = useState(opts[0] ? opts[0].key : '');
  const [qty, setQty] = useState(1);
  const opt = opts.find((o) => o.key === optKey);
  const price = variantPrice(p.price, opt);
  const compare = p.comparePrice ? variantPrice(p.comparePrice, opt) : 0;
  const pct = discountPct(price, compare);
  const s = summary(p.id);
  const clamp = (n) => Math.max(1, Math.min(MAX_QTY, n));

  const add = () => {
    dispatch({
      type: 'add',
      max: MAX_QTY,
      item: {
        id: opt ? `${p.id}:${opt.key}` : p.id,
        name: fullName(p),
        variant: opt ? `${d.variants.label}: ${opt.name}` : catLabel(p.cat),
        price,
        qty,
      },
    });
    openCart();
  };

  const specRows = [
    ['Kết cấu', d.texture],
    ...(opt && d.variants.type === 'size' ? [[d.variants.label, opt.name]] : []),
    ...Object.entries(d.specs),
  ];

  return (
    <section className="pd" aria-labelledby="pd-title">
      <div className="wrap">
        <nav className="crumbs" aria-label="Đường dẫn">
          <a href="#san-pham">Sản phẩm</a>
          <span aria-hidden="true">/</span>
          <a href="#bo-suu-tap">{catLabel(p.cat)}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.name}</span>
        </nav>

        <div className="pd__grid">
          <figure className="pd__media">
            <div className="pd__img">
              <img src={p.img} alt={p.alt} />
              {pct > 0 && <span className="badge">−{pct}%</span>}
              {opt && opt.hex && (
                <span className="pd__swatch-tag" key={opt.key}>
                  <i style={{ background: opt.hex }} aria-hidden="true" />
                  {opt.name}
                </span>
              )}
            </div>
          </figure>

          <div className="pd__info">
            {p.brand && <p className="pd__brand">{p.brand}</p>}
            <h1 className="pd__title" id="pd-title">
              {p.name}
            </h1>
            <a className="pd__rating" href="#danh-gia-sp">
              <RatingLine pid={p.id} size={16} />
              {s.count > 0 && <span className="pd__rating-link">Xem đánh giá</span>}
            </a>
            <p className="pd__benefits">{p.benefits.join(' · ')}</p>

            <div className="price price--lg">
              <span className="price__now">{formatVND(price)}</span>
              {pct > 0 && (
                <>
                  <s className="price__was">{formatVND(compare)}</s>
                  <span className="price__tag">−{pct}%</span>
                </>
              )}
            </div>

            {d.variants && (
              <fieldset className="opt">
                <legend>
                  {d.variants.label}: <span className="opt__val">{opt && opt.name}</span>
                </legend>
                <div className={'chips' + (d.variants.type === 'shade' ? ' chips--shade' : '')} role="radiogroup" aria-label={d.variants.label}>
                  {opts.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      role="radio"
                      aria-checked={o.key === optKey}
                      className={'chip' + (o.key === optKey ? ' is-on' : '') + (o.hex ? ' chip--shade' : '')}
                      onClick={() => setOptKey(o.key)}
                    >
                      {o.hex && <i className="dot" style={{ background: o.hex }} aria-hidden="true" />}
                      {o.name}
                      {d.variants.type === 'size' && o.mult !== 1 && (
                        <span className="chip__n">{formatVND(variantPrice(p.price, o))}</span>
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="buy__row">
              <div className="qty" role="group" aria-label="Số lượng">
                <button type="button" onClick={() => setQty(clamp(qty - 1))} disabled={qty <= 1} aria-label="Giảm số lượng">
                  <IconMinus size={16} />
                </button>
                <input
                  id="pd-qty"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max={MAX_QTY}
                  value={qty}
                  aria-label="Số lượng"
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    if (!Number.isNaN(n)) setQty(clamp(n));
                  }}
                />
                <button type="button" onClick={() => setQty(clamp(qty + 1))} disabled={qty >= MAX_QTY} aria-label="Tăng số lượng">
                  <IconPlus size={16} />
                </button>
              </div>
              <button className="btn btn--primary btn--grow" onClick={add}>
                <IconBag size={18} /> Thêm vào giỏ
              </button>
            </div>

            {/* Thanh kết cấu lỏng ↔ đặc */}
            <div className="pd__block">
              <h2 className="pd__h">Kết cấu</h2>
              <p className="pd__texture-name">{d.texture}</p>
              {d.level !== null && d.level !== undefined && (
                <div className="tex" role="img" aria-label={`Kết cấu ${d.texture}, mức ${d.level} trên thang từ lỏng đến đặc`}>
                  <div className="tex__bar">
                    <span className="tex__mark" style={{ left: `${d.level}%` }} />
                  </div>
                  <div className="tex__ends">
                    <span>Lỏng</span>
                    <span>Đặc</span>
                  </div>
                </div>
              )}
            </div>

            {/* Loại da phù hợp */}
            {d.skin && (
              <div className="pd__block">
                <h2 className="pd__h">Phù hợp với</h2>
                <ul className="skins">
                  {SKIN_TYPES.map((t) => {
                    const ok = d.skin.includes(t.id);
                    return (
                      <li key={t.id} className={ok ? 'is-ok' : 'is-no'}>
                        <span aria-hidden="true">{ok ? '✓' : '–'}</span>
                        {t.label}
                        <span className="sr-only">{ok ? ': phù hợp' : ': không khuyến nghị'}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="pd__block">
              <h2 className="pd__h">Thông tin sản phẩm</h2>
              <dl className="specs">
                {specRows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pd__block">
              <h2 className="pd__h">Cách dùng</h2>
              <p className="pd__how">{d.howTo}</p>
            </div>

            <p className="pd__note">
              Thông tin kết cấu và loại da là dữ liệu tham khảo theo loại sản phẩm. Vui lòng đọc kỹ
              nhãn sản phẩm và thử trên vùng da nhỏ trước khi dùng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Đánh giá ---------------- */
const SORTS = [
  { id: 'new', label: 'Mới nhất', fn: (a, b) => new Date(b.date) - new Date(a.date) },
  { id: 'high', label: 'Điểm cao', fn: (a, b) => b.rating - a.rating },
  { id: 'low', label: 'Điểm thấp', fn: (a, b) => a.rating - b.rating },
  { id: 'helpful', label: 'Hữu ích', fn: (a, b) => b.helpful - a.helpful },
];

function ReviewsBlock({ p, d }) {
  const { reviewsFor, summary, toggleHelpful, removeReview } = useReviews();
  const { user, orders, openAuth } = useAccount();
  const [star, setStar] = useState(0);
  const [sort, setSort] = useState('new');
  const [writing, setWriting] = useState(false);
  const [shown, setShown] = useState(5);

  const all = reviewsFor(p.id);
  const s = summary(p.id);
  const list = all.filter((r) => !star || r.rating === star).sort(SORTS.find((x) => x.id === sort).fn);
  const mine = user ? all.find((r) => r.email === user.email) : null;
  const bought = !!user && orders.some((o) => o.status === 'done' && o.items.some((i) => i.id.split(':')[0] === p.id));

  return (
    <section className="rvs" id="danh-gia-sp" aria-labelledby="rvs-title">
      <div className="wrap">
        <div className="rvs__head">
          <h2 className="h2" id="rvs-title">
            Đánh giá <em>từ khách hàng</em>
          </h2>
          {SHOW_SAMPLE_REVIEWS && s.hasSample && (
            <p className="rvs__sample-note">
              Bản demo: các đánh giá có nhãn <span className="tag tag--sample">Mẫu</span> chỉ để xem bố
              cục, sẽ được tắt khi trang đưa lên thật.
            </p>
          )}
        </div>

        <div className="rvs__grid">
          <aside className="rvs__sum">
            {s.count ? (
              <>
                <p className="rvs__avg">
                  <strong>{s.avg.toFixed(1)}</strong>
                  <span>/5</span>
                </p>
                <Stars value={s.avg} size={22} />
                <p className="rvs__count">{s.count} đánh giá</p>
                <ul className="dist">
                  {s.dist.map((n, i) => {
                    const st = 5 - i;
                    const on = star === st;
                    return (
                      <li key={st}>
                        <button
                          type="button"
                          className={'dist__row' + (on ? ' is-on' : '')}
                          aria-pressed={on}
                          onClick={() => {
                            setStar(on ? 0 : st);
                            setShown(5);
                          }}
                          disabled={!n}
                          aria-label={`${st} sao: ${n} đánh giá. Lọc theo ${st} sao`}
                        >
                          <span className="dist__st">{st} ★</span>
                          <span className="dist__bar">
                            <span style={{ transform: `scaleX(${s.count ? n / s.count : 0})` }} />
                          </span>
                          <span className="dist__n">{n}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="rvs__none">Chưa có đánh giá nào. Hãy là người đầu tiên.</p>
            )}

            <div className="rvs__cta">
              {!user ? (
                <button className="btn btn--primary btn--block" onClick={() => openAuth('login', () => setWriting(true))}>
                  Đăng nhập để viết đánh giá
                </button>
              ) : mine ? (
                <p className="rvs__mine">Bạn đã đánh giá sản phẩm này.</p>
              ) : (
                !writing && (
                  <button className="btn btn--primary btn--block" onClick={() => setWriting(true)}>
                    Viết đánh giá
                  </button>
                )
              )}
            </div>
          </aside>

          <div className="rvs__main">
            {writing && user && !mine && (
              <ReviewForm p={p} d={d} user={user} bought={bought} onDone={() => setWriting(false)} />
            )}

            {all.length > 0 && (
              <div className="rvs__tools">
                <p className="rvs__showing">
                  {star ? `${list.length} đánh giá ${star} sao` : `${list.length} đánh giá`}
                  {star > 0 && (
                    <button className="link-btn" onClick={() => setStar(0)}>
                      Bỏ lọc
                    </button>
                  )}
                </p>
                <label className="rvs__sort">
                  Sắp xếp
                  <select id="rv-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    {SORTS.map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <ul className="rlist">
              {list.slice(0, shown).map((r) => (
                <li className="rcard" key={r.id}>
                  <div className="rcard__top">
                    <span className="rcard__avatar" aria-hidden="true">
                      {r.name.trim()[0]}
                    </span>
                    <div className="rcard__who">
                      <p className="rcard__name">
                        {r.name}
                        {r.sample && <span className="tag tag--sample">Mẫu</span>}
                        {r.verified && <span className="tag tag--ok">✓ Đã mua hàng</span>}
                      </p>
                      <p className="rcard__meta">
                        <Stars value={r.rating} size={14} label={`${r.rating} trên 5 sao`} />
                        <span>{fmtDay(r.date)}</span>
                      </p>
                    </div>
                  </div>
                  {(r.variant || r.skin) && (
                    <p className="rcard__attrs">
                      {r.variant && <span>Phân loại: {r.variant}</span>}
                      {r.skin && <span>Loại da: {skinLabel(r.skin)}</span>}
                    </p>
                  )}
                  <p className="rcard__text">{r.text}</p>
                  <div className="rcard__foot">
                    <button
                      type="button"
                      className={'helpful' + (r.votedHelpful ? ' is-on' : '')}
                      aria-pressed={r.votedHelpful}
                      onClick={() => toggleHelpful(r.id)}
                    >
                      Hữu ích ({r.helpful})
                    </button>
                    {user && r.email === user.email && (
                      <button className="link-btn" onClick={() => removeReview(p.id, r.id)}>
                        Xóa đánh giá của tôi
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {list.length > shown && (
              <div className="cat__more">
                <button className="btn btn--ghost" onClick={() => setShown(shown + 5)}>
                  Xem thêm đánh giá
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewForm({ p, d, user, bought, onDone }) {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [skin, setSkin] = useState('');
  const [variant, setVariant] = useState(d.variants ? d.variants.options[0].name : '');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const WORDS = ['', 'Không hài lòng', 'Tạm được', 'Bình thường', 'Hài lòng', 'Rất hài lòng'];

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!rating) err.rating = 'Vui lòng chọn số sao.';
    if (text.trim().length < 10) err.text = 'Nội dung cần ít nhất 10 ký tự.';
    setErrors(err);
    if (Object.keys(err).length) return;
    addReview(p.id, {
      name: user.name,
      email: user.email,
      rating,
      skin: skin || null,
      variant: variant || null,
      text: text.trim(),
      verified: bought,
      sample: false,
    });
    onDone();
  };

  return (
    <form className="panel rform" onSubmit={submit} noValidate>
      <h3 className="panel__title">Đánh giá {p.name}</h3>
      {bought ? (
        <p className="rform__ok">Bạn đã mua sản phẩm này, đánh giá sẽ có nhãn “Đã mua hàng”.</p>
      ) : (
        <p className="rform__hint">Đánh giá của khách đã nhận hàng sẽ có nhãn “Đã mua hàng”.</p>
      )}

      <fieldset className="rate">
        <legend>Bạn chấm mấy sao?</legend>
        <div className="rate__stars" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={(hover || rating) >= n ? 'is-on' : ''} onMouseEnter={() => setHover(n)}>
              <input
                type="radio"
                name="rf-rating"
                id={'rf-r' + n}
                value={n}
                checked={rating === n}
                onChange={() => {
                  setRating(n);
                  setErrors({ ...errors, rating: '' });
                }}
              />
              <span aria-hidden="true">★</span>
              <span className="sr-only">{n} sao</span>
            </label>
          ))}
          <span className="rate__word">{WORDS[hover || rating]}</span>
        </div>
        {errors.rating && <p className="acc-f__err">{errors.rating}</p>}
      </fieldset>

      <div className="form-grid">
        {d.variants && (
          <div className="acc-f">
            <label htmlFor="rf-variant">{d.variants.label} đã dùng</label>
            <select id="rf-variant" value={variant} onChange={(e) => setVariant(e.target.value)}>
              {d.variants.options.map((o) => (
                <option key={o.key} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {d.skin && (
          <div className="acc-f">
            <label htmlFor="rf-skin">Loại da của bạn</label>
            <select id="rf-skin" value={skin} onChange={(e) => setSkin(e.target.value)}>
              <option value="">Không chọn</option>
              {SKIN_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="acc-f form-grid__wide">
          <label htmlFor="rf-text">Nhận xét</label>
          <textarea
            id="rf-text"
            rows="4"
            placeholder="Kết cấu, mùi hương, cảm nhận trên da..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (errors.text) setErrors({ ...errors, text: '' });
            }}
            aria-invalid={!!errors.text}
            aria-describedby={errors.text ? 'rf-text-err' : undefined}
          />
          {errors.text && (
            <p className="acc-f__err" id="rf-text-err">
              {errors.text}
            </p>
          )}
        </div>
      </div>
      <div className="panel__btns">
        <button className="btn btn--primary" type="submit">
          Gửi đánh giá
        </button>
        <button className="btn btn--ghost" type="button" onClick={onDone}>
          Hủy
        </button>
      </div>
    </form>
  );
}

/* ---------------- Sản phẩm liên quan ---------------- */
function Related({ p }) {
  const list = relatedTo(p);
  if (!list.length) return null;
  return (
    <section className="related" aria-labelledby="rel-title">
      <div className="wrap">
        <div className="related__head">
          <h2 className="h2" id="rel-title">
            Có thể bạn <em>cũng thích</em>
          </h2>
          <a className="link-arrow" href="#bo-suu-tap">
            Tất cả sản phẩm <IconArrowRight size={16} />
          </a>
        </div>
        <ul className="pgrid pgrid--4">
          {list.map((x) => (
            <li className="pcard" key={x.id}>
              <a className="pcard__link" href={'#sp-' + x.id}>
                <div className="pcard__img">
                  <img src={x.img} alt={x.alt} loading="lazy" />
                </div>
                <div className="pcard__body">
                  {x.brand && <p className="pcard__brand">{x.brand}</p>}
                  <h3 className="pcard__name">{x.name}</h3>
                  <RatingLine pid={x.id} />
                  <span className="pcard__price">{formatVND(x.price)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
