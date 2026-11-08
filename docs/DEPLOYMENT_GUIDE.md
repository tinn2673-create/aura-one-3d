# AURA ONE — DEPLOYMENT & ENVIRONMENT SETUP GUIDE

## 1. MÔI TRƯỜNG PHÁT TRIỂN (LOCAL DEV)
Dự án được xây dựng theo kiến trúc Zero-Dependency Build với khả năng chạy ngay lập tức hoặc build qua Vite.

### Yêu cầu:
* Node.js v18 trở lên (Đã cài Node v24 trên máy).
* Trình duyệt hỗ trợ WebGL (Chrome, Edge, Firefox, Safari, Brave).

### Cách chạy:
```powershell
cd 'C:\Users\Trung Tin\.gemini\antigravity\scratch\aura-one-3d'

# Cách 1: Chạy trực tiếp qua local serve
npx serve

# Cách 2: Chạy qua Vite Dev Server
npm run dev
```

---

## 2. TRIỂN KHAI PRODUCTION (PRODUCTION DEPLOYMENT)
* **Vercel / Cloudflare Pages:**
  * Build command: `npm run build` (hoặc deploy trực tiếp thư mục tĩnh).
  * Output directory: `dist` hoặc root.
  * Caching Header: Thiết lập `max-age=31536000, immutable` cho các tài nguyên tĩnh.
