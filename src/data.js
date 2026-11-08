/* ------------------------------------------------------------------
   LUMI Glow — toàn bộ nội dung trang nằm ở file này.
   Sửa giá, ảnh, chính sách, FAQ, đánh giá... tại đây, không cần
   đụng vào các component.
------------------------------------------------------------------- */
import bottle from './assets/bottle.jpg';
import texture from './assets/texture.jpg';
import campaign from './assets/campaign.jpg';
import modelBanner from './assets/model-banner.jpg';
import collection from './assets/collection.jpg';
import lineup from './assets/lineup.jpg';
import p01 from './assets/catalog/p01.jpg';
import p02 from './assets/catalog/p02.jpg';
import p03 from './assets/catalog/p03.jpg';
import p04 from './assets/catalog/p04.jpg';
import p05 from './assets/catalog/p05.jpg';
import p06 from './assets/catalog/p06.jpg';
import p07 from './assets/catalog/p07.jpg';
import p08 from './assets/catalog/p08.jpg';
import p09 from './assets/catalog/p09.jpg';
import p10 from './assets/catalog/p10.jpg';
import p11 from './assets/catalog/p11.jpg';
import p12 from './assets/catalog/p12.jpg';
import p13 from './assets/catalog/p13.jpg';
import p14 from './assets/catalog/p14.jpg';
import p15 from './assets/catalog/p15.jpg';
import b01 from './assets/brands/b01.jpg';
import b02 from './assets/brands/b02.jpg';
import b03 from './assets/brands/b03.jpg';
import b04 from './assets/brands/b04.jpg';
import b05 from './assets/brands/b05.jpg';
import b06 from './assets/brands/b06.jpg';
import b07 from './assets/brands/b07.jpg';
import b08 from './assets/brands/b08.jpg';
import b09 from './assets/brands/b09.jpg';
import b10 from './assets/brands/b10.jpg';
import b11 from './assets/brands/b11.jpg';
import b12 from './assets/brands/b12.jpg';
import b13 from './assets/brands/b13.jpg';
import b14 from './assets/brands/b14.jpg';
import b15 from './assets/brands/b15.jpg';
import b16 from './assets/brands/b16.jpg';
import b17 from './assets/brands/b17.jpg';
import b18 from './assets/brands/b18.jpg';
import b19 from './assets/brands/b19.jpg';
import b20 from './assets/brands/b20.jpg';
import b21 from './assets/brands/b21.jpg';
import b22 from './assets/brands/b22.jpg';
import b23 from './assets/brands/b23.jpg';
import b24 from './assets/brands/b24.jpg';
import b25 from './assets/brands/b25.jpg';
import b26 from './assets/brands/b26.jpg';
import b27 from './assets/brands/b27.jpg';
import b28 from './assets/brands/b28.jpg';
import b29 from './assets/brands/b29.jpg';
import b30 from './assets/brands/b30.jpg';

export const BRAND = {
  name: 'LUMI Beauty',
  slogan: 'Rạng ngời theo cách của bạn.',
  announcement: 'Miễn phí giao hàng cho đơn từ 499.000₫ · Giảm 20% cho thành viên mới',
  freeShippingThreshold: 499000,
  // Phí giao cho đơn dưới ngưỡng miễn phí (giá mẫu, thay theo đơn vị vận chuyển thật)
  shippingFee: 30000,
  // Để trống: nút thanh toán hiển thị ghi chú "bản xem thử".
  checkoutUrl: '',
  // Để trống: form đăng ký chỉ kiểm tra email, không gửi dữ liệu đi đâu.
  newsletterEndpoint: '',
  newsletterOffer: 'Giảm 10% cho đơn hàng đầu tiên',
  // Thông tin liên hệ — thay bằng thông tin thật trước khi đưa lên.
  contact: {
    hotline: 'Đang cập nhật',
    zalo: 'Đang cập nhật',
    email: 'Đang cập nhật',
    address: 'Đang cập nhật',
    hours: 'Đang cập nhật',
  },
  // Để trống: form liên hệ chỉ kiểm tra dữ liệu, không gửi đi đâu.
  contactEndpoint: '',
  socials: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
  // Số phiếu công bố mỹ phẩm (bắt buộc khi bán mỹ phẩm tại Việt Nam).
  notificationNumber: 'Đang cập nhật',
};

