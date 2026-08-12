import { describe, test, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";
import { db } from "../../src/store/db.js";

describe("POST /users", () => {
  beforeEach(() => {
    db.users.deleteAll();
  });

  afterEach(() => {
    db.users.deleteAll();
  });

  test("สมัครสมาชิกสำเร็จเมื่อข้อมูลครบและถูกต้อง", async () => {
    // Arrange
    const userData = {
      email: "somchai.jai@example.com",
      password: "Pass1234",
      confirmPassword: "Pass1234",
      acceptedTerms: true,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.id).toBeTypeOf("number");
    expect(response.body.email).toBe("somchai.jai@example.com");
    expect(response.body).not.toHaveProperty("password");
  });

  test("ไม่ส่ง email", async () => {
    // Arrange
    const userData = {
      password: "Pass1234",
      confirmPassword: "Pass1234",
      acceptedTerms: true,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("email is required");
  });

  test("confirmPassword ไม่ตรงกับ password", async () => {
    // Arrange
    const userData = {
      email: "mali.suk@example.com",
      password: "Pass1234",
      confirmPassword: "Pass9999",
      acceptedTerms: true,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("confirmPassword does not match password");
  });

  test("ไม่ยินยอมรับเงื่อนไขการใช้งาน", async () => {
    // Arrange
    const userData = {
      email: "nuch.wan@example.com",
      password: "Pass1234",
      confirmPassword: "Pass1234",
      acceptedTerms: false,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("acceptedTerms must be true");
  });

  test("password สั้นกว่าขอบเขตล่าง 1 ตัว (ยาว 7)", async () => {
    // Arrange
    const userData = {
      email: "bee.short@example.com",
      password: "Pass123",
      confirmPassword: "Pass123",
      acceptedTerms: true,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "password must be 8-20 characters long and contain both letters and numbers"
    );
  });

  test("password ยาวพอดีขอบเขตล่าง (ยาว 8) และมีทั้งตัวอักษรและตัวเลข", async () => {
    // Arrange
    const userData = {
      email: "bee.ok@example.com",
      password: "Pass1234",
      confirmPassword: "Pass1234",
      acceptedTerms: true,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.id).toBeTypeOf("number");
    expect(response.body.email).toBe("bee.ok@example.com");
  });

  test("email ซ้ำกับที่มีอยู่ในระบบแล้ว", async () => {
    // Arrange
    db.users.insert({
      email: "dup.user@example.com",
      password: "Pass1234",
      membership: "basic",
    });

    const userData = {
      email: "dup.user@example.com",
      password: "Pass1234",
      confirmPassword: "Pass1234",
      acceptedTerms: true,
    };

    // Act
    const response = await request(app).post("/users").send(userData);

    // Assert
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("email is already registered");
  });
});
