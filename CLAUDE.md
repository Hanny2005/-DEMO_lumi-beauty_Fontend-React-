# CLAUDE.md — LUMI Beauty

Website bán mỹ phẩm, React 19 + Vite 7, **frontend demo** (chưa có backend). Toàn bộ nội dung hiển thị bằng **tiếng Việt**.

## Lệnh

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # phải chạy thành công trước mỗi commit
npm run preview
```

Không có test tự động. Kiểm tra theo skill `build-and-check`.

## Kiến trúc

- `src/App.jsx` — **hash routing tự viết**. `parseHash()` trả về `{ view, section, tab }`.
  - View: `trang-chu`, `gioi-thieu`, `san-pham`, `tai-khoan` (tab `don-hang|dia-chi|ngan-hang`), `chi-tiet` (`#sp-<id>`, tab = id sản phẩm).
  - `SECTION_VIEW` ánh xạ id section → view (ví dụ `mua` → `san-pham`). Thêm section mới có `id` thì phải thêm vào đây nếu muốn link tới nó.
  - Hash chỉ dùng chữ thường ASCII, số, gạch ngang. Không dùng `#/path` hay query string.
- Providers lồng nhau: `CartProvider` → `AccountProvider` → `ReviewsProvider` → `Page`.
  - `cart.jsx`: `useCart()` (items, dispatch `add|qty|remove|clear`, openCart/closeCart), `useReveal()`, `useFocusTrap()`.
  - `account.jsx`: `useAccount()` (user, orders, addresses, banks, login/register/loginDemo/logout, placeOrder, cancelOrder, openAuth/closeAuth…). Đây là **lớp giả lập backend** — khi có API, thay thân hàm, giữ nguyên tên.
  - `reviews.jsx`: `useReviews()` (reviewsFor, summary, addReview…), `<Stars>`, `<RatingLine pid>`.
- Dữ liệu:
  - `src/data.js` — nguồn sự thật cho nội dung: `BRAND`, `PRODUCT` (LUMI Glow), `BASE_CATALOG` (id `ba-NN`), `BRAND_CATALOG` (id `br-NN`), `CATALOG`, `CATEGORIES`, `FLASH_SALE`, `FAQ`, `PROVINCES`, `BANKS`, `ORDER_STATUS`, `formatVND`, `imageFor`.
  - `src/details.js` — `KINDS` (thông tin theo loại), `KIND_OF` (id → loại), `OVERRIDES`, `getProduct`, `getDetail`, `variantPrice`, `SHOW_SAMPLE_REVIEWS`, `sampleReviews`.
- Dòng giỏ hàng có phân loại dùng id `"<id>:<variantKey>"`; hàng Flash Sale dùng `"<id>-fs"`. Lấy ảnh luôn qua `imageFor(id)`.
- Khóa lưu trữ: `localStorage` `lumi-cart-v1`, `lumi-account-v1`, `lumi-reviews-v1`; `sessionStorage` `lumi-ann`. Đổi cấu trúc dữ liệu thì tăng số phiên bản khóa.

## Quy ước code

- Chỉ function component + hooks. **Không thêm thư viện** (router, UI kit, CSS framework) nếu chưa hỏi.
- Mọi đọc/ghi `localStorage`/`sessionStorage` bọc trong `try/catch`; trang phải chạy được khi storage lỗi.
- Không dùng `alert()`, `confirm()`, `prompt()`. Xác nhận ngay trên trang (xem `ConfirmButton` trong `Account.jsx`).
- Form: `noValidate`, kiểm tra trong `onSubmit`, lỗi hiện **cạnh ô nhập** bằng tiếng Việt, dùng `aria-invalid` + `aria-describedby`. Mỗi input có `id` ổn định.
- Hộp thoại/ngăn kéo: `role="dialog"`, `aria-modal`, `useFocusTrap`, đóng bằng Esc, trả focus về nút mở.

## Quy ước giao diện

- Toàn bộ CSS ở `src/styles.css`. Màu/chữ lấy từ token ở `:root` (`--rose`, `--plum`, `--ink`, `--muted`, `--blush`, `--surface`, `--petal`, `--ok`, `--warn`, `--info`, `--danger`, `--star`, `--f-display`, `--f-body`). Không viết mã màu mới trong component.
- Thêm CSS cho tính năng mới thành một khối có tiêu đề comment, đặt **trước** khối `/* ---------- Reveal`.
- Tên class kiểu BEM rút gọn: `.pcard`, `.pcard__name`, `.chip.is-on`.
- Khung: bọc nội dung section trong `.wrap` (đã có gutter + safe-area). Lưới dùng `minmax(0, 1fr)`; phần tử chứa chữ trong flex/grid cần `min-width: 0`. Không được tràn ngang ở 360px.
- Vùng bấm tối thiểu 44×44px. Số tiền dùng `font-variant-numeric: tabular-nums`.
- Hiệu ứng chỉ dùng `transform`/`opacity`; `[data-reveal]` chỉ dịch chuyển, **không** ẩn nội dung. Mọi animation tắt dưới `prefers-reduced-motion`.
- Dòng tiêu đề lớn: `line-height` ≥ 1.05 để không cắt dấu tiếng Việt.

## Quy tắc nội dung (bắt buộc)

- Tiếng Việt tự nhiên, câu ngắn. Giữ nguyên tên thương hiệu/sản phẩm gốc.
- Giá: `formatVND(n)` → `1.290.000₫`. Không tự định dạng tay.
- **Không viết công dụng mang tính điều trị**: tránh "trị", "điều trị", "xóa nám/nhăn", "trẻ hóa", "chữa", "100%". Dùng: "giúp da trông…", "hỗ trợ…", "cấp ẩm", "làm dịu cảm giác".
- **Không bịa đánh giá, số lượt bán, điểm sao** trình bày như thật. Đánh giá mẫu chỉ qua `sampleReviews()` và luôn có nhãn "Mẫu".
- Thông tin chính sách (đổi trả, giao hàng, liên hệ) chỉ lấy từ `data.js`; không tự thêm cam kết mới.
- Dữ liệu ngân hàng: chỉ giữ tên ngân hàng, chủ tài khoản, 4 số cuối. Không bao giờ lưu số tài khoản đầy đủ, mật khẩu hay mã OTP.

## Skills trong repo

`.claude/skills/`: `add-product`, `edit-content`, `build-and-check`, `go-live-checklist`. Dùng skill tương ứng khi yêu cầu khớp mô tả.
