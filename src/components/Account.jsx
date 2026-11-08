import React, { useRef, useState } from 'react';
import { BANKS, imageFor, ORDER_STATUS, PROVINCES, PRODUCT, formatVND } from '../data.js';
import { useCart, useFocusTrap } from '../cart.jsx';
import { useAccount, addressLine, bankLabel, DEMO_EMAIL } from '../account.jsx';
import {
  IconBox,
  IconPin,
  IconBank,
  IconLogout,
  IconClose,
  IconPlus,
  IconChevron,
  IconBag,
} from './Icons.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(0|\+84)\d{9}$/;
const fmtDate = (iso) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
const givenName = (n) => (n || '').trim().split(/\s+/).pop();
const initials = (n) =>
  (n || '?')
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/* Ô nhập có nhãn + lỗi, dùng chung cho các form */
function Field({ id, label, error, as = 'input', children, ...rest }) {
  const Tag = as;
  return (
    <div className="acc-f">
      <label htmlFor={id}>{label}</label>
      {children || (
        <Tag
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? id + '-err' : undefined}
          {...rest}
        />
      )}
      {error && (
        <p className="acc-f__err" id={id + '-err'}>
          {error}
        </p>
      )}
    </div>
  );
}

/* Nút cần xác nhận ngay trên trang (không dùng hộp confirm của trình duyệt) */
function ConfirmButton({ label, ask, yes, onConfirm, className = 'link-btn' }) {
  const [asking, setAsking] = useState(false);
  if (!asking)
    return (
      <button type="button" className={className} onClick={() => setAsking(true)}>
        {label}
      </button>
    );
  return (
    <span className="confirm" role="group" aria-label={ask}>
      <span className="confirm__q">{ask}</span>
      <button type="button" className="link-btn link-btn--danger" onClick={onConfirm}>
        {yes}
      </button>
      <button type="button" className="link-btn" onClick={() => setAsking(false)}>
        Không
      </button>
    </span>
  );
}

