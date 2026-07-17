# Solutions media — Giải pháp theo ngành

**Path:** `C:\Users\admin\ptc-creative\public\media\solutions\{slug}\`  
**URL:** `/media/solutions/{slug}/...`

## Folders (slug)

| Folder | File cover hiện có | Ngành |
|--------|-------------------|--------|
| `restaurant/` | `restaurant.png` | Nhà hàng / F&B |
| `nail/` | `nail.png` | Nail |
| `salon/` | `salon.png` | Salon |
| `shop/` | `shop.png` | Shop / Retail |
| `dental/` | `dental.png` | Dental |
| `logistics/` | `logistics.png` | Logistics |
| `enterprise/` | `enterprise.png` | Enterprise |

## Naming (ưu tiên code)

| File | Mô tả |
|------|--------|
| `{slug}.png` | ★ Cover chính (đang dùng) |
| `{slug}.jpg` / `.webp` | Cover alternate |
| `cover.png` | Cover alias |
| `1.png` … `6.png` | Gallery |
| `hero.mp4` | Video (optional) |
| `poster.jpg` | Poster video |

## Code

`src/data/industry-media.ts` — probe theo thứ tự trên; thiếu file → fallback `public/media/services/*`.
