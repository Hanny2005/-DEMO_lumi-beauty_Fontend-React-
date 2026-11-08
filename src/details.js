/* ------------------------------------------------------------------
   Thông tin chi tiết theo LOẠI sản phẩm (kết cấu, loại da, phân loại...).
   Đây là DỮ LIỆU MẪU theo loại, không phải thông số của từng hãng.
   Trước khi đưa lên thật: đối chiếu với nhãn sản phẩm và sửa trong KIND_OF
   hoặc OVERRIDES bên dưới.
------------------------------------------------------------------- */
import { CATALOG, CATEGORIES, PRODUCT } from './data.js';

export const SKIN_TYPES = [
  { id: 'dau', label: 'Da dầu' },
  { id: 'kho', label: 'Da khô' },
  { id: 'hon-hop', label: 'Da hỗn hợp' },
  { id: 'nhay-cam', label: 'Da nhạy cảm' },
  { id: 'thuong', label: 'Da thường' },
];
const ALL = ['dau', 'kho', 'hon-hop', 'nhay-cam', 'thuong'];

const sizes = (a, b, m = 1.6) => ({
  label: 'Dung tích',
  type: 'size',
  options: [
    { key: a.replace(/\s/g, ''), name: a, mult: 1 },
    { key: b.replace(/\s/g, ''), name: b, mult: m },
  ],
});
const shades = (list) => ({
  label: 'Màu sắc',
  type: 'shade',
  options: list.map(([name, hex]) => ({ key: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, hex, mult: 1 })),
});

const LIP_SHADES = shades([
  ['01 Hồng đào', '#e98a86'],
  ['02 Đỏ cam', '#e0533f'],
  ['03 Hồng mận', '#b54a62'],
  ['04 Đỏ rượu', '#8c2236'],
]);
const BASE_SHADES = shades([
  ['01 Sáng ngà', '#f1d3bd'],
  ['02 Tự nhiên', '#e3bb9b'],
  ['03 Trung bình', '#cf9f7d'],
]);