/* ------------------------------------------------------------------
   Hộp đăng nhập / tạo tài khoản
------------------------------------------------------------------- */
export function AuthDialog() {
  const { auth, closeAuth, login, register, loginDemo } = useAccount();
  const ref = useRef(null);
  const [mode, setMode] = useState(auth.mode);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formErr, setFormErr] = useState('');
  useFocusTrap(true, ref, () => closeAuth(false));

  const isLogin = mode === 'login';
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: '' });
    setFormErr('');
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!isLogin && !form.name.trim()) err.name = 'Vui lòng nhập họ tên.';
    if (!EMAIL_RE.test(form.email.trim())) err.email = 'Email chưa đúng định dạng. Ví dụ: ten@gmail.com';
    if (form.password.length < 6) err.password = 'Mật khẩu cần ít nhất 6 ký tự.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const r = isLogin ? login(form.email) : register(form.name, form.email);
    if (r.error) {
      setFormErr(r.error);
      return;
    }
    closeAuth(true);
  };

  const switchMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setErrors({});
    setFormErr('');
  };

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && closeAuth(false)}>
      <div className="modal__box" role="dialog" aria-modal="true" aria-labelledby="auth-title" ref={ref}>
        <div className="modal__head">
          <h2 id="auth-title">{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</h2>
          <button className="icon-btn" onClick={() => closeAuth(false)} aria-label="Đóng">
            <IconClose size={22} />
          </button>
        </div>
        <p className="modal__lede">
          {isLogin
            ? 'Xem lịch sử mua hàng, địa chỉ và ngân hàng đã liên kết.'
            : 'Thành viên mới được giảm 20% cho đơn đầu tiên.'}
        </p>
        <form onSubmit={submit} noValidate className="acc-form">
          {!isLogin && (
            <Field id="auth-name" label="Họ và tên" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
          )}
          <Field id="auth-email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
          <Field
            id="auth-password"
            label="Mật khẩu"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={form.password}
            onChange={set('password')}
            error={errors.password}
          />
          {formErr && (
            <p className="form-err" role="alert">
              {formErr}
            </p>
          )}
          <button className="btn btn--primary btn--block" type="submit">
            {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </form>
        <div className="auth__or">
          <span>hoặc</span>
        </div>
        <button
          type="button"
          className="btn btn--ghost btn--block"
          onClick={() => {
            loginDemo();
            closeAuth(true);
          }}
        >
          Dùng tài khoản mẫu
        </button>
        <p className="modal__switch">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <button type="button" className="link-btn" onClick={switchMode}>
            {isLogin ? 'Tạo tài khoản' : 'Đăng nhập'}
          </button>
        </p>
        <p className="auth__demo">
          Bản xem thử: dữ liệu chỉ lưu trên trình duyệt này, mật khẩu không được lưu hay kiểm tra.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Trang tài khoản
------------------------------------------------------------------- */
const TABS = [
  { id: 'don-hang', label: 'Lịch sử mua hàng', short: 'Đơn hàng', icon: IconBox },
  { id: 'dia-chi', label: 'Địa chỉ', short: 'Địa chỉ', icon: IconPin },
  { id: 'ngan-hang', label: 'Ngân hàng liên kết', short: 'Ngân hàng', icon: IconBank },
];

export function AccountPage({ tab }) {
  const acc = useAccount();
  if (!acc.user) return <SignedOut />;
  const current = TABS.some((t) => t.id === tab) ? tab : 'don-hang';
  const counts = { 'don-hang': acc.orders.length, 'dia-chi': acc.addresses.length, 'ngan-hang': acc.banks.length };
  const isDemo = acc.user.email === DEMO_EMAIL;

  return (
    <section className="acct" aria-labelledby="acct-title">
      <div className="wrap acct__grid">
        <aside className="acct__side">
          <div className="acct__hello">
            <span className="acct__avatar" aria-hidden="true">
              {initials(acc.user.name)}
            </span>
            <div className="acct__who">
              <h1 id="acct-title">Xin chào, {isDemo ? 'bạn' : givenName(acc.user.name)}</h1>
              <p>{acc.user.email}</p>
              {isDemo && <span className="tag tag--sample">Tài khoản mẫu</span>}
            </div>
          </div>
          <nav className="acct__tabs" aria-label="Mục tài khoản">
            {TABS.map(({ id, label, short, icon: I }) => (
              <a key={id} href={'#' + id} aria-current={current === id ? 'page' : undefined} aria-label={label}>
                <I size={20} />
                <span className="acct__lbl">{label}</span>
                <span className="acct__short" aria-hidden="true">
                  {short}
                </span>
                <span className="acct__n">{counts[id]}</span>
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="acct__logout"
            onClick={() => {
              acc.logout();
              window.location.hash = '#trang-chu';
            }}
          >
            <IconLogout size={20} /> Đăng xuất
          </button>
        </aside>

        <div className="acct__main">
          {current === 'don-hang' && <Orders />}
          {current === 'dia-chi' && <Addresses />}
          {current === 'ngan-hang' && <Banks />}
        </div>
      </div>
    </section>
  );
}

function SignedOut() {
  const { openAuth, loginDemo } = useAccount();
  return (
    <section className="acct acct--out" aria-labelledby="acct-out-title">
      <div className="wrap">
        <div className="acct__gate">
          <p className="eyebrow">Tài khoản khách hàng</p>
          <h1 className="h2" id="acct-out-title">
            Đăng nhập để xem
            <br />
            <em>đơn hàng của bạn.</em>
          </h1>
          <p className="acct__gate-body">
            Theo dõi lịch sử mua hàng, quản lý địa chỉ giao hàng và ngân hàng liên kết ở một nơi.
          </p>
          <div className="acct__gate-ctas">
            <button className="btn btn--primary" onClick={() => openAuth('login')}>
              Đăng nhập
            </button>
            <button className="btn btn--ghost" onClick={() => openAuth('register')}>
              Tạo tài khoản
            </button>
            <button
              className="link-btn"
              onClick={() => {
                loginDemo();
                window.location.hash = '#don-hang';
              }}
            >
              Dùng tài khoản mẫu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Lịch sử mua hàng ---------------- */
const FILTERS = [
  { id: 'all', label: 'Tất cả', test: () => true },
  { id: 'open', label: 'Đang xử lý', test: (o) => o.status === 'pending' || o.status === 'shipping' },
  { id: 'done', label: 'Đã giao', test: (o) => o.status === 'done' },
  { id: 'cancelled', label: 'Đã hủy', test: (o) => o.status === 'cancelled' },
];

function Orders() {
  const { orders } = useAccount();
  const [filter, setFilter] = useState('all');
  const f = FILTERS.find((x) => x.id === filter);
  const list = orders.filter(f.test);
  const spent = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const open = orders.filter(FILTERS[1].test).length;

  return (
    <div className="pane">
      <div className="pane__head">
        <h2>Lịch sử mua hàng</h2>
      </div>
      <dl className="stats">
        <div>
          <dt>Tổng đơn</dt>
          <dd>{orders.length}</dd>
        </div>
        <div>
          <dt>Đang xử lý</dt>
          <dd>{open}</dd>
        </div>
        <div>
          <dt>Đã chi tiêu</dt>
          <dd>{formatVND(spent)}</dd>
        </div>
      </dl>

      {orders.length === 0 ? (
        <Empty
          title="Bạn chưa có đơn hàng nào"
          body="Đơn hàng sẽ hiện ở đây ngay sau khi bạn đặt từ giỏ hàng."
          cta={
            <a className="btn btn--primary" href="#san-pham">
              Xem sản phẩm
            </a>
          }
        />
      ) : (
        <>
          <div className="cat__filters" role="group" aria-label="Lọc đơn hàng theo trạng thái">
            {FILTERS.map((x) => (
              <button
                key={x.id}
                type="button"
                className={'chip' + (filter === x.id ? ' is-on' : '')}
                aria-pressed={filter === x.id}
                onClick={() => setFilter(x.id)}
              >
                {x.label}
                <span className="chip__n">{orders.filter(x.test).length}</span>
              </button>
            ))}
          </div>
          {list.length === 0 ? (
            <p className="pane__none">Không có đơn nào ở trạng thái này.</p>
          ) : (
            <ul className="orders">
              {list.map((o) => (
                <OrderCard key={o.code} o={o} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function OrderCard({ o }) {
  const { cancelOrder } = useAccount();
  const { dispatch, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const st = ORDER_STATUS[o.status];
  const qty = o.items.reduce((s, i) => s + i.qty, 0);

  const buyAgain = () => {
    o.items.forEach((i) =>
      dispatch({
        type: 'add',
        max: PRODUCT.maxQty,
        item: { id: i.id, name: i.name, variant: i.variant, price: i.price, qty: i.qty },
      })
    );
    openCart();
  };

  return (
    <li className="order">
      <div className="order__top">
        <div className="order__id">
          <p className="order__code">
            {o.code}
            {o.sample && <span className="tag tag--sample">Mẫu</span>}
          </p>
          <p className="order__date">{fmtDate(o.date)}</p>
        </div>
        <span className={'pill pill--' + st.tone}>{st.label}</span>
      </div>

      <div className="order__mid">
        <ul className="order__thumbs" aria-label={`${qty} sản phẩm`}>
          {o.items.slice(0, 4).map((i) => (
            <li key={i.id}>
              <img src={imageFor(i.id)} alt={i.name} loading="lazy" />
              {i.qty > 1 && <span className="order__qty">×{i.qty}</span>}
            </li>
          ))}
          {o.items.length > 4 && <li className="order__more">+{o.items.length - 4}</li>}
        </ul>
        <div className="order__total">
          <span>{qty} sản phẩm</span>
          <strong>{formatVND(o.total)}</strong>
        </div>
      </div>

      <div className="order__actions">
        <button
          type="button"
          className="link-btn order__toggle"
          aria-expanded={open}
          aria-controls={'od-' + o.code}
          onClick={() => setOpen(!open)}
        >
          {open ? 'Ẩn chi tiết' : 'Xem chi tiết'} <IconChevron size={16} />
        </button>
        <div className="order__btns">
          {o.status === 'pending' && (
            <ConfirmButton
              label="Hủy đơn"
              ask="Hủy đơn này?"
              yes="Hủy đơn"
              onConfirm={() => cancelOrder(o.code)}
            />
          )}
          {(o.status === 'done' || o.status === 'cancelled') && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={buyAgain}>
              <IconBag size={16} /> Mua lại
            </button>
          )}
        </div>
      </div>

      <div className="order__detail" id={'od-' + o.code} hidden={!open}>
        <ul className="od__items">
          {o.items.map((i) => (
            <li key={i.id}>
              <span className="od__name">
                {i.name}
                <small>
                  {i.variant} · {formatVND(i.price)} × {i.qty}
                </small>
              </span>
              <span className="od__price">{formatVND(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="od__sum">
          <div>
            <dt>Tạm tính</dt>
            <dd>{formatVND(o.subtotal)}</dd>
          </div>
          <div>
            <dt>Phí giao hàng</dt>
            <dd>{o.shipping ? formatVND(o.shipping) : 'Miễn phí'}</dd>
          </div>
          <div className="od__grand">
            <dt>Tổng cộng</dt>
            <dd>{formatVND(o.total)}</dd>
          </div>
        </dl>
        <div className="od__meta">
          <div>
            <h3>Giao đến</h3>
            <p>
              {o.address.name} · {o.address.phone}
            </p>
            <p>{o.address.line}</p>
          </div>
          <div>
            <h3>Thanh toán</h3>
            <p>{o.payment}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

function Empty({ title, body, cta }) {
  return (
    <div className="empty">
      <p className="empty__title">{title}</p>
      <p>{body}</p>
      {cta}
    </div>
  );
}

/* ---------------- Địa chỉ ---------------- */
function Addresses() {
  const { addresses, removeAddress, setDefaultAddress } = useAccount();
  const [editing, setEditing] = useState(null); // null | 'new' | address

  return (
    <div className="pane">
      <div className="pane__head">
        <h2>Địa chỉ giao hàng</h2>
        {!editing && (
          <button className="btn btn--primary btn--sm" onClick={() => setEditing('new')}>
            <IconPlus size={16} /> Thêm địa chỉ
          </button>
        )}
      </div>

      {editing && (
        <AddressForm initial={editing === 'new' ? null : editing} onDone={() => setEditing(null)} />
      )}

      {addresses.length === 0 && !editing ? (
        <Empty
          title="Chưa có địa chỉ nào"
          body="Thêm địa chỉ để đặt hàng nhanh hơn ở lần sau."
          cta={
            <button className="btn btn--primary" onClick={() => setEditing('new')}>
              Thêm địa chỉ
            </button>
          }
        />
      ) : (
        <ul className="cards">
          {addresses.map((a) => (
            <li className={'card' + (a.isDefault ? ' card--default' : '')} key={a.id}>
              <div className="card__top">
                <p className="card__title">{a.name}</p>
                <span className="card__tags">
                  {a.sample && <span className="tag tag--sample">Mẫu</span>}
                  {a.isDefault && <span className="tag">Mặc định</span>}
                </span>
              </div>
              <p className="card__line">{a.phone}</p>
              <p className="card__line">{addressLine(a)}</p>
              <div className="card__actions">
                <button type="button" className="link-btn" onClick={() => setEditing(a)}>
                  Sửa
                </button>
                {!a.isDefault && (
                  <button type="button" className="link-btn" onClick={() => setDefaultAddress(a.id)}>
                    Đặt làm mặc định
                  </button>
                )}
                <ConfirmButton label="Xóa" ask="Xóa địa chỉ này?" yes="Xóa" onConfirm={() => removeAddress(a.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AddressForm({ initial, onDone }) {
  const { saveAddress } = useAccount();
  const [f, setF] = useState(
    initial || { name: '', phone: '', street: '', ward: '', province: '', isDefault: false }
  );
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: '' });
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!f.name.trim()) err.name = 'Vui lòng nhập tên người nhận.';
    if (!PHONE_RE.test(f.phone.replace(/[\s.]/g, ''))) err.phone = 'Số điện thoại chưa đúng. Ví dụ: 0901234567';
    if (!f.street.trim()) err.street = 'Vui lòng nhập số nhà, tên đường.';
    if (!f.ward.trim()) err.ward = 'Vui lòng nhập phường hoặc xã.';
    if (!f.province) err.province = 'Vui lòng chọn tỉnh hoặc thành phố.';
    setErrors(err);
    if (Object.keys(err).length) return;
    saveAddress({ ...f, name: f.name.trim(), street: f.street.trim(), ward: f.ward.trim() });
    onDone();
  };

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h3 className="panel__title">{initial ? 'Sửa địa chỉ' : 'Địa chỉ mới'}</h3>
      <div className="form-grid">
        <Field id="ad-name" label="Tên người nhận" autoComplete="name" value={f.name} onChange={set('name')} error={errors.name} />
        <Field id="ad-phone" label="Số điện thoại" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} error={errors.phone} />
        <div className="form-grid__wide">
          <Field id="ad-street" label="Số nhà, tên đường" autoComplete="address-line1" value={f.street} onChange={set('street')} error={errors.street} />
        </div>
        <Field id="ad-ward" label="Phường / Xã" value={f.ward} onChange={set('ward')} error={errors.ward} />
        <Field id="ad-province" label="Tỉnh / Thành phố" error={errors.province}>
          <select
            id="ad-province"
            value={f.province}
            onChange={set('province')}
            aria-invalid={!!errors.province}
            aria-describedby={errors.province ? 'ad-province-err' : undefined}
          >
            <option value="">Chọn tỉnh / thành phố</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <label className="check">
        <input id="ad-default" type="checkbox" checked={!!f.isDefault} onChange={set('isDefault')} />
        Đặt làm địa chỉ mặc định
      </label>
      <div className="panel__btns">
        <button className="btn btn--primary" type="submit">
          Lưu địa chỉ
        </button>
        <button className="btn btn--ghost" type="button" onClick={onDone}>
          Hủy
        </button>
      </div>
    </form>
  );
}

/* ---------------- Ngân hàng liên kết ---------------- */
function Banks() {
  const { banks, removeBank, setDefaultBank } = useAccount();
  const [adding, setAdding] = useState(false);

  return (
    <div className="pane">
      <div className="pane__head">
        <h2>Ngân hàng liên kết</h2>
        {!adding && (
          <button className="btn btn--primary btn--sm" onClick={() => setAdding(true)}>
            <IconPlus size={16} /> Liên kết ngân hàng
          </button>
        )}
      </div>
      <p className="pane__note">
        Bản xem thử: trang chỉ lưu tên ngân hàng, tên chủ tài khoản và 4 số cuối trên trình duyệt
        này. Khi đưa lên thật, việc liên kết cần đi qua cổng thanh toán của ngân hàng.
      </p>

      {adding && <BankForm onDone={() => setAdding(false)} />}

      {banks.length === 0 && !adding ? (
        <Empty
          title="Chưa liên kết ngân hàng nào"
          body="Liên kết tài khoản để chọn nhanh khi thanh toán chuyển khoản."
          cta={
            <button className="btn btn--primary" onClick={() => setAdding(true)}>
              Liên kết ngân hàng
            </button>
          }
        />
      ) : (
        <ul className="cards">
          {banks.map((b) => (
            <li className={'card bankcard' + (b.isDefault ? ' card--default' : '')} key={b.id}>
              <div className="card__top">
                <p className="card__title">
                  <IconBank size={20} /> {b.bank}
                </p>
                <span className="card__tags">
                  {b.sample && <span className="tag tag--sample">Mẫu</span>}
                  {b.isDefault && <span className="tag">Mặc định</span>}
                </span>
              </div>
              <p className="bankcard__num" aria-label={`Tài khoản kết thúc bằng ${b.last4}`}>
                •••• •••• {b.last4}
              </p>
              <p className="card__line">{b.holder}</p>
              <div className="card__actions">
                {!b.isDefault && (
                  <button type="button" className="link-btn" onClick={() => setDefaultBank(b.id)}>
                    Đặt làm mặc định
                  </button>
                )}
                <ConfirmButton
                  label="Hủy liên kết"
                  ask="Hủy liên kết ngân hàng này?"
                  yes="Hủy liên kết"
                  onConfirm={() => removeBank(b.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BankForm({ onDone }) {
  const { addBank } = useAccount();
  const [f, setF] = useState({ bank: '', holder: '', number: '', isDefault: false });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    let v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (k === 'number') v = v.replace(/[^\d\s]/g, '');
    if (k === 'holder') v = v.toUpperCase();
    setF({ ...f, [k]: v });
    if (errors[k]) setErrors({ ...errors, [k]: '' });
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    const digits = f.number.replace(/\D/g, '');
    if (!f.bank) err.bank = 'Vui lòng chọn ngân hàng.';
    if (!f.holder.trim()) err.holder = 'Vui lòng nhập tên chủ tài khoản.';
    if (digits.length < 6 || digits.length > 19) err.number = 'Số tài khoản gồm 6 đến 19 chữ số.';
    setErrors(err);
    if (Object.keys(err).length) return;
    addBank(f);
    onDone();
  };

  return (
    <form className="panel" onSubmit={submit} noValidate autoComplete="off">
      <h3 className="panel__title">Liên kết ngân hàng</h3>
      <div className="form-grid">
        <Field id="bk-bank" label="Ngân hàng" error={errors.bank}>
          <select
            id="bk-bank"
            value={f.bank}
            onChange={set('bank')}
            aria-invalid={!!errors.bank}
            aria-describedby={errors.bank ? 'bk-bank-err' : undefined}
          >
            <option value="">Chọn ngân hàng</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field id="bk-holder" label="Tên chủ tài khoản" placeholder="NGUYEN VAN A" value={f.holder} onChange={set('holder')} error={errors.holder} />
        <div className="form-grid__wide">
          <Field
            id="bk-number"
            label="Số tài khoản"
            inputMode="numeric"
            autoComplete="off"
            value={f.number}
            onChange={set('number')}
            error={errors.number}
          />
        </div>
      </div>
      <label className="check">
        <input id="bk-default" type="checkbox" checked={f.isDefault} onChange={set('isDefault')} />
        Dùng làm tài khoản mặc định khi thanh toán
      </label>
      <div className="panel__btns">
        <button className="btn btn--primary" type="submit">
          Liên kết
        </button>
        <button className="btn btn--ghost" type="button" onClick={onDone}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export { bankLabel };
