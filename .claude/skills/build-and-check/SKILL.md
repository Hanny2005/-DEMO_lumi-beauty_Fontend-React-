---
name: build-and-check
description: Kiểm tra website LUMI Beauty trước khi commit hoặc mở pull request — build, chạy thử các luồng chính (giỏ hàng, đặt hàng, tài khoản, chi tiết sản phẩm, đánh giá), giao diện mobile và khả năng tiếp cận. Dùng sau mỗi thay đổi code hoặc khi người dùng hỏi "đã ổn chưa", "kiểm tra giúp".
---

# Build và kiểm tra

## 1. Build

```bash
npm run build
```

Phải thành công, không cảnh báo import thiếu. Lỗi hay gặp:
- Import một export đã đổi tên trong `data.js` / `details.js`.
- Thêm id sản phẩm vào `KIND_OF` nhưng chưa có trong catalog (hoặc ngược lại).

## 2. Chạy thử luồng chính

`npm run dev`, mở DevTools Console (không được có lỗi đỏ), rồi lần lượt:

| Luồng | Cách thử | Kết quả đúng |
| --- | --- | --- |
| Điều hướng | Bấm Trang chủ / Giới thiệu / Sản phẩm; mở `#mua`, `#hoi-dap` | Đúng trang, cuộn tới section, menu tô trang đang mở |
| Chi tiết | `#sp-br-04` → đổi màu; `#sp-ba-03` → đổi dung tích | Nhãn màu trên ảnh đổi; giá đổi theo dung tích |
| Giỏ hàng | Thêm 2 phân loại khác nhau, đổi số lượng, xóa | Hai dòng riêng, đúng ảnh và giá; số trên icon giỏ đúng |
| Đặt hàng | Chưa đăng nhập → "Đăng nhập để đặt hàng" → Dùng tài khoản mẫu → Đặt hàng | Giỏ mở lại sau đăng nhập; đơn mới ở `#don-hang` trạng thái "Chờ xác nhận" |
| Tài khoản | Hủy đơn vừa đặt; thêm địa chỉ thiếu ô; liên kết ngân hàng | Hủy cần xác nhận; lỗi hiện cạnh ô; thẻ ngân hàng chỉ có 4 số cuối |
| Đánh giá | Tài khoản mẫu → `#sp-ba-05` → Viết đánh giá | Đánh giá có nhãn "Đã mua hàng"; điểm trung bình và biểu đồ cập nhật |
| Flash Sale | Trang chủ | Đồng hồ chạy; thêm vào giỏ đúng giá sale |

Xóa dữ liệu thử: DevTools → Application → Local Storage → xóa các khóa `lumi-*`.

## 3. Giao diện mobile

DevTools chế độ thiết bị, thử **360px**, **390px**, **768px**:
- Không có thanh cuộn ngang ở bất kỳ trang nào. Kiểm nhanh trong Console:
  ```js
  document.documentElement.scrollWidth - innerWidth   // phải là 0
  ```
- Menu hamburger mở/đóng được; thanh "Thêm vào giỏ" dính đáy hiện khi cuộn qua khu vực mua.
- Tiêu đề lớn không bị cắt dấu (ví dụ chữ "Được", "Ưu đãi").

## 4. Khả năng tiếp cận

- Chỉ dùng phím **Tab / Shift+Tab / Enter / Esc** đi hết luồng đặt hàng: mọi nút có viền focus thấy được; hộp thoại giữ focus bên trong, Esc đóng và focus trở về nút đã mở.
- Ảnh có `alt` tiếng Việt (ảnh trang trí `alt=""`).
- Bật "Reduce motion" của hệ điều hành: không còn chuyển động lớn, dải chữ chạy dừng.
- Lighthouse (Chrome DevTools) mục Accessibility ≥ 95.

## 5. Trước khi commit

- `git diff` không còn `console.log`, mã thử nghiệm, dữ liệu cá nhân.
- Nếu đổi cấu trúc dữ liệu lưu trong `localStorage`, đã tăng số phiên bản khóa (`lumi-cart-v1` → `v2`…).
- Commit theo Conventional Commits, mô tả tiếng Việt: `feat: …`, `fix: …`, `docs: …`.