/* group dùng để chọn mẫu câu đánh giá */
export const KINDS = {
  cleanser: {
    group: 'skin', texture: 'Gel tạo bọt nhẹ', level: 45, skin: ALL, variants: sizes('100ml', '150ml', 1.35),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Làm sạch' },
    howTo: 'Làm ướt mặt, lấy một lượng bằng hạt đậu, tạo bọt rồi massage nhẹ 30–60 giây. Rửa sạch lại với nước.',
  },
  'cleanser-foam': {
    group: 'skin', texture: 'Kem tạo bọt', level: 60, skin: ['dau', 'hon-hop', 'thuong'], variants: sizes('100ml', '150ml', 1.35),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Làm sạch' },
    howTo: 'Tạo bọt với một ít nước trong lòng bàn tay, massage nhẹ khắp mặt rồi rửa sạch.',
  },
  micellar: {
    group: 'skin', texture: 'Nước lỏng', level: 5, skin: ALL, variants: sizes('250ml', '400ml', 1.45),
    specs: { 'Thời điểm dùng': 'Tối, hoặc sau khi trang điểm', 'Bước trong chu trình': 'Tẩy trang' },
    howTo: 'Thấm ướt bông tẩy trang, áp lên da vài giây rồi lau nhẹ. Lặp lại tới khi bông sạch.',
  },
  toner: {
    group: 'skin', texture: 'Nước lỏng', level: 10, skin: ALL, variants: sizes('150ml', '250ml', 1.5),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Cân bằng da' },
    howTo: 'Sau khi làm sạch, cho ra lòng bàn tay hoặc bông, vỗ nhẹ lên mặt cho thấm.',
  },
  essence: {
    group: 'skin', texture: 'Nước sệt nhẹ', level: 20, skin: ALL, variants: sizes('75ml', '160ml', 1.9),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Dưỡng (sau toner)' },
    howTo: 'Cho vài giọt ra lòng bàn tay, ấn nhẹ lên da tới khi thấm.',
  },
  serum: {
    group: 'skin', texture: 'Gel lỏng', level: 30, skin: ALL, variants: sizes('30ml', '50ml', 1.55),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Đặc trị (sau toner)' },
    howTo: 'Lấy 2–3 giọt, thoa đều mặt và cổ. Ban ngày luôn dùng kem chống nắng ở bước cuối.',
  },
  moisturizer: {
    group: 'skin', texture: 'Kem dạng gel', level: 65, skin: ['kho', 'hon-hop', 'thuong', 'nhay-cam'], variants: sizes('50ml', '80ml', 1.45),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Khóa ẩm' },
    howTo: 'Lấy một lượng bằng hạt đậu, chấm 5 điểm trên mặt rồi tán đều theo chiều từ trong ra ngoài.',
  },
  sunscreen: {
    group: 'skin', texture: 'Sữa lỏng', level: 35, skin: ALL, variants: sizes('50ml', '90ml', 1.6),
    specs: { 'Thời điểm dùng': 'Ban ngày', 'Bước trong chu trình': 'Bước cuối buổi sáng' },
    howTo: 'Thoa đủ lượng 15–20 phút trước khi ra nắng. Thoa lại sau mỗi 2 giờ hoặc sau khi ra mồ hôi.',
  },
  'sheet-mask': {
    group: 'skin', texture: 'Tinh chất thấm trên giấy', level: 25, skin: ALL,
    variants: { label: 'Quy cách', type: 'size', options: [{ key: '1', name: '1 miếng', mult: 1 }, { key: '10', name: 'Hộp 10 miếng', mult: 8.5 }] },
    specs: { 'Thời điểm dùng': '2–3 lần mỗi tuần', 'Bước trong chu trình': 'Sau toner' },
    howTo: 'Đắp 15–20 phút rồi gỡ ra, vỗ nhẹ phần tinh chất còn lại cho thấm. Không cần rửa lại.',
  },
  scrub: {
    group: 'skin', texture: 'Kem có hạt mịn', level: 75, skin: ['dau', 'hon-hop', 'thuong'], variants: sizes('100g', '200g', 1.7),
    specs: { 'Thời điểm dùng': '1–2 lần mỗi tuần, buổi tối', 'Bước trong chu trình': 'Sau làm sạch' },
    howTo: 'Thoa lên da ẩm, massage thật nhẹ theo vòng tròn khoảng 30 giây, tránh vùng mắt, rửa sạch.',
  },
  'clay-mask': {
    group: 'skin', texture: 'Đất sét đặc', level: 92, skin: ['dau', 'hon-hop'], variants: sizes('100ml', '150ml', 1.35),
    specs: { 'Thời điểm dùng': '1–2 lần mỗi tuần', 'Bước trong chu trình': 'Sau làm sạch' },
    howTo: 'Thoa một lớp vừa phải, tránh mắt và môi. Để 10 phút rồi rửa sạch bằng nước ấm.',
  },
  'eye-cream': {
    group: 'skin', texture: 'Kem mỏng', level: 60, skin: ALL, variants: sizes('15ml', '30ml', 1.7),
    specs: { 'Thời điểm dùng': 'Sáng và tối', 'Bước trong chu trình': 'Trước kem dưỡng' },
    howTo: 'Lấy lượng bằng hạt gạo, dùng ngón áp út vỗ nhẹ quanh vùng mắt.',
  },
  mist: {
    group: 'skin', texture: 'Xịt phun sương', level: 0, skin: ALL, variants: sizes('60ml', '100ml', 1.45),
    specs: { 'Thời điểm dùng': 'Bất cứ lúc nào', 'Bước trong chu trình': 'Cấp ẩm nhanh' },
    howTo: 'Lắc nhẹ, xịt cách mặt khoảng 20cm, nhắm mắt khi xịt. Dùng được cả trên lớp trang điểm.',
  },
  'lip-balm': {
    group: 'lip', texture: 'Sáp mềm', level: 85, skin: null,
    variants: shades([['Không màu', '#f4e3dc'], ['Hồng nhạt', '#f0a5ad']]),
    specs: { 'Thời điểm dùng': 'Bất cứ lúc nào', 'Lớp hoàn thiện': 'Bóng nhẹ' },
    howTo: 'Thoa trực tiếp lên môi. Có thể dùng làm lớp lót trước khi tô son.',
  },
  'body-lotion': {
    group: 'body', texture: 'Sữa dưỡng', level: 50, skin: ALL, variants: sizes('200ml', '400ml', 1.65),
    specs: { 'Thời điểm dùng': 'Sau khi tắm', 'Mùi hương': 'Hương hoa nhẹ' },
    howTo: 'Thoa lên da còn hơi ẩm sau khi tắm, massage tới khi thấm.',
  },
  foundation: {
    group: 'base', texture: 'Kem lỏng', level: 40, skin: ['dau', 'hon-hop', 'thuong'], variants: BASE_SHADES,
    specs: { 'Độ che phủ': 'Vừa đến cao', 'Lớp hoàn thiện': 'Bán lì' },
    howTo: 'Chấm vài điểm lên mặt, tán bằng mút ẩm hoặc cọ từ trong ra ngoài. Dặm thêm ở vùng cần che.',
  },
  cushion: {
    group: 'base', texture: 'Kem lỏng trong lõi nệm', level: 40, skin: ['kho', 'hon-hop', 'thuong'], variants: BASE_SHADES,
    specs: { 'Độ che phủ': 'Vừa', 'Lớp hoàn thiện': 'Căng bóng nhẹ' },
    howTo: 'Ấn nhẹ bông vào lõi, vỗ đều lên mặt. Dặm thêm lớp mỏng nếu muốn che phủ hơn.',
  },
  powder: {
    group: 'base', texture: 'Phấn bột nén', level: null, skin: ['dau', 'hon-hop', 'thuong'],
    variants: shades([['Trong suốt', '#f6ece6'], ['Sáng da', '#efd5c3']]),
    specs: { 'Độ che phủ': 'Nhẹ', 'Lớp hoàn thiện': 'Lì mịn' },
    howTo: 'Dùng bông hoặc cọ lớn phủ một lớp mỏng sau kem nền, tập trung vùng chữ T.',
  },
  blush: {
    group: 'base', texture: 'Phấn bột nén', level: null, skin: null,
    variants: shades([['Hồng đào', '#f2a7a0'], ['Hồng san hô', '#ef8f7e'], ['Hồng đất', '#c9817a']]),
    specs: { 'Lớp hoàn thiện': 'Lì tự nhiên' },
    howTo: 'Mỉm cười, đánh nhẹ lên phần cao của gò má rồi tán về phía thái dương.',
  },
  eyeshadow: {
    group: 'eye', texture: 'Phấn bột nén', level: null, skin: null, variants: null,
    specs: { 'Số ô màu': '12', 'Tông màu': 'Hồng đất, nâu', 'Lớp hoàn thiện': 'Lì và nhũ' },
    howTo: 'Dùng màu sáng làm nền, màu đậm hơn ở nếp mí, màu nhũ ở giữa mí mắt.',
  },
  mascara: {
    group: 'eye', texture: 'Kem đặc', level: 80, skin: null,
    variants: shades([['Đen', '#1d1a1c'], ['Nâu', '#4a3226']]),
    specs: { 'Hiệu ứng': 'Dày và dài mi', 'Tẩy trang': 'Dùng nước tẩy trang mắt môi' },
    howTo: 'Chải từ chân mi, lắc nhẹ đầu chải và kéo ra ngọn. Chờ khô rồi chải lớp thứ hai.',
  },
  eyeliner: {
    group: 'eye', texture: 'Mực lỏng', level: 5, skin: null,
    variants: shades([['Đen', '#1d1a1c'], ['Nâu', '#4a3226']]),
    specs: { 'Đầu bút': 'Đầu dạ mảnh', 'Lớp hoàn thiện': 'Lì' },
    howTo: 'Kẻ sát chân mi từ giữa ra đuôi mắt, sau đó nối phần đầu mắt.',
  },
  'lip-tint': {
    group: 'lip', texture: 'Nước lỏng bóng', level: 15, skin: null, variants: LIP_SHADES,
    specs: { 'Lớp hoàn thiện': 'Bóng', 'Độ bám màu': 'Vừa' },
    howTo: 'Tô một lớp ở lòng môi rồi mím nhẹ để tán. Tô thêm lớp nữa nếu muốn màu đậm hơn.',
  },
  'lip-cream': {
    group: 'lip', texture: 'Kem lì', level: 55, skin: null, variants: LIP_SHADES,
    specs: { 'Lớp hoàn thiện': 'Lì mềm', 'Độ bám màu': 'Cao' },
    howTo: 'Tô viền môi trước rồi tô kín. Chờ khoảng một phút cho son khô.',
  },
  lipstick: {
    group: 'lip', texture: 'Thỏi son', level: 95, skin: null,
    variants: shades([['Hồng nude', '#d38b8b'], ['Đỏ hồng', '#c23a4e'], ['Đỏ gạch', '#a8432f']]),
    specs: { 'Lớp hoàn thiện': 'Satin', 'Độ bám màu': 'Vừa' },
    howTo: 'Tô trực tiếp từ thỏi, bắt đầu từ giữa môi ra hai bên.',
  },
  perfume: {
    group: 'fragrance', texture: 'Dạng xịt', level: null, skin: null, variants: sizes('30ml', '50ml', 1.5),
    specs: { 'Nhóm hương': 'Hương hoa', 'Độ lưu hương': 'Vừa phải' },
    howTo: 'Xịt lên cổ tay, sau gáy hoặc sau tai, cách da khoảng 15cm. Không chà xát sau khi xịt.',
  },
};

