/* ------------------------------------------------------------------
   Đánh giá sản phẩm — BẢN XEM THỬ, lưu trên trình duyệt (localStorage).
   Khi đưa lên thật: thay bằng API máy chủ, chỉ cho khách đã mua viết đánh giá
   hoặc gắn nhãn "Đã mua hàng" dựa trên đơn hàng thật.
------------------------------------------------------------------- */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { sampleReviews } from './details.js';

const KEY = 'lumi-reviews-v1';
const Ctx = createContext(null);

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (d && typeof d === 'object' && d.byProduct) return { helpful: {}, ...d };
  } catch {}
  return { byProduct: {}, helpful: {} };
}

export function ReviewsProvider({ children }) {
  const [store, setStore] = useState(load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {}
  }, [store]);

  const reviewsFor = (pid) => {
    const mine = store.byProduct[pid] || [];
    return [...mine, ...sampleReviews(pid)].map((r) => ({
      ...r,
      helpful: r.helpful + (store.helpful[r.id] ? 1 : 0),
      votedHelpful: !!store.helpful[r.id],
    }));
  };

  const summary = (pid) => {
    const list = reviewsFor(pid);
    const dist = [0, 0, 0, 0, 0];
    list.forEach((r) => dist[5 - r.rating]++);
    const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
    return { avg, count: list.length, dist, hasSample: list.some((r) => r.sample) };
  };

  const addReview = (pid, review) =>
    setStore((s) => ({
      ...s,
      byProduct: {
        ...s.byProduct,
        [pid]: [
          { ...review, id: `${pid}-u${Date.now().toString(36)}`, date: new Date().toISOString(), helpful: 0 },
          ...(s.byProduct[pid] || []).filter((r) => r.email !== review.email),
        ],
      },
    }));

  const removeReview = (pid, rid) =>
    setStore((s) => ({
      ...s,
      byProduct: { ...s.byProduct, [pid]: (s.byProduct[pid] || []).filter((r) => r.id !== rid) },
    }));

  const toggleHelpful = (rid) =>
    setStore((s) => {
      const h = { ...s.helpful };
      if (h[rid]) delete h[rid];
      else h[rid] = true;
      return { ...s, helpful: h };
    });

  return (
    <Ctx.Provider value={{ reviewsFor, summary, addReview, removeReview, toggleHelpful, version: store }}>
      {children}
    </Ctx.Provider>
  );
}

export const useReviews = () => useContext(Ctx);

/* Sao hiển thị, hỗ trợ nửa sao */
export function Stars({ value, size = 16, label }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className="stars"
      style={{ '--sz': size + 'px' }}
      role="img"
      aria-label={label || `${value.toFixed(1)} trên 5 sao`}
    >
      <span className="stars__bg" aria-hidden="true">
        ★★★★★
      </span>
      <span className="stars__fg" style={{ width: pct + '%' }} aria-hidden="true">
        ★★★★★
      </span>
    </span>
  );
}

export function RatingLine({ pid, size = 13 }) {
  const { summary } = useReviews();
  const s = useMemo(() => summary(pid), [pid, summary]);
  if (!s.count) return <span className="rline rline--none">Chưa có đánh giá</span>;
  return (
    <span className="rline">
      <Stars value={s.avg} size={size} />
      <span className="rline__n">
        {s.avg.toFixed(1)} ({s.count})
      </span>
    </span>
  );
}
