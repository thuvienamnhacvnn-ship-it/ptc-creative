# Capability Stack · Media local

Đặt ảnh/video vào folder layer. Hệ thống **tự dò** file theo thứ tự.

## Thư mục

```
public/media/capability/
├── brand/
├── material/
├── production/
├── digital/          ← ví dụ: 1.png (đã dùng)
├── growth/
└── README.md
```

## Tên file được nhận (ưu tiên từ trên xuống)

### Video
1. `loop.mp4`
2. `loop.webm`
3. `1.mp4`

### Ảnh
1. `1.png` / `1.jpg` / `1.jpeg` / `1.webp`
2. `poster.jpg` / `poster.png` / `poster.webp`

### Overlay (tuỳ chọn)
1. `mark.svg` / `mark.png`

## Ví dụ

Bạn đã thêm:

```
public/media/capability/digital/1.png
```

→ Layer **Digital** sẽ dùng ảnh này làm nền 3D.

Muốn ảnh cho Brand:

```
public/media/capability/brand/1.png
```

Sau khi thêm file: **hard refresh** trình duyệt (`Ctrl+Shift+R`).
