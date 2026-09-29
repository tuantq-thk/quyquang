# Last Day Is Today 🎉

Landing page vui nhộn dành tặng **Vũ Huy Hoàng** từ **Team Thất Kiếm Anh Hùng**. Có bộ đếm ngày làm việc đến 15/10/2026, ảnh chân dung và sổ lời nhắn có thể chia sẻ qua JSONBin.

## Chạy trên máy

```bash
npm install
cp .env.example .env.local
npm run dev
```

Tạo bản build bằng `npm run build`; chạy kiểm tra bộ đếm bằng `npm test`.

## Thêm ảnh chân dung

Đặt ảnh bạn muốn dùng vào `public/qq.png`. Vite sẽ chép ảnh này vào bản deploy. Nếu file chưa có, trang vẫn hiển thị emoji 😎 làm ảnh thay thế.

## Bật JSONBin khi deploy GitHub Pages

1. Trong JSONBin, tạo một bin JSON ban đầu có nội dung `{ "messages": [] }` và chép Bin ID. Dùng object này thay cho mảng rỗng `[]` nếu form Dashboard báo dữ liệu không được để trống.
2. Tạo **Access Key** riêng, cấp quyền đọc và cập nhật Bins cần thiết. Không dùng Master Key.
3. Trong GitHub repository, vào **Settings → Secrets and variables → Actions → Variables** và tạo:
   - `JSONBIN_BIN_ID`: Bin ID ở bước 1.
   - `JSONBIN_ACCESS_KEY`: Access Key ở bước 2.
4. Chạy lại workflow deploy (Actions → Deploy static site to GitHub Pages → Run workflow) hoặc push commit mới.

Khi chạy local, điền hai giá trị tương ứng trong `.env.local`. Cấu hình production được đọc từ Actions Variables trong workflow `.github/workflows/deploy.yml`.

**Giới hạn bảo mật của website tĩnh:** Vite đưa các biến `VITE_*` vào JavaScript tải xuống trình duyệt. Vì vậy JSONBin Access Key sẽ công khai với người xem trang dù được lưu trong GitHub Variables. Chỉ dùng Access Key giới hạn quyền, dành riêng cho bin này và dữ liệu lưu bút không nhạy cảm. Không dùng Master Key. Nếu cần giữ khóa bí mật hoặc chống spam chắc chắn, cần một backend/proxy có xác thực.

## Lưu lời nhắn

Khi JSONBin đã cấu hình, mọi khách truy cập đọc và gửi lời nhắn vào cùng sổ. Bin lưu object dạng `{ "messages": [...] }`; trang cũng đọc được bin cũ có record là một mảng. Nếu chưa cấu hình hoặc dịch vụ tạm lỗi, trang đọc và lưu lời nhắn trên trình duyệt hiện tại bằng `localStorage`. Chế độ local không đồng bộ giữa các thiết bị.

Nếu JSONBin từ chối cập nhật, giao diện sẽ hiển thị HTTP status và thông báo của API. `401` thường là Access Key không hợp lệ; `403` thường thiếu quyền Bins Read hoặc Update; `404` thường là Bin ID sai. Khi đồng bộ từ xa lỗi nhưng localStorage hoạt động, lời nhắn vẫn được lưu trên thiết bị và form sẽ báo rằng chưa đồng bộ lên JSONBin.

## Bộ đếm

`src/config.js` đặt ngày cuối là `2026-10-15`. Bộ đếm không tính hôm nay, tính ngày cuối nếu là ngày thường và bỏ thứ Bảy, Chủ nhật. Với ngày 29/09/2026, kết quả là 12 ngày làm việc. `npm test` kiểm tra quy tắc này.

## Deploy

Đưa các file của repo lên **thư mục gốc repository** để `package.json` và `.github/workflows/deploy.yml` nằm ngay ở root. Trong GitHub, mở **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**. Push lên `main` hoặc `master` để workflow kiểm thử, build và deploy; hoặc chạy thủ công trong tab **Actions**. Không chọn deploy trực tiếp từ branch vì repository cần Vite build trước khi publish.