const KIND_OF = {
  [PRODUCT.id]: 'serum',
  'ba-01': 'cleanser', 'ba-02': 'toner', 'ba-03': 'serum', 'ba-04': 'moisturizer', 'ba-05': 'sunscreen',
  'ba-06': 'sheet-mask', 'ba-07': 'scrub', 'ba-08': 'eye-cream', 'ba-09': 'lip-balm', 'ba-10': 'foundation',
  'ba-11': 'powder', 'ba-12': 'blush', 'ba-13': 'mascara', 'ba-14': 'eyeliner', 'ba-15': 'body-lotion',
  'br-01': 'toner', 'br-02': 'moisturizer', 'br-03': 'foundation', 'br-04': 'lip-tint', 'br-05': 'sunscreen',
  'br-06': 'cushion', 'br-07': 'eyeshadow', 'br-08': 'mascara', 'br-09': 'clay-mask', 'br-10': 'lip-cream',
  'br-11': 'essence', 'br-12': 'perfume', 'br-13': 'cleanser-foam', 'br-14': 'micellar', 'br-15': 'moisturizer',
  'br-16': 'serum', 'br-17': 'sheet-mask', 'br-18': 'lip-tint', 'br-19': 'essence', 'br-20': 'serum',
  'br-21': 'lipstick', 'br-22': 'cushion', 'br-23': 'cleanser', 'br-24': 'lip-tint', 'br-25': 'cleanser',
  'br-26': 'moisturizer', 'br-27': 'mist', 'br-28': 'sheet-mask', 'br-29': 'perfume', 'br-30': 'lipstick',
};

