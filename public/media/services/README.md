# Ảnh dịch vụ (Service media) — PTC Creative

## Cấu trúc thư mục local

```
public/media/services/
├── cnc/
│   ├── cnc.png              ★ cover chính (tên = folder)
│   └── cover.png            (bản sao tương thích code cũ)
├── werbetechnik/
│   ├── werbetechnik.png
│   └── cover.png
├── printing/
│   ├── printing.png
│   └── cover.png
├── branding/
│   ├── branding.png
│   └── cover.png
├── website/
│   ├── website.png
│   └── cover.png
└── marketing/
    ├── marketing.png
    └── cover.png
```

**Đường dẫn máy:**  
`C:\Users\admin\ptc-creative\public\media\services\{folder}\`

**URL web:**  
`/media/services/{folder}/{folder}.png`  
Ví dụ: `http://localhost:3000/media/services/cnc/cnc.png`

---

## Map folder ↔ dịch vụ

| Folder local | Slug (code) | File cover |
|--------------|-------------|------------|
| `cnc` | `cnc-manufacturing` | `/media/services/cnc/cnc.png` |
| `werbetechnik` | `werbetechnik` | `/media/services/werbetechnik/werbetechnik.png` |
| `printing` | `printing` | `/media/services/printing/printing.png` |
| `branding` | `branding` | `/media/services/branding/branding.png` |
| `website` | `website` | `/media/services/website/website.png` |
| `marketing` | `marketing` | `/media/services/marketing/marketing.png` |

Khai báo trong: `src/data/services.ts` (`cover` + `gallery[]`).

---

## Quy ước đặt tên

1. Ảnh chính: **`{folder}.png`** (trùng tên thư mục dịch vụ)
2. Tùy chọn: `cover.png`, `1.png`…`4.png` cho gallery mở rộng
3. Format: png/jpg/webp · khuyến nghị ~1600×900 hoặc 4:5 portrait

---

## Ghi chú

Section Dịch vụ (Spectrum) dùng `service.cover` → probe fallbacks trong `home-services.tsx`.  
Portfolio / ngành / process dùng `cover.png` và `{folder}.png` làm fallback.
