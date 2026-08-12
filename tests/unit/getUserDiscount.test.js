import { vi, describe, test, expect } from "vitest";
import { getUserDiscount } from "../../src/services/getUserDiscount.js";

describe("getUserDiscount", () => {
  test("คืนส่วนลด 20 สำหรับ user ระดับ gold", () => {
    // Arrange
    const userId = 1;
    const userRepository = {
      findById: vi.fn().mockReturnValue({ id: 1, membership: "gold" }),
    };

    // Act
    const discount = getUserDiscount(userId, userRepository);

    // Assert
    expect(discount).toBe(20);
  });

  test("คืนส่วนลด 10 สำหรับ user ระดับ silver", () => {
    // Arrange
    const userId = 2;
    const userRepository = {
      findById: vi.fn().mockReturnValue({ id: 2, membership: "silver" }),
    };

    // Act
    const discount = getUserDiscount(userId, userRepository);

    // Assert
    expect(discount).toBe(10);
  });

  test("คืนส่วนลด 0 สำหรับ user ระดับ basic", () => {
    // Arrange
    const userId = 3;
    const userRepository = {
      findById: vi.fn().mockReturnValue({ id: 3, membership: "basic" }),
    };

    // Act
    const discount = getUserDiscount(userId, userRepository);

    // Assert
    expect(discount).toBe(0);
  });

  test("throw error เมื่อไม่พบ user (null)", () => {
    // Arrange
    const userId = 999;
    const userRepository = {
      findById: vi.fn().mockReturnValue(null),
    };

    // Act & Assert
    expect(() => getUserDiscount(userId, userRepository)).toThrow("ไม่พบ user นี้ในระบบ");
  });

  test("throw error เมื่อไม่พบ user (undefined)", () => {
    // Arrange
    const userId = 1000;
    const userRepository = {
      findById: vi.fn().mockReturnValue(undefined),
    };

    // Act & Assert
    expect(() => getUserDiscount(userId, userRepository)).toThrow("ไม่พบ user นี้ในระบบ");
  });

  test("เรียก findById ด้วย userId ที่ถูกต้องเพียงครั้งเดียว", () => {
    // Arrange
    const userId = 5;
    const userRepository = {
      findById: vi.fn().mockReturnValue({ id: 5, membership: "silver" }),
    };

    // Act
    getUserDiscount(userId, userRepository);

    // Assert
    expect(userRepository.findById).toHaveBeenCalledWith(5);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});
