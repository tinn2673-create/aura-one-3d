# AURA ONE — DESIGN SYSTEM SPECIFICATION V4.0

## 1. COLOR PALETTE
Hệ màu được lấy cảm hứng từ vật liệu âm học kim loại cao cấp và phong cách Dark Mode studio.

| Token | Tên màu | Giá trị HEX | Ứng dụng |
| :--- | :--- | :--- | :--- |
| `--bg-base` | Graphite Black | `#07070a` | Nền chính của toàn bộ trang web |
| `--bg-surface` | Obsidian Surface | `rgba(13, 14, 20, 0.85)` | Thẻ Card, Panel HUD, Drawer, Modal |
| `--accent-cyan` | Electric Cyan | `#00f2fe` | Điểm nhấn chính, nút CTA nổi bật, hiệu ứng sóng âm |
| `--accent-purple` | Aurora Violet | `#7928ca` | Đèn nền rim light, chip ANC, điểm nhấn công nghệ |
| `--accent-titanium`| Titanium Silver | `#d4d4d8` | Khung kim loại, viền kim hoàn, typography cao cấp |
| `--text-primary` | Pure White | `#f8fafc` | Tiêu đề chính, giá niêm yết |
| `--text-muted` | Slate Gray | `#94a3b8` | Văn bản mô tả, ghi chú kỹ thuật, nhãn phụ |
| `--success` | Emerald Green | `#10b981` | Thông báo thành công, trạng thái còn hàng |

---

## 2. TYPOGRAPHY SCALE
* **Display Heading:** `Space Grotesk` (700 Bold, Tracking -0.03em) — Dùng cho Hero Title & Tên thương hiệu.
* **H1 / Section Titles:** `Space Grotesk` (600 Semi-Bold) — Kích thước từ `2.25rem` đến `3.75rem`.
* **H2 / Subheadings:** `Space Grotesk` (500 Medium) — Kích thước từ `1.5rem` đến `2.25rem`.
* **Body Regular:** `Inter` (400 Regular) — Đọc thoải mái, `line-height: 1.6`, màu `#cbd5e1`.
* **Technical & Data Specs:** `JetBrains Mono` — Cho thông số tần số, dB, mã đơn hàng, serial number.

---

## 3. UI COMPONENTS LIBRARY
1. **Header HUD:** Cố định trên cùng, nền kính mờ `backdrop-filter: blur(16px)`, logo phát sáng, navigation links, sound toggle và nút giỏ hàng số lượng.
2. **Buttons:**
   * *Primary CTA:* Gradient Cyan sang Blue, chữ đen in đậm, đổ bóng neon.
   * *Glass Button:* Nền trong suốt 8%, viền mờ 15%, hover tăng độ sáng và trượt nhẹ 2px.
   * *Quick Floating Pills:* Nút bo tròn góc dưới màn hình (Inspect 360°, AR View, Comfort Mode).
3. **Modals & Drawers:**
   * *Slide-over Checkout Drawer:* Trượt êm từ mép phải với chiều rộng 420px.
   * *Concierge Chat Modal:* Cửa sổ trò chuyện chuyên gia âm thanh thông minh.
   * *AURA Companion App Modal:* Khung điện thoại mô phỏng với bàn chỉnh EQ và preset.
4. **Interactive Cards:** Card phụ kiện, card so sánh, accordion FAQ có hiệu ứng chuyển tiếp mượt mà.