export const PRODUCT = {
  id: 'lumi-glow-30ml',
  name: 'Serum Sáng Da LUMI Glow',
  shortName: 'LUMI Glow',
  category: 'Serum dưỡng sáng',
  size: '30ml',
  price: 399000,
  comparePrice: 499000,
  inStock: true,
  maxQty: 10,
  description:
    'Niacinamide, Hyaluronic Acid và chiết xuất hoa hồng trong một lớp gel mỏng nhẹ. Da trông đều màu, mềm và căng mọng hơn sau mỗi lần dùng.',
  images: [
    { src: bottle, w: 405, h: 447, alt: 'Chai serum LUMI Glow 30ml màu hồng đặt cạnh bông hồng' },
    { src: texture, w: 322, h: 158, alt: 'Kết cấu gel trong, hồng nhạt của serum LUMI Glow' },
    { src: campaign, w: 1000, h: 1000, alt: 'Người mẫu cầm chai LUMI Glow, nền hoa hồng' },
  ],
  details: [
    {
      title: 'Thành phần chính',
      body: 'Niacinamide, Hyaluronic Acid, chiết xuất hoa hồng. Bảng thành phần đầy đủ in trên hộp sản phẩm.',
    },
    {
      title: 'Cách dùng',
      body: 'Sau bước làm sạch và toner, lấy 2–3 giọt, thoa đều lên mặt và cổ. Dùng sáng và tối. Ban ngày luôn dùng kem chống nắng ở bước cuối.',
    },
    {
      title: 'Bảo quản',
      body: 'Đậy kín nắp sau khi dùng. Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và xa tầm tay trẻ em.',
    },
    {
      title: 'Lưu ý',
      body: 'Thử trên một vùng da nhỏ trước khi dùng toàn mặt. Ngưng dùng nếu da kích ứng. Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    },
  ],
};

export const TICKER = [
  'Sáng da tự nhiên',
  'Gel mỏng, thấm nhanh',
  'Chiết xuất hoa hồng',
  'Dùng sáng và tối',
  'Miễn phí giao từ 499.000₫',
];

export const GALLERY = [
  { src: bottle, w: 405, h: 447, caption: 'Chai thủy tinh hồng, 30ml', alt: 'Chai serum LUMI Glow đặt cạnh bông hồng' },
  { src: campaign, w: 1000, h: 1000, caption: 'Chiến dịch Rạng ngời', alt: 'Người mẫu mỉm cười, cầm chai LUMI Glow' },
  { src: texture, w: 322, h: 158, caption: 'Kết cấu gel trong', alt: 'Cận cảnh kết cấu gel hồng nhạt' },
  { src: modelBanner, w: 550, h: 384, caption: 'Lớp nền cho ngày mới', alt: 'Người mẫu áp chai serum lên má' },
  { src: collection, w: 328, h: 263, caption: 'Bộ sưu tập Pink Bloom', alt: 'Các sản phẩm LUMI Beauty giữa hoa hồng' },
  { src: lineup, w: 343, h: 263, caption: 'Chu trình dưỡng LUMI', alt: 'Kem, sữa rửa mặt và serum LUMI xếp cạnh nhau' },
];

export const FEATURE_IMAGES = { main: modelBanner, inset: texture };
export const STORY_IMAGE = campaign;

export const FEATURES = [
  {
    title: 'Niacinamide',
    body: 'Giúp da trông đều màu hơn và giảm vẻ xỉn màu khi dùng đều đặn mỗi ngày.',
  },
  {
    title: 'Hyaluronic Acid',
    body: 'Giữ ẩm cho da, để da mềm và căng hơn ngay sau khi thoa.',
  },
  {
    title: 'Chiết xuất hoa hồng',
    body: 'Làm dịu cảm giác trên da, kèm hương hoa nhẹ, không gắt.',
  },
  {
    title: 'Gel mỏng nhẹ',
    body: 'Thấm nhanh, không bết dính, dễ dùng trước kem dưỡng và kem chống nắng.',
  },
];


export const FAQ = [
  {
    q: 'Sản phẩm ở LUMI Beauty có phải hàng chính hãng không?',
    a: 'Có. Ngoài dòng sản phẩm của LUMI, shop chỉ bán hàng chính hãng của các thương hiệu có trong mục Sản phẩm.',
  },
  {
    q: 'Phí giao hàng tính thế nào?',
    a: 'Đơn từ 499.000₫ được miễn phí giao hàng. Đơn dưới mức này tính phí theo khu vực nhận hàng, hiển thị ở bước thanh toán.',
  },
  {
    q: 'Flash Sale hoạt động ra sao?',
    a: 'Mỗi đợt Flash Sale có thời gian đếm ngược và số suất giới hạn cho từng sản phẩm. Giá ưu đãi áp dụng khi bạn thêm sản phẩm từ mục Flash Sale trước khi hết giờ.',
  },
  {
    q: 'Chính sách đổi trả thế nào?',
    a: 'Bạn được đổi trả trong 7 ngày kể từ khi nhận hàng nếu sản phẩm lỗi hoặc giao sai. Vui lòng giữ hộp và hóa đơn.',
  },
  {
    q: 'Tôi có thể thanh toán bằng cách nào?',
    a: 'Thanh toán khi nhận hàng (COD), chuyển khoản ngân hàng hoặc ví điện tử.',
  },
  {
    q: 'Da nhạy cảm nên chọn sản phẩm thế nào?',
    a: 'Mỗi làn da phản ứng khác nhau. Hãy thử một lượng nhỏ ở vùng cằm hoặc sau tai trong 24 giờ trước khi dùng toàn mặt, hoặc nhắn cho LUMI ở mục Liên hệ để được tư vấn.',
  },
];

export const PAYMENT_METHODS = ['COD', 'Chuyển khoản', 'Ví điện tử'];

export const formatVND = (n) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';

export const discountPct = (price, compare) =>
  compare && compare > price ? Math.round((1 - price / compare) * 100) : 0;

/* ------------------------------------------------------------------
   Bộ sưu tập 15 sản phẩm (ảnh cắt từ bộ poster gửi kèm).
   GIÁ ĐANG LÀ GIÁ MẪU — thay bằng giá thật trước khi đưa lên.
------------------------------------------------------------------- */
export const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'skin', label: 'Chăm sóc da' },
  { id: 'makeup', label: 'Trang điểm' },
  { id: 'body', label: 'Cơ thể' },
  { id: 'fragrance', label: 'Nước hoa' },
];

