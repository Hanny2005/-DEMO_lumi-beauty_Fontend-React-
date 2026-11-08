import React, { useState } from 'react';
import {
  BRAND,
  FEATURES,
  FEATURE_IMAGES,
  STORY_IMAGE,
  FAQ,
} from '../data.js';
import { IconArrowUpRight, IconArrowRight, IconPlus } from './Icons.jsx';

/* 6. Thành phần / công nghệ */
export function Features() {
  return (
    <section className="feat" id="thanh-phan" aria-labelledby="feat-title">
      <div className="wrap feat__grid">
        <figure className="feat__media" data-reveal>
          <div className="feat__img">
            <img
              src={FEATURE_IMAGES.main}
              width="550"
              height="384"
              alt="Người mẫu áp chai LUMI Glow lên má"
              loading="lazy"
            />
          </div>
          <div className="feat__inset">
            <img src={FEATURE_IMAGES.inset} alt="Cận cảnh lớp gel trong của serum" loading="lazy" />
          </div>
          <figcaption className="meta">Kết cấu gel trong · thấm nhanh</figcaption>
        </figure>

        <div className="feat__copy">
          <p className="eyebrow">Thành phần</p>
          <h2 className="h2" id="feat-title">
            Ba hoạt chất quen thuộc,
            <br />
            <em className="feat__em">một làn da dễ chịu.</em>
          </h2>
          <p className="feat__lede">
            Không chạy theo danh sách dài. LUMI Glow chọn những thành phần đã quen thuộc với
            người chăm da, phối trong một kết cấu đủ nhẹ để dùng hai lần mỗi ngày.
          </p>
          <ol className="frows">
            {FEATURES.map((f, i) => (
              <li className="frow" key={f.title} data-reveal style={{ '--d': `${i * 80}ms` }}>
                <span className="frow__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
                <IconArrowUpRight className="frow__icon" size={20} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 8. Câu chuyện thương hiệu */
export function Story() {
  return (
    <section className="story" id="cau-chuyen" aria-labelledby="story-title">
      <div className="wrap story__grid">
        <figure className="story__media" data-reveal>
          <div className="arch arch--tall">
            <img src={STORY_IMAGE} width="1000" height="1000" alt="Người mẫu nháy mắt, cầm chai LUMI Glow trước nền hoa" loading="lazy" />
          </div>
          <figcaption className="meta meta--light">
            <span>Chiến dịch Rạng ngời</span>
            <span>LUMI Glow · 30ml</span>
          </figcaption>
        </figure>
        <div className="story__copy">
          <p className="eyebrow eyebrow--light">Về LUMI Beauty</p>
          <h1 className="story__quote" id="story-title">
            Đẹp là khi bạn thấy <em>dễ chịu</em> trong chính làn da mình.
          </h1>
          <p className="story__body">
            Chúng tôi tin chăm da nên nhẹ nhàng: vài bước đơn giản, kết cấu dễ chịu, thành phần
            ghi rõ ràng. LUMI Glow dành cho những buổi sáng vội và những buổi tối muốn chậm lại
            một chút.
          </p>
          <a className="btn btn--light" href="#bo-anh">
            Xem bộ sưu tập Pink Bloom <IconArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* 12. Câu hỏi thường gặp */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="hoi-dap" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <div>
          <p className="eyebrow">Hỏi đáp</p>
          <h2 className="h2" id="faq-title">
            Trước khi
            <br />
            <em>bạn chọn.</em>
          </h2>
        </div>
        <div className="acc">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div className={'acc__item' + (on ? ' is-on' : '')} key={i}>
                <h3>
                  <button
                    id={`faq-b-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                  >
                    {f.q}
                    <IconPlus size={18} />
                  </button>
                </h3>
                <div
                  id={`faq-p-${i}`}
                  role="region"
                  aria-labelledby={`faq-b-${i}`}
                  hidden={!on}
                  className="acc__panel"
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 13. Kết trang + đăng ký nhận tin */
export function Closing() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ type: '', msg: '' });

  const submit = async (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!ok) {
      setState({ type: 'err', msg: 'Email chưa đúng định dạng. Ví dụ: ten@gmail.com' });
      return;
    }
    if (BRAND.newsletterEndpoint) {
      try {
        const r = await fetch(BRAND.newsletterEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
        if (!r.ok) throw new Error();
      } catch {
        setState({ type: 'err', msg: 'Chưa gửi được. Bạn thử lại sau ít phút nhé.' });
        return;
      }
    }
    setState({ type: 'ok', msg: 'Cảm ơn bạn đã đăng ký!' });
    setEmail('');
  };

  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="wrap">
        <h2 className="closing__slogan" id="closing-title">
          Rạng ngời <em>theo cách</em>
          <br />
          của bạn.
        </h2>
        <div className="closing__row">
          <a className="btn btn--primary" href="#mua">
            Mua ngay
          </a>
          <form className="news" onSubmit={submit} noValidate>
            <label htmlFor="news-email">{BRAND.newsletterOffer}</label>
            <div className="news__field">
              <input
                id="news-email"
                type="email"
                autoComplete="email"
                placeholder="Email của bạn"
                value={email}
                aria-invalid={state.type === 'err'}
                aria-describedby="news-msg"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state.type) setState({ type: '', msg: '' });
                }}
              />
              <button className="btn btn--dark" type="submit">
                Đăng ký
              </button>
            </div>
            <p id="news-msg" className={'news__msg ' + state.type} role="status">
              {state.msg}
            </p>
            {!BRAND.newsletterEndpoint && (
              <p className="news__demo">Bản xem thử: biểu mẫu chưa kết nối hệ thống email.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* 14. Footer */
export function Footer() {
  const c = BRAND.contact;
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div className="ftr__brand">
          <a className="wordmark wordmark--light" href="#trang-chu">
            LUMI<span>Beauty</span>
          </a>
          <p>{BRAND.slogan}</p>
        </div>
        <nav aria-label="Sản phẩm">
          <h3>Sản phẩm</h3>
          <a href="#flash-sale">Flash Sale</a>
          <a href="#mua">LUMI Glow</a>
          <a href="#bo-suu-tap">Tất cả sản phẩm</a>
          <a href="#bo-anh">Bộ sưu tập Pink Bloom</a>
          <a href="#thanh-phan">Thành phần</a>
        </nav>
        <nav aria-label="Hỗ trợ">
          <h3>Hỗ trợ</h3>
          <a href="#hoi-dap">Câu hỏi thường gặp</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
        <nav aria-label="Chính sách">
          <h3>Chính sách</h3>
          <a href="#mua">Giao hàng</a>
          <a href="#mua">Đổi trả</a>
          <a href="#mua">Bảo mật thông tin</a>
        </nav>
        <div>
          <h3>Liên hệ</h3>
          <p>Hotline: {c.hotline}</p>
          <p>Zalo: {c.zalo}</p>
          <p>Email: {c.email}</p>
          <p>Địa chỉ: {c.address}</p>
          <p className="ftr__social">
            {BRAND.socials.map((s) => (
              <a key={s.label} href={s.href}>
                {s.label}
              </a>
            ))}
          </p>
        </div>
      </div>
      <div className="wrap ftr__base">
        <p>© {new Date().getFullYear()} {BRAND.name}. Bảo lưu mọi quyền.</p>
        <p>Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p>
      </div>
    </footer>
  );
}