// Sửa riêng cho từng sản phẩm nếu khác thông tin chung của loại
const OVERRIDES = {
  [PRODUCT.id]: {
    texture: 'Gel mỏng nhẹ',
    specs: { 'Thành phần nổi bật': 'Niacinamide, Hyaluronic Acid, chiết xuất hoa hồng' },
    sizeNote: true,
  },
  'br-12': { specs: { 'Nhóm hương': 'Hương hoa dịu nhẹ' } },
  'br-29': { specs: { 'Nhóm hương': 'Hương hoa ngọt' } },
  'br-25': { skin: ['kho', 'thuong', 'nhay-cam', 'hon-hop'] },
};

/* Sản phẩm chuẩn hóa (gồm cả LUMI Glow) */
export function getProduct(id) {
  if (id === PRODUCT.id)
    return {
      id: PRODUCT.id,
      img: PRODUCT.images[0].src,
      cat: 'skin',
      brand: 'LUMI Beauty',
      name: PRODUCT.name,
      benefits: ['Da trông đều màu hơn', 'Cấp ẩm', 'Gel mỏng nhẹ'],
      price: PRODUCT.price,
      comparePrice: PRODUCT.comparePrice,
      alt: PRODUCT.images[0].alt,
      description: PRODUCT.description,
    };
  return CATALOG.find((p) => p.id === id) || null;
}

export function getDetail(id) {
  const kind = KIND_OF[id];
  const base = KINDS[kind];
  if (!base) return null;
  const o = OVERRIDES[id] || {};
  return {
    kind,
    ...base,
    ...o,
    specs: { ...base.specs, ...(o.specs || {}) },
    skin: o.skin || base.skin,
  };
}

export const variantPrice = (price, opt) =>
  opt ? Math.round((price * (opt.mult || 1)) / 1000) * 1000 : price;

export const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label || '';

export function relatedTo(p, n = 4) {
  const same = CATALOG.filter((x) => x.id !== p.id && x.cat === p.cat);
  const kind = KIND_OF[p.id];
  same.sort((a, b) => (KIND_OF[b.id] === kind) - (KIND_OF[a.id] === kind));
  return same.slice(0, n);
}