const c = (n, img, cat, name, benefits, price, alt, brand = '', prefix = 'ba') => ({
  id: `${prefix}-${String(n).padStart(2, '0')}`,
  img,
  cat,
  brand,
  name,
  benefits,
  price,
  alt,
});
// Sản phẩm chính hãng của các thương hiệu khác. brand để trống = chưa xác định thương hiệu.
const b = (n, img, cat, brand, name, benefits, price, alt) =>
  c(n, img, cat, name, benefits, price, alt, brand, 'br');

const BASE_CATALOG = [
  c(1, p01, 'skin', 'Sữa rửa mặt', ['Làm sạch sâu', 'Dịu nhẹ', 'Cho làn da khỏe đẹp'], 189000, 'Người mẫu cầm tuýp sữa rửa mặt, nước bắn quanh'),
  c(2, p02, 'skin', 'Toner', ['Cân bằng da', 'Lỗ chân lông trông se khít', 'Cấp ẩm tức thì'], 259000, 'Người mẫu cầm chai toner hồng cạnh bông hồng'),
  c(3, p03, 'skin', 'Serum', ['Da trông tươi tắn', 'Hỗ trợ đều màu da', 'Da mềm và săn hơn'], 359000, 'Người mẫu cầm lọ serum có ống nhỏ giọt'),
  c(4, p04, 'skin', 'Kem dưỡng ẩm', ['Dưỡng ẩm sâu', 'Nuôi dưỡng làn da', 'Da mềm mịn, rạng rỡ'], 329000, 'Hũ kem dưỡng ẩm bên cạnh người mẫu chạm má'),
  c(5, p05, 'skin', 'Kem chống nắng', ['Bảo vệ da trước tia UV', 'Hạn chế sạm da do nắng', 'Kết cấu nhẹ'], 299000, 'Người mẫu đội mũ cói cầm tuýp kem chống nắng'),
  c(6, p06, 'skin', 'Mặt nạ giấy', ['Cấp ẩm tức thì', 'Da dịu và mềm hơn', 'Cho da căng bóng'], 39000, 'Người mẫu đắp mặt nạ giấy, cầm gói mặt nạ'),
  c(7, p07, 'skin', 'Tẩy tế bào chết', ['Loại bỏ tế bào chết', 'Làm mịn da', 'Da sáng tự nhiên'], 219000, 'Hũ tẩy tế bào chết dạng hạt cạnh người mẫu'),
  c(8, p08, 'skin', 'Kem mắt', ['Vùng mắt trông tươi hơn', 'Dưỡng ẩm vùng da mỏng', 'Căng mịn vùng mắt'], 289000, 'Người mẫu thoa kem quanh mắt, tuýp kem mắt và hoa oải hương'),
  c(9, p09, 'skin', 'Son dưỡng', ['Dưỡng môi mềm mịn', 'Hạn chế nứt nẻ', 'Sắc hồng tự nhiên'], 129000, 'Cận cảnh đôi môi và hũ son dưỡng màu hồng'),
  c(10, p10, 'makeup', 'Kem nền', ['Che phủ đều màu', 'Lâu trôi tự nhiên', 'Cho làn da mịn màng'], 349000, 'Người mẫu cầm chai kem nền dạng vòi bơm'),
  c(11, p11, 'makeup', 'Phấn phủ', ['Kiềm dầu', 'Mịn màng tự nhiên', 'Giữ lớp nền lâu hơn'], 279000, 'Người mẫu cầm hộp phấn phủ tròn'),
  c(12, p12, 'makeup', 'Phấn má hồng', ['Sắc hồng hào', 'Tươi tắn, rạng rỡ', 'Dễ tán đều'], 199000, 'Người mẫu cầm cọ trang điểm và hộp phấn má hồng'),
  c(13, p13, 'makeup', 'Mascara', ['Mi dài, cong vút', 'Không lem trôi', 'Cho đôi mắt cuốn hút'], 229000, 'Cận cảnh hàng mi và cây mascara đen'),
  c(14, p14, 'makeup', 'Kẻ mắt', ['Nét kẻ sắc gọn', 'Lâu trôi', 'Tôn nét đôi mắt'], 179000, 'Người mẫu kẻ mắt bằng bút kẻ đen'),
  c(15, p15, 'body', 'Sữa dưỡng thể', ['Dưỡng ẩm toàn thân', 'Da mềm mịn', 'Hương thơm dịu nhẹ'], 249000, 'Người mẫu thoa sữa dưỡng thể, chai có vòi bơm và hoa hồng'),
];

