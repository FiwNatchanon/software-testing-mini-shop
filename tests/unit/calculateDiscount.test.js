import { describe, test, expect } from "vitest";
import { calculateDiscount } from "../../src/utils/calculateDiscount.js";

describe("calculateDiscount", () => {
  test("ลดราคาถูกต้องตามเปอร์เซ็นต์ที่กำหนด", () => {
    const price = 1000;
    const percentage = 10;

    const discountedPrice = calculateDiscount(price, percentage);

    expect(discountedPrice).toBe(900);
  });

  test("ไม่ลดราคาเมื่อเปอร์เซ็นต์เป็น 0", () => {
    const discountedPrice = calculateDiscount(1000, 0);
    expect(discountedPrice).toBe(1000);
  });

  test("ไม่ลดราคาเมื่อ percentage เกิน 100", () => {
    const discountedPrice = calculateDiscount(1000, 150);
    expect(discountedPrice).toBe(1000);
  });
});
