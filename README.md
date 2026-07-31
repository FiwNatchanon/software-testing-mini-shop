# Mini Shop

Starter Project สำหรับ Software Testing Prework (Topic 1, 2, 3, 5) เป็น Mini Shop แบบ Fullstack บางๆ
(Frontend + Backend) มี API จริง, In-memory Store (ไม่ต่อ Database จริง), และไม่มีระบบชำระเงิน

## ติดตั้ง

```bash
npm install
```

## รันโปรเจกต์

รัน Backend และ Frontend พร้อมกัน (แนะนำ):

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

หรือรันแยกทีละส่วน:

```bash
npm run dev:server   # Express API เท่านั้น (port 4000)
npm run dev:client   # Vite dev server เท่านั้น (port 5173)
```

## รัน Test

```bash
npx vitest run              # รัน Test ทั้งหมดครั้งเดียว
npx vitest                  # รันแบบ watch mode
npx vitest run --coverage   # รันพร้อมสร้าง Coverage Report
```

Coverage Report (HTML) จะถูกสร้างไว้ที่ `coverage/index.html` เปิดดูด้วย Browser ได้

## โครงสร้างโปรเจกต์

```text
src/            Backend (Express API)
  utils/        Pure function (ไม่มี dependency ภายนอก)
  services/     Business logic (บางตัวรับ dependency แบบ inject ได้)
  repositories/ ชั้นเข้าถึงข้อมูล (คุยกับ store โดยตรง)
  store/        In-memory store แทน Database
  routes/       HTTP route ของแต่ละ resource
  app.js        Express app (ไม่ .listen() ที่นี่ ใช้กับ supertest ได้ตรงๆ)
  server.js     จุดเริ่มรันจริง (.listen())
client/         Frontend (Vite + React + Tailwind)
tests/
  unit/         Unit Test
  integration/  Integration Test
```

## Tech Stack

- Node.js + Express
- Vite + React + Tailwind CSS
- Vitest + supertest + @vitest/coverage-v8