// 30 sản phẩm thương hiệu (ảnh cắt từ bộ ảnh thứ hai). GIÁ LÀ GIÁ MẪU.
const BRAND_CATALOG = [
  b(1, b01, 'skin', 'Laneige', 'Nước cân bằng', ['Cấp ẩm', 'Làm mềm da'], 650000, 'Người mẫu cầm chai nước cân bằng Laneige màu hồng'),
  b(2, b02, 'skin', 'Innisfree', 'Kem dưỡng ẩm', ['Dưỡng ẩm', 'Kết cấu nhẹ'], 520000, 'Người mẫu thoa kem, cầm hũ kem Innisfree màu xanh'),
  b(3, b03, 'makeup', 'Estée Lauder', 'Kem nền', ['Che phủ tốt', 'Lâu trôi'], 1250000, 'Người mẫu cầm chai kem nền Estée Lauder'),
  b(4, b04, 'makeup', '', 'Son tint bóng', ['Màu hồng tươi', 'Mỏng nhẹ trên môi'], 189000, 'Người mẫu cầm cây son tint màu hồng'),
  b(5, b05, 'skin', 'Anessa', 'Kem chống nắng', ['Bảo vệ da trước tia UV', 'Dùng hằng ngày'], 590000, 'Người mẫu nháy mắt, cầm tuýp kem chống nắng Anessa'),
  b(6, b06, 'makeup', 'TIRTIR', 'Phấn nước cushion', ['Lớp nền mỏng mịn', 'Tiện dặm lại'], 450000, 'Người mẫu áp hộp cushion TIRTIR màu đỏ lên má'),
  b(7, b07, 'makeup', '', 'Bảng phấn mắt 12 ô', ['Tông hồng đất', 'Dễ phối màu'], 320000, 'Người mẫu cầm bảng phấn mắt tông hồng'),
  b(8, b08, 'makeup', '', 'Mascara', ['Làm dày và dài mi', 'Hạn chế lem'], 210000, 'Người mẫu cầm cây mascara đen'),
  b(9, b09, 'skin', 'Innisfree', 'Mặt nạ đất sét', ['Làm sạch lỗ chân lông', 'Dùng 1–2 lần/tuần'], 380000, 'Người mẫu đắp mặt nạ đất sét xanh, cầm hũ Innisfree'),
  b(10, b10, 'makeup', '', 'Son kem lì', ['Lên màu chuẩn', 'Mềm môi'], 199000, 'Người mẫu cầm cây son kem màu hồng đào'),
  b(11, b11, 'skin', 'SK-II', 'Nước dưỡng Essence', ['Dưỡng da mịn', 'Da trông tươi sáng hơn'], 2650000, 'Người mẫu cầm chai nước dưỡng SK-II'),
  b(12, b12, 'fragrance', '', 'Nước hoa nơ đen', ['Hương hoa dịu nhẹ', 'Lưu hương vừa phải'], 890000, 'Người mẫu cầm chai nước hoa trong suốt có nơ đen'),
  b(13, b13, 'skin', '', 'Sữa rửa mặt tạo bọt', ['Bọt mịn', 'Làm sạch nhẹ nhàng'], 180000, 'Người mẫu rửa mặt với lớp bọt trắng'),
  b(14, b14, 'skin', 'Bioderma', 'Nước tẩy trang', ['Làm sạch lớp trang điểm', 'Không cần rửa lại'], 420000, 'Người mẫu cầm chai nước tẩy trang Bioderma màu xanh'),
  b(15, b15, 'skin', 'Laneige', 'Kem dưỡng hũ hồng', ['Dưỡng ẩm', 'Da mềm mại'], 690000, 'Người mẫu cầm hũ kem Laneige màu hồng'),
  b(16, b16, 'skin', 'The Ordinary', 'Serum', ['Kết cấu lỏng nhẹ', 'Thấm nhanh'], 320000, 'Người mẫu cầm lọ serum The Ordinary có ống nhỏ giọt'),
  b(17, b17, 'skin', 'Mediheal', 'Mặt nạ giấy N.M.F', ['Cấp ẩm tức thì', 'Da căng mọng'], 35000, 'Người mẫu cầm gói mặt nạ giấy Mediheal N.M.F'),
  b(18, b18, 'makeup', '', 'Son tint', ['Màu hồng tự nhiên', 'Mỏng nhẹ'], 179000, 'Người mẫu cầm cây son tint hồng'),
  b(19, b19, 'skin', 'Elixir', 'Nước dưỡng', ['Dưỡng ẩm', 'Da mềm và mịn'], 980000, 'Người mẫu áp chai nước dưỡng Elixir lên má'),
  b(20, b20, 'skin', 'Innisfree', 'Serum trà xanh', ['Cấp ẩm', 'Kết cấu nhẹ'], 650000, 'Người mẫu cầm lọ serum Innisfree màu xanh lá'),
  b(21, b21, 'makeup', 'Yves Saint Laurent', 'Son thỏi', ['Màu hồng nude', 'Mềm môi'], 1150000, 'Người mẫu cầm thỏi son vỏ hồng'),
  b(22, b22, 'makeup', 'CLIO', 'Phấn nước cushion', ['Lớp nền tự nhiên', 'Tiện mang theo'], 480000, 'Người mẫu nháy mắt, cầm hộp cushion CLIO màu hồng'),
  b(23, b23, 'skin', '', 'Sữa rửa mặt tuýp xanh', ['Làm sạch dịu nhẹ', 'Dùng sáng và tối'], 220000, 'Người mẫu cầm tuýp sữa rửa mặt màu xanh lá'),
  b(24, b24, 'makeup', '', 'Son tint đỏ hồng', ['Màu tươi', 'Bền màu'], 179000, 'Người mẫu cầm cây son tint đỏ hồng'),
  b(25, b25, 'skin', 'CeraVe', 'Sữa rửa mặt dưỡng ẩm', ['Làm sạch dịu nhẹ', 'Không làm khô da'], 390000, 'Người mẫu quấn khăn, cầm chai sữa rửa mặt CeraVe'),
  b(26, b26, 'skin', "Kiehl's", 'Kem dưỡng ẩm', ['Dưỡng ẩm', 'Dùng hằng ngày'], 950000, "Người mẫu tựa má, hũ kem Kiehl's màu trắng"),
  b(27, b27, 'skin', "d'Alba", 'Xịt dưỡng', ['Cấp ẩm nhanh', 'Dùng mọi lúc'], 520000, "Người mẫu cầm chai xịt dưỡng d'Alba màu hồng"),
  b(28, b28, 'skin', '', 'Mặt nạ giấy dưỡng ẩm', ['Cấp ẩm', 'Da dịu mát'], 30000, 'Người mẫu đắp mặt nạ giấy trắng'),
  b(29, b29, 'fragrance', '', 'Nước hoa hồng', ['Hương hoa ngọt nhẹ', 'Chai thủy tinh hồng'], 950000, 'Người mẫu nháy mắt, cầm chai nước hoa màu hồng'),
  b(30, b30, 'makeup', '', 'Son thỏi đỏ', ['Màu đỏ hồng', 'Lên màu chuẩn'], 290000, 'Người mẫu cầm thỏi son đỏ vỏ vàng'),
];

