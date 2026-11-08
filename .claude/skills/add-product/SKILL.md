---
name: add-product
description: Thêm, sửa hoặc xóa sản phẩm trong cửa hàng LUMI Beauty (danh mục, ảnh, giá, phân loại màu/dung tích, kết cấu, loại da) và đưa sản phẩm vào Flash Sale. Dùng khi người dùng muốn thay đổi danh sách sản phẩm.
---

# Thêm / sửa sản phẩm

Sản phẩm cần có mặt ở **3 nơi**, thiếu một nơi là trang chi tiết lỗi hoặc thiếu thông tin.

## 1. Ảnh — `src/assets/`

- Hàng của LUMI / không rõ hãng → `src/assets/catalog/`; hàng thương hiệu → `src/assets/brands/`.
- Đặt tên tiếp theo số hiện có (`p16.jpg`, `b31.jpg`). JPG, tỉ lệ khoảng 9:10 (thẻ hiển thị `aspect-ratio: 299/333`), cạnh dài ≤ 1200px, < 200KB.
- Import ở đầu `src/data.js`, cạnh các import cùng thư mục:
  ```js
  import b31 from './assets/brands/b31.jpg';
  ```

## 2. Dữ liệu — `src/data.js`

Thêm một dòng vào cuối mảng phù hợp:

- Hàng LUMI / không rõ hãng → `BASE_CATALOG`, helper `c(n, img, cat, name, benefits, price, alt)` → id `ba-NN`.
- Hàng thương hiệu → `BRAND_CATALOG`, helper `b(n, img, cat, brand, name, benefits, price, alt)` → id `br-NN`.

| Tham số | Quy tắc |
| --- | --- |
| `n` | Số tiếp theo trong mảng (id tạo từ số này, **không đổi id đã có** vì giỏ hàng/đơn hàng/đánh giá lưu theo id) |
| `cat` | Một id trong `CATEGORIES`: `skin`, `makeup`, `body`, `fragrance` |
| `brand` | Tên hãng đúng chính tả của hãng; `''` nếu chưa rõ |
| `name` | Tên ngắn tiếng Việt theo loại, ví dụ `'Nước cân bằng'` (thẻ hiển thị hãng riêng ở trên) |
| `benefits` | 2–3 cụm ngắn, **không** mang tính điều trị (xem skill `edit-content`) |
| `price` | Số nguyên VND, không dấu chấm: `329000` |
| `alt` | Mô tả ảnh bằng tiếng Việt cho người dùng trình đọc màn hình |

Nhóm mới (ví dụ "Tóc"): thêm vào `CATEGORIES` `{ id: 'hair', label: 'Chăm sóc tóc' }`. Bộ lọc tự hiện.

## 3. Chi tiết — `src/details.js`

- Thêm `'<id>': '<kind>'` vào `KIND_OF`. Kind có sẵn: `cleanser`, `cleanser-foam`, `micellar`, `toner`, `essence`, `serum`, `moisturizer`, `sunscreen`, `sheet-mask`, `scrub`, `clay-mask`, `eye-cream`, `mist`, `lip-balm`, `body-lotion`, `foundation`, `cushion`, `powder`, `blush`, `eyeshadow`, `mascara`, `eyeliner`, `lip-tint`, `lip-cream`, `lipstick`, `perfume`.
- Thông tin khác với loại chung (tên màu thật của hãng, dung tích thật, loại da) → thêm vào `OVERRIDES`:
  ```js
  'br-31': {
    skin: ['dau', 'hon-hop'],
    specs: { 'Nhóm hương': 'Hương gỗ' },
    variants: { label: 'Dung tích', type: 'size', options: [
      { key: '150ml', name: '150ml', mult: 1 },
      { key: '300ml', name: '300ml', mult: 1.7 },
    ] },
  },
  ```
  - `type: 'shade'` cho màu, mỗi option có `hex`. `mult` là hệ số giá so với `price` (làm tròn nghìn).
  - `skin` dùng id trong `SKIN_TYPES`: `dau`, `kho`, `hon-hop`, `nhay-cam`, `thuong`; `null` để ẩn mục (son, mascara, nước hoa).
  - `level` 0–100 là vị trí trên thanh Lỏng ↔ Đặc; `null` để ẩn thanh.
- Loại hoàn toàn mới: thêm vào `KINDS` theo mẫu các kind có sẵn (đủ `group`, `texture`, `level`, `skin`, `variants`, `specs`, `howTo`). `group` quyết định bộ câu đánh giá mẫu: `skin`, `base`, `lip`, `eye`, `body`, `fragrance`.

## Flash Sale

Thêm vào `FLASH_SALE.items` trong `src/data.js`: `{ id: 'br-31', salePrice: 259000, limit: 30 }`. `salePrice` phải nhỏ hơn `price`. Hiển thị tối đa 8 món đẹp nhất (lưới 4 cột).

## Xóa sản phẩm

Xóa dòng trong mảng catalog, xóa khỏi `KIND_OF`, `OVERRIDES`, `FLASH_SALE.items`. Không đánh số lại các id còn lại. Có thể giữ file ảnh nếu đơn hàng cũ còn tham chiếu.

## Kiểm tra

1. `npm run dev`, mở `#sp-<id>`: thấy ảnh, giá, phân loại, kết cấu, loại da, đánh giá.
2. `#bo-suu-tap`: thẻ mới xuất hiện đúng nhóm, đúng bộ lọc thương hiệu.
3. Thêm vào giỏ với một phân loại → dòng giỏ có đúng ảnh, tên phân loại, giá.
4. Chạy skill `build-and-check`.
