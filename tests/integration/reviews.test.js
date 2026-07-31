import { describe, test, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";
import { db } from "../../src/store/db.js";

describe("POST /products/:id/reviews", () => {
  let productId;

  beforeEach(() => {
    const product = db.products.insert({ name: "เสื้อยืด", price: 199 });
    productId = product.id;
  });

  afterEach(() => {
    db.reviews.deleteAll();
    db.products.deleteAll();
  });

  test("เพิ่มรีวิวสำเร็จ", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ rating: 5, comment: "ดีมาก" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      productId,
      rating: 5,
      comment: "ดีมาก",
    });
  });

  test("รับ rating เท่าขอบล่าง (1)", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ rating: 1, comment: "พอใช้" });

    expect(response.status).toBe(201);
    expect(response.body.rating).toBe(1);
  });

  test("คืน status 400 เมื่อ rating ต่ำกว่าขอบล่าง (0)", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ rating: 0, comment: "ทดสอบขอบล่าง" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("rating must be between 1 and 5");
  });

  test("คืน status 400 เมื่อ rating เกินขอบบน (6)", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ rating: 6, comment: "ทดสอบขอบบน" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("rating must be between 1 and 5");
  });

  test("คืน status 400 เมื่อ rating เป็น string", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ rating: "ห้า", comment: "ทดสอบประเภท" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("rating must be a number");
  });

  test("คืน status 400 เมื่อไม่ส่ง rating", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ comment: "ลืมส่ง rating" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("rating is required");
  });

  test("คืน status 400 เมื่อไม่ส่ง comment", async () => {
    const response = await request(app)
      .post(`/products/${productId}/reviews`)
      .send({ rating: 5 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("comment is required");
  });

  test("คืน status 404 เมื่อสินค้าไม่มีอยู่จริง", async () => {
    const response = await request(app)
      .post("/products/999999/reviews")
      .send({ rating: 5, comment: "สินค้าไม่มีจริง" });

    expect(response.status).toBe(404);
  });
});
