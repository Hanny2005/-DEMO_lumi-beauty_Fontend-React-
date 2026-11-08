---
name: go-live-checklist
description: Danh sách việc phải làm để đưa website LUMI Beauty từ bản demo lên bán thật — tắt dữ liệu mẫu, điền thông tin pháp lý, thay giá/ảnh, nối backend, thanh toán và triển khai. Dùng khi người dùng nói chuẩn bị ra mắt, deploy, đưa lên thật, hoặc hỏi còn thiếu gì.
---

# Đưa LUMI Beauty lên thật

Đi theo thứ tự. Mục nào chưa làm được thì báo lại cho người dùng, **không tự điền dữ liệu giả để "cho đủ"**.

## A. Dữ liệu mẫu — phải xử lý hết

| Việc | Vị trí |
| --- | --- |
| Tắt đánh giá mẫu: `SHOW_SAMPLE_REVIEWS = false` | `src/details.js` |
| Thay giá mẫu bằng giá thật | `src/data.js` → `BASE_CATALOG`, `BRAND_CATALOG`, `PRODUCT` |
| Flash Sale: `endsAt` thật (ví dụ `'2026-11-11T23:59:59+07:00'`), giá, số suất | `src/data.js` → `FLASH_SALE` |
| Phí giao thật | `src/data.js` → `BRAND.shippingFee`, `freeShippingThreshold` |
| Kết cấu, loại da, tên màu, dung tích theo nhãn thật của hãng | `src/details.js` → `OVERRIDES` |
| Điền thương hiệu cho sản phẩm có `brand: ''` | `src/data.js` → `BRAND_CATALOG` |
| Gỡ nút "Dùng tài khoản mẫu" và hàm `loginDemo` / `demoAccount` | `src/components/Account.jsx`, `src/account.jsx` |
| Gỡ các dòng "Bản xem thử: …" | tìm `Bản xem thử` trong `src/` |

## B. Pháp lý và thông tin cửa hàng

- `BRAND.notificationNumber`: số phiếu công bố sản phẩm mỹ phẩm (mỗi sản phẩm nên có số riêng — cân nhắc thêm trường vào dữ liệu sản phẩm).
- `BRAND.contact`: hotline, Zalo, email, địa chỉ, giờ làm việc thật.
- Thêm trang hoặc mục: chính sách đổi trả, giao hàng, bảo mật thông tin, điều khoản. Footer đang trỏ tạm vào `#mua`.
- Thông tin doanh nghiệp ở footer (tên công ty, mã số thuế/ĐKKD) và đăng ký website TMĐT với Bộ Công Thương theo quy định hiện hành — người dùng tự xác nhận với bên pháp lý.
- Rà toàn bộ câu chữ theo skill `edit-content` (không công dụng điều trị, không cam kết tuyệt đối).

## C. Hình ảnh

- Thay ảnh trong `src/assets/brands/` (ảnh dựng, logo sai chữ) bằng ảnh chụp sản phẩm thật hoặc ảnh hãng cho phép dùng.
- Thay ảnh `src/assets/catalog/` và ảnh LUMI bằng ảnh gốc độ phân giải cao.
- Có quyền sử dụng hình người mẫu.

## D. Backend (cần đội backend)

Thay thân các hàm trong `src/account.jsx` / `src/reviews.jsx` bằng gọi API, **giữ nguyên tên hàm** để component không phải sửa.

| Chức năng | Yêu cầu tối thiểu |
| --- | --- |
| Đăng nhập / đăng ký | Xác thực ở máy chủ, mật khẩu băm, phiên bằng cookie `HttpOnly`; không lưu thông tin đăng nhập ở `localStorage` |
| Đơn hàng | Tạo đơn ở máy chủ, tính lại giá và phí giao ở máy chủ (không tin giá từ trình duyệt), trạng thái do cửa hàng cập nhật |
| Địa chỉ | Lưu theo tài khoản |
| Ngân hàng liên kết | **Qua cổng thanh toán** (VNPAY, MoMo, ZaloPay, cổng của ngân hàng…). Website chỉ nhận lại token và 4 số cuối. Không bao giờ nhận/lưu số tài khoản đầy đủ, OTP |
| Đánh giá | Lưu ở máy chủ; nhãn "Đã mua hàng" chỉ khi có đơn **đã giao** chứa sản phẩm; có kiểm duyệt |
| Form liên hệ, đăng ký nhận tin | `BRAND.contactEndpoint`, `BRAND.newsletterEndpoint` |
| Thanh toán | `BRAND.checkoutUrl` hoặc tích hợp cổng thanh toán vào bước Đặt hàng trong `Purchase.jsx` |

## E. Kỹ thuật và triển khai

- Chạy skill `build-and-check`.
- `index.html`: cập nhật `og:image`, `og:url`, favicon; JSON-LD theo giá thật.
- Hash routing (`#san-pham`) không thân thiện SEO cho từng sản phẩm. Nếu cần SEO trang sản phẩm, cân nhắc chuyển sang router có đường dẫn thật (React Router) + render phía máy chủ.
- Triển khai thư mục `dist/` lên hosting tĩnh (Vercel, Netlify, Cloudflare Pages, Firebase Hosting…). Bật HTTPS.
- Thêm công cụ đo lường (nếu dùng) kèm thông báo cookie/quyền riêng tư phù hợp.

## Báo cáo

Kết thúc bằng danh sách: đã xong / còn thiếu / cần người dùng cung cấp (giá, số công bố, ảnh, tài khoản cổng thanh toán…).