/* ------------------------------------------------------------------
   ĐÁNH GIÁ MẪU — chỉ để xem bố cục trong bản demo.
   Mọi đánh giá mẫu đều hiển thị nhãn "Mẫu".
   ĐẶT SHOW_SAMPLE_REVIEWS = false TRƯỚC KHI ĐƯA LÊN THẬT.
------------------------------------------------------------------- */
export const SHOW_SAMPLE_REVIEWS = true;

const POOL = {
  skin: [
    [5, 'Kết cấu dễ chịu, thấm nhanh, không bết. Mình dùng đều sáng tối thấy da mềm hơn.'],
    [5, 'Mùi nhẹ, dùng không bị châm chích. Sẽ mua lại chai lớn.'],
    [4, 'Dùng ổn, đóng gói cẩn thận. Trừ một sao vì giao hơi lâu.'],
    [4, 'Da mình hỗn hợp, dùng vùng chữ T không bị bóng dầu nhiều.'],
    [3, 'Sản phẩm ổn nhưng mình chưa thấy khác biệt rõ, sẽ dùng thêm một thời gian.'],
    [5, 'Đã dùng hết một chai, da ẩm hơn hẳn so với trước.'],
  ],
  base: [
    [5, 'Lớp nền mỏng, tệp màu với da, giữ được khá lâu trong ngày.'],
    [4, 'Che phủ ổn, cuối ngày hơi xuống tông ở cánh mũi.'],
    [5, 'Màu chuẩn như ảnh, tán dễ bằng mút.'],
    [3, 'Màu hơi sáng so với da mình, nên chọn tông đậm hơn một bậc.'],
    [4, 'Dùng hằng ngày đi làm thấy hợp, không cảm giác dày mặt.'],
  ],
  lip: [
    [5, 'Màu lên đẹp, đúng như ảnh. Môi không bị khô.'],
    [4, 'Màu xinh, bám khá lâu, ăn uống thì phải tô lại.'],
    [5, 'Chất son mềm, tô một lớp đã đủ màu.'],
    [3, 'Màu đẹp nhưng hơi khô môi nếu không dưỡng trước.'],
  ],
  eye: [
    [5, 'Dễ dùng, không lem sau cả ngày làm việc.'],
    [4, 'Ổn trong tầm giá, tẩy trang cần nước tẩy trang mắt môi.'],
    [5, 'Màu tự nhiên, phù hợp đi làm hằng ngày.'],
  ],
  body: [
    [5, 'Thấm nhanh, mùi thơm nhẹ, da tay chân mềm hơn.'],
    [4, 'Dưỡng ẩm tốt, mùa đông dùng rất hợp.'],
    [4, 'Chai to dùng lâu, vòi bơm tiện.'],
  ],
  fragrance: [
    [5, 'Mùi dễ chịu, không bị gắt, hợp đi làm.'],
    [4, 'Thơm nhẹ, giữ mùi khoảng nửa ngày.'],
    [5, 'Chai đẹp, mua làm quà rất hợp.'],
  ],
};
const NAMES = ['Thu H.', 'Minh A.', 'Ngọc T.', 'Lan P.', 'Hải Y.', 'Bảo V.', 'Quỳnh N.', 'Mai L.'];

function seeded(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function sampleReviews(id) {
  if (!SHOW_SAMPLE_REVIEWS) return [];
  const d = getDetail(id);
  if (!d) return [];
  const rnd = seeded(id);
  const pool = POOL[d.group] || POOL.skin;
  const n = 3 + Math.floor(rnd() * Math.min(4, pool.length - 2));
  const start = Math.floor(rnd() * pool.length);
  const out = [];
  for (let i = 0; i < n; i++) {
    const [rating, text] = pool[(start + i) % pool.length];
    const opt = d.variants ? d.variants.options[Math.floor(rnd() * d.variants.options.length)] : null;
    const skin = d.skin ? d.skin[Math.floor(rnd() * d.skin.length)] : null;
    out.push({
      id: `${id}-s${i}`,
      name: NAMES[Math.floor(rnd() * NAMES.length)],
      rating,
      text,
      skin,
      variant: opt ? opt.name : null,
      date: new Date(Date.now() - (3 + Math.floor(rnd() * 80)) * 86400000).toISOString(),
      helpful: Math.floor(rnd() * 12),
      verified: false,
      sample: true,
    });
  }
  return out;
}
