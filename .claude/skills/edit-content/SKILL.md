---
name: edit-content
description: Viết hoặc sửa câu chữ tiếng Việt trên website LUMI Beauty — tiêu đề, mô tả, công dụng sản phẩm, FAQ, thông báo, thông báo lỗi form, chính sách. Dùng khi thay đổi bất kỳ nội dung hiển thị nào, để giữ giọng thương hiệu và tránh vi phạm quy định quảng cáo mỹ phẩm.
---

# Viết nội dung cho LUMI Beauty

## Nội dung nằm ở đâu

| Nội dung | Vị trí |
| --- | --- |
| Thông báo đầu trang, slogan, liên hệ, phí giao | `src/data.js` → `BRAND` |
| Sản phẩm (tên, công dụng, alt ảnh) | `src/data.js` → `BASE_CATALOG`, `BRAND_CATALOG`, `PRODUCT` |
| FAQ trang chủ | `src/data.js` → `FAQ` |
| Kết cấu, thông số, cách dùng | `src/details.js` → `KINDS`, `OVERRIDES` |
| Tiêu đề, đoạn giới thiệu từng section | trong component tương ứng ở `src/components/` |

Ưu tiên sửa trong `data.js` / `details.js`; chỉ sửa component khi câu chữ nằm cứng trong JSX.

## Giọng thương hiệu

- **Dịu dàng, rõ ràng, tự tin.** Câu ngắn, dễ hiểu, xưng "bạn", thương hiệu tự gọi "LUMI".
- Viết tự nhiên như thương hiệu Việt, không dịch từng chữ từ tiếng Anh. Không trộn tiếng Anh khi đã có từ Việt ("Miễn phí giao hàng", không "Free shipping").
- Giữ nguyên tên hãng và tên sản phẩm gốc: Laneige, SK-II, LUMI Glow.
- Tiêu đề lớn theo mẫu hai dòng, dòng hai in nghiêng màu nhấn: `Mỹ phẩm chính hãng,<br/><em>chọn lọc kỹ cho bạn.</em>`
- Nút ghi rõ hành động: "Thêm vào giỏ", "Đặt hàng", "Lưu địa chỉ" — không "OK", "Gửi đi" chung chung.
- Thông báo lỗi nói rõ sai gì và sửa thế nào, có ví dụ: "Số điện thoại chưa đúng. Ví dụ: 0901234567". Không xin lỗi dài dòng.

## Quy định quảng cáo mỹ phẩm (bắt buộc)

Mỹ phẩm **không phải thuốc**. Không viết câu ngụ ý điều trị hoặc cam kết tuyệt đối.

| Không dùng | Thay bằng |
| --- | --- |
| Trị nám, trị mụn, điều trị | Giúp da trông đều màu hơn; hỗ trợ làm sạch lỗ chân lông |
| Xóa nhăn, xóa thâm, mờ nám tàn nhang | Giúp vùng da trông mịn hơn; hỗ trợ đều màu da |
| Trẻ hóa da, tái tạo da | Da trông tươi tắn, mềm mại hơn |
| Ngăn ngừa lão hóa | Bảo vệ da trước tia UV (với kem chống nắng) |
| Hiệu quả 100%, cam kết trắng sau 7 ngày | (bỏ — không cam kết kết quả hay thời gian) |
| Tốt nhất, số 1, duy nhất | (bỏ — trừ khi có bằng chứng và được pháp lý duyệt) |

- Giữ câu "Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh." ở footer.
- Không thêm chính sách mới (bảo hành, hoàn tiền, giao trong ngày…) nếu người dùng chưa xác nhận đó là chính sách thật.

## Đánh giá, số liệu, lời chứng thực

- **Không bịa** đánh giá, tên khách, điểm sao, "đã bán 10k+", số khách hàng.
- Đánh giá mẫu chỉ sinh từ `sampleReviews()` trong `src/details.js` và luôn hiện nhãn "Mẫu". Không thêm đánh giá "thật" bằng tay vào code.
- Số liệu trên trang (số sản phẩm, số thương hiệu) phải tính từ dữ liệu (`STORE_FACTS`), không gõ cứng.

## Định dạng

- Giá: luôn qua `formatVND(n)` → `399.000₫`. Viết trong câu: `499.000₫` (dấu chấm hàng nghìn, ₫ sau số, không khoảng trắng).
- Ngày: `dd/mm/yyyy` qua `Intl.DateTimeFormat('vi-VN')`.
- Số điện thoại hiển thị: `0901 234 567`.
- Không viết HOA toàn bộ câu; nhãn nhỏ dùng CSS `text-transform: uppercase`.
- Không dùng emoji làm biểu tượng nội dung.

## Sau khi sửa

Mở trang có câu vừa sửa ở cả 1280px và 390px, kiểm tra không tràn dòng, dấu tiếng Việt không bị cắt ở tiêu đề lớn.
