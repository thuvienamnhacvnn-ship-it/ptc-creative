# Media map — PTC Creative

**Root máy:** `C:\Users\admin\ptc-creative\public\media\`  
**URL web:** `http://localhost:3000/media/...`

Chỉ cần **copy ảnh/video vào đúng folder** — code đã trỏ path. Không cần sửa code nếu giữ đúng tên file.

---

## Tổng quan section → thư mục

| # | Section (homepage) | Thư mục local | Code data |
|---|--------------------|---------------|-----------|
| 01 | Banner / Hero | `banner/` | `src/data/banner-slides.ts` |
| 02 | Câu chuyện PTC | `story/` | `src/data/story-media.ts` + `story-audio.ts` |
| 03 | Nhân sự | `team/` | `src/data/team.ts` |
| 04 | Quy trình | `process/` | (decor/optional stills) |
| 05 | Dịch vụ | `services/{slug}/` | `src/data/services.ts` |
| 06 | Giải pháp ngành | `solutions/{slug}/` | `src/data/industry-media.ts` |
| 07 | Portfolio | `portfolio/{case-id}/` | `src/data/portfolio.ts` |
| 08 | Bảng giá | `pricing/` | optional |
| 09 | Blog | `blog/` | optional covers |
| 10 | FAQ | `faq/` | optional |
| 11 | Liên hệ | `contact/` | optional |
| — | About / khác | `about/` | optional |
| — | Capability 3D | `capability/{layer}/` | `src/data/capability-stack.ts` |

---

## Chi tiết file chuẩn

### `banner/`
```
1.png … 6.png          # slide ảnh
slide-1.mp4 … slide-6.mp4   # optional video
```
URL: `/media/banner/1.png`

### `story/`
```
1a.jpg / 1a.jpeg / 1a.png   # founders base
2a.jpg / 2a.png             # founders hover
Story.mp3                   # AI audio
```

### `team/`
```
Phu.png | Phu.jpg
Phu2.mp4 | phu.mp4
Tuyen.png | tuyen.jpg
tuyen.mp4
Chung.png | chung.jpg
chung.mp4
```

### `process/`
```
bg.jpg          # optional nền section
1.jpg … 4.jpg   # optional minh họa 4 phase Signal→Launch
```

### `services/{cnc|werbetechnik|printing|branding|website|marketing}/`
```
cover.png | cover.jpg
1.jpg … 4.jpg
poster.jpg (optional)
```

### `solutions/{restaurant|nail|salon|shop|dental|logistics|enterprise}/`
```
cover.jpg | cover.png
1.jpg … 4.jpg
hero.mp4 | demo.mp4 | process.mp4 (optional)
poster.jpg
```

### `portfolio/{p1…p8}/`
```
cover.jpg | cover.png
1.jpg … 6.jpg
before.jpg
after.jpg
```
| Case id | Tên gợi ý |
|---------|-----------|
| p1 | Saigon House — Facade |
| p2 | Nagelstudio Luxe — Web |
| p3 | Retail POS — CNC |
| p4 | Dental+ — Print |
| p5 | Logistics Nord — Fleet |
| p6 | B2B Corporate Web |
| p7 | Salon Essence — CNC Letters |
| p8 | Cafe Bloom — Packaging |

### `pricing/` · `blog/` · `contact/` · `faq/` · `about/`
```
cover.jpg   # optional hero/still khi mở rộng UI
```

### `capability/{brand|digital|growth|material|production}/`
```
1.png … 6.png
loop.mp4 (optional)
```

---

## Kích thước khuyến nghị

| Loại | Tỉ lệ | Pixel gợi ý | Format |
|------|-------|-------------|--------|
| Banner / hero | 16:9 | 1920×1080 | jpg/png/webp |
| Story founders | 3:4 hoặc 4:5 | 1200×1600 | jpg/png |
| Team portrait | 3:4 | 900×1200 | png/jpg |
| Service cover | 4:5 hoặc 16:9 | 1200×1500 / 1600×900 | png/jpg |
| Portfolio cover | 16:10 | 1600×1000 | jpg |
| Portfolio gallery | 4:3 / 16:9 | 1600×1200 | jpg |
| Before / after | cùng tỉ lệ | 1600×1000 | jpg |
| Video | 16:9 hoặc 9:16 portrait | H.264 mp4 | mp4 |

---

## Lưu ý

1. Tên file **đúng** như bảng (phân biệt hoa/thường trên Linux deploy).
2. Ưu tiên `.jpg` / `.png` / `.webp` — code có fallback nhiều extension.
3. Sau khi thả file → **hard refresh** browser (`Ctrl+F5`).
4. Portfolio: nếu chưa có file trong `portfolio/p1/`, site vẫn fallback sang `services/*` cho đến khi bạn bổ sung.
