# 🎧 AURA ONE 3D — Master Audiophile Digital Experience

> **Nền tảng thương mại điện tử tương tác 3D WebGL thế hệ mới kết hợp Âm thanh Không gian 8D & Trợ lý Chuyên gia Âm học AI.**
> *A next-generation interactive 3D WebGL spatial-audio flagship e-commerce experience.*

---

## 🌐 Giới Thiệu Dự Án (Project Overview)

**AURA ONE 3D** là sản phẩm trải nghiệm số đỉnh cao (Digital Flagship Experience) được xây dựng theo tiêu chuẩn quốc tế (Awwwards / FWA style) dành cho mẫu tai nghe Hi-Res Audiophile cao cấp. Dự án mang đến cho người dùng trải nghiệm mua sắm và khám phá sản phẩm chân thực ngay trên trình duyệt mà không cần cài đặt thêm bất kỳ phần mềm nào:

1. **Khám phá 3D thời gian thực (Real-time WebGL):** Xoay 360°, đổi 8 phối màu vật liệu hoàn thiện hàng không vũ trụ và mô phỏng khắc tên laser 3D độc bản.
2. **Trải nghiệm Âm học Không gian 8D (Spatial Audio Engine):** Tái tạo trường âm vòng quanh đầu với thuật toán HRTF 0.08ms độ trễ và khả năng phát nhạc trực tuyến từ Zing MP3.
3. **Bóc tách Giải phẫu Âm học (Exploded Anatomy 3D):** Xem từng lớp linh kiện cơ khí vi mô từ màng loa Pure Beryllium 40mm đến buồng âm triệt tiêu sóng đứng.
4. **Trợ lý Âm học AI 2.0 (Concierge Neural Agent):** Trò chuyện, tư vấn gu âm nhạc, giải đáp kỹ thuật âm thanh và tự động kích hoạt tính năng trên trang.
5. **Hệ sinh thái E-Commerce & Bảo mật Toàn diện:** Giỏ hàng đa món, thanh toán VietQR với chữ ký số, chứng thư sở hữu số Hologram VIP và bảo vệ giỏ hàng chống can thiệp (Anti-Tampering Guard).

---

## ✨ 5 Tính Năng Nổi Bật Dành Cho Người Xem

| Tính Năng | Mô Tả Trải Nghiệm | Đường Dẫn Nhanh |
|---|---|---|
| 🎨 **3D Studio Configurator** | Tùy biến 8 màu sắc (Titanium, 24K Gold, Amber Copper, Cyan 8D,...), chọn đệm da cừu và gõ khắc laser tên bạn lên tai nghe. | `#/studio` |
| 🔊 **8D Spatial Audio Engine** | Trình phát nhạc Web Audio API với hiệu ứng âm thanh 8D, phổ sóng âm thanh động và 5 âm thanh thư giãn thiên nhiên 432Hz. | `#/spatial-audio` |
| 🔬 **3D Exploded Anatomy** | Chế độ bóc tách 6 lớp cấu trúc âm học với các điểm tương tác (hotspots) giải thích chi tiết vật liệu chế tác. | `#/anatomy` |
| 🤖 **AURA Concierge AI 2.0** | Trợ lý âm học AI trực quan, gợi ý bài hát theo gu, tặng voucher giảm giá $50 và hỗ trợ tra cứu bảo hành. | Nút góc dưới phải hoặc `CHUYÊN GIA AI` |
| 🛡️ **Bảo Mật & Chứng Thư Số** | Hệ thống bảo mật mã hóa SSL 256-bit, chống gian lận giá giỏ hàng, tra cứu bảo hành điện tử 3 năm và cấp chứng thư VIP. | `#/dashboard` & `#/checkout` |

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend Core:** HTML5, Modern Vanilla JavaScript (ES6+), CSS3 Glassmorphism.
- **3D Graphics Engine:** [Three.js](https://threejs.org/) (r128), OrbitControls, Raycaster, Procedural Textures & Custom PBR Shaders.
- **Animation & Transitions:** [GSAP](https://greensock.com/gsap/) 3.12 (ScrollTrigger, Motion Path).
- **Styling & Design System:** [Tailwind CSS](https://tailwindcss.com/) CDN, Typography, Custom Neon Glow Palettes.
- **Audio Processing:** Web Audio API, BiquadFilter, PannerNode (Spatial 8D simulation), Zing MP3 Streaming Integration.
- **Icons & UI Assets:** [Lucide Icons](https://lucide.dev/).
- **Backend & Security Server:** Node.js HTTP Server, Content-Security-Policy (CSP), Sliding-window IP Rate Limiter, Anti-Tampering Price Guard.

---

## 🚀 Hướng Dẫn Chạy Thử Dự Án Tại Máy Cục Bộ (Local Setup)

### Yêu cầu tiên quyết:
- Máy tính đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản 18+ trở lên).
- Trình duyệt hiện đại hỗ trợ WebGL (Chrome, Edge, Firefox, Safari).

### Các bước khởi chạy:
```bash
# 1. Clone repository về máy tính
git clone https://github.com/tinn2673-create/aura-one-3d.git

# 2. Di chuyển vào thư mục dự án
cd aura-one-3d

# 3. Khởi động máy chủ bảo mật AURA
node server.js
```
Trình duyệt sẽ tự động mở hoặc bạn có thể truy cập trực tiếp tại:
👉 **`http://localhost:3000`**

*(Lưu ý: Bạn cũng có thể mở trực tiếp tệp `index.html` bằng trình duyệt hoặc tiện ích Live Server trong VS Code).*

---

## 🌐 Hướng Dẫn Bật Trực Tuyến Qua GitHub Pages (Miễn Phí 100%)

Để bất kỳ ai trên internet cũng có thể truy cập xem trang web trực tiếp mà không cần tải code:
1. Truy cập vào Repository của bạn tại: `https://github.com/tinn2673-create/aura-one-3d`
2. Bấm vào tab **Settings** (Cài đặt) ở thanh menu trên cùng.
3. Ở menu bên trái, chọn mục **Pages**.
4. Tại phần **Build and deployment > Branch**:
   - Chọn nhánh: **`main`** (hoặc `master`).
   - Thư mục: **`/ (root)`**.
   - Bấm **Save**.
5. Sau 1-2 phút, GitHub sẽ cung cấp đường link trực tiếp của bạn:
   👉 **`https://tinn2673-create.github.io/aura-one-3d/`**

---

## 📁 Cấu Trúc Thư Mục Dự Án (Project Structure)

```
aura-one-3d/
├── index.html          # Khung giao diện trung tâm & HTML Elements
├── app.js              # Toàn bộ logic 3D Three.js, Router, Audio & E-commerce Suite
├── data.js             # Dữ liệu sản phẩm, bài nhạc, âm học, bảo mật & đánh giá
├── style.css           # Hiệu ứng Glassmorphism, animations và neon styles
├── server.js           # Máy chủ Node.js tích hợp Security Headers & Rate Limiting
├── package.json        # Thông tin dự án
├── .gitignore          # Danh sách tệp loại trừ khi đẩy lên GitHub
├── assets/
│   ├── media/          # Ảnh sản phẩm, ảnh chụp Macro màng loa, CGI Lab 3D
│   └── icons/          # Biểu tượng và favicon
└── js/ & css/          # Bản sao đồng bộ chuẩn hóa
```

---

## 📜 Bản Quyền & Giấy Phép (License)
Dự án được xây dựng phục vụ mục đích trình diễn công nghệ và trải nghiệm số âm thanh cao cấp.
Phát triển bởi **tinn2673-create** © 2026 AURA ACOUSTICS LAB.
