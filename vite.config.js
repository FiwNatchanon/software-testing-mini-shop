import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "client",
  plugins: [react()],
  server: {
    port: 5173,
    // Path ของ API ตรงกับที่สอนใน Lesson (ไม่มี prefix /api) เช่น /users, /products, /orders
    // Proxy เฉพาะ path เหล่านี้ไปที่ Express บน port 4000 ตอน dev
    proxy: {
      "/users": "http://localhost:4000",
      "/login": "http://localhost:4000",
      "/products": "http://localhost:4000",
      "/orders": "http://localhost:4000",
      "/health": "http://localhost:4000",
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
