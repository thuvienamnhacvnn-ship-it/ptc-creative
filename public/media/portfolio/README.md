# Portfolio media — quy chuẩn

**Path máy:** `C:\Users\admin\ptc-creative\public\media\portfolio\`  
**URL:** `/media/portfolio/{id}/...`  
**Code:** `src/data/portfolio.ts` · `src/components/home/case-system.tsx`

## Cấu trúc mỗi case

```
portfolio/
├── p1/ … p8/
│   ├── cover.jpg   ★ bắt buộc (hoặc .png / .webp)
│   ├── 1.jpg … 6.jpg   ★ gallery
│   ├── before.jpg  (optional)
│   └── after.jpg   (optional)
```

## Map case

| ID | Case |
|----|------|
| p1 | Saigon House — Facade |
| p2 | Nagelstudio Luxe — Web |
| p3 | Retail POS — CNC |
| p4 | Dental+ — Print |
| p5 | Logistics Nord — Fleet |
| p6 | B2B Corporate Web |
| p7 | Salon Essence — CNC Letters |
| p8 | Cafe Bloom — Packaging |

## Fallback

Chưa có file → dùng `public/media/services/*` (demo).  
Thả ảnh đúng tên → site ưu tiên folder case.

## Kích thước gợi ý

| File | Tỉ lệ | Pixel |
|------|-------|-------|
| cover | 16:10 | 1600×1000 |
| gallery | 4:3 / 16:9 | 1600×1200 |
| before/after | cùng tỉ lệ cover | 1600×1000 |