export const CATALOG = [...BASE_CATALOG, ...BRAND_CATALOG];

// Danh sách thương hiệu cho bộ lọc (bỏ qua sản phẩm chưa rõ thương hiệu)
export const BRANDS = [...new Set(CATALOG.map((p) => p.brand).filter(Boolean))].sort((a, z) =>
  a.localeCompare(z)
);

// Ảnh cho mọi sản phẩm có thể nằm trong giỏ hàng
export const CART_IMAGES = Object.fromEntries([
  ...CATALOG.map((p) => [p.id + '-fs', p.img]),
  [PRODUCT.id, PRODUCT.images[0].src],
  ...CATALOG.map((p) => [p.id, p.img]),
]);

/* ------------------------------------------------------------------
   Flash Sale. endsAt để trống = kết thúc lúc 23:59 hôm nay (dùng cho bản demo).
   Ví dụ đợt thật: endsAt: '2026-11-11T23:59:59+07:00'
   GIÁ VÀ SỐ SUẤT LÀ DỮ LIỆU MẪU.
------------------------------------------------------------------- */
export const FLASH_SALE = {
  endsAt: '',
  items: [
    { id: 'ba-03', salePrice: 269000, limit: 30 },
    { id: 'br-01', salePrice: 489000, limit: 20 },
    { id: 'br-25', salePrice: 299000, limit: 40 },
    { id: 'br-06', salePrice: 339000, limit: 25 },
    { id: 'ba-05', salePrice: 219000, limit: 30 },
    { id: 'br-17', salePrice: 25000, limit: 100 },
    { id: 'br-21', salePrice: 899000, limit: 10 },
    { id: 'ba-15', salePrice: 179000, limit: 30 },
  ],
};

