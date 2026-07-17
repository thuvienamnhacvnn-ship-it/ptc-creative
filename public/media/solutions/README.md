# Solutions media — Giải pháp theo ngành

**Path máy:** `C:\Users\admin\ptc-creative\public\media\solutions\{slug}\`  
**URL:** `/media/solutions/{slug}/...`

## Folders (slug)

| Folder | Ngành | Màu gợi ý |
|--------|-------|-----------|
| restaurant | Nhà hàng / F&B | #f5b041 |
| nail | Nail | #ff6bb5 |
| salon | Salon | #c77dff |
| shop | Shop / Retail | #3dc4ff |
| dental | Dental | #2ee6c8 |
| logistics | Logistics | #8b95ff |
| enterprise | Enterprise | #a8b8d0 |

## Files mỗi folder

```
cover.jpg | cover.png     ★ cover chính
1.jpg … 6.jpg             ★ gallery
hero.mp4 | demo.mp4       ★ video (optional)
process.mp4
poster.jpg                # poster video
```

## Fallback

Chưa có file → site dùng ảnh demo từ `public/media/services/*`  
(branding, cnc, printing, website, werbetechnik, marketing).

Code: `src/data/industry-media.ts`