export const STORE_FACTS = {
  products: CATALOG.length + 1,
  brands: BRANDS.length + 1,
};

/* ------------------------------------------------------------------
   Tài khoản khách hàng
------------------------------------------------------------------- */
// 34 tỉnh, thành phố (sau sắp xếp đơn vị hành chính 2025)
export const PROVINCES = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Hải Phòng', 'Đà Nẵng', 'Cần Thơ', 'Huế',
  'An Giang', 'Bắc Ninh', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Điện Biên', 'Đồng Nai',
  'Đồng Tháp', 'Gia Lai', 'Hà Tĩnh', 'Hưng Yên', 'Khánh Hòa', 'Lai Châu', 'Lâm Đồng',
  'Lạng Sơn', 'Lào Cai', 'Nghệ An', 'Ninh Bình', 'Phú Thọ', 'Quảng Ngãi', 'Quảng Ninh',
  'Quảng Trị', 'Sơn La', 'Tây Ninh', 'Thái Nguyên', 'Thanh Hóa', 'Tuyên Quang', 'Vĩnh Long',
];

export const BANKS = [
  'Vietcombank', 'VietinBank', 'BIDV', 'Agribank', 'Techcombank', 'MB Bank',
  'ACB', 'VPBank', 'TPBank', 'Sacombank', 'HDBank', 'VIB',
];

export const ORDER_STATUS = {
  pending: { label: 'Chờ xác nhận', tone: 'warn' },
  shipping: { label: 'Đang giao', tone: 'info' },
  done: { label: 'Đã giao', tone: 'ok' },
  cancelled: { label: 'Đã hủy', tone: 'mute' },
};

// Ảnh cho một dòng giỏ hàng / đơn hàng (bỏ hậu tố phân loại "id:mau")
export const imageFor = (id) =>
  CART_IMAGES[id] || CART_IMAGES[String(id).split(':')[0]] || PRODUCT.images[0].src;
