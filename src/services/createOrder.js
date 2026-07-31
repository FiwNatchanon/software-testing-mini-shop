import { db } from "../store/db.js";
import { calculateTotal } from "../utils/calculateTotal.js";
import { AppError } from "./errors.js";

export function createOrder(input) {
  const { productId, quantity, userId } = input ?? {};

  if (!userId) {
    throw new AppError("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ", 401);
  }

  const user = db.users.findById(userId);
  if (!user) {
    throw new AppError("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ", 401);
  }

  if (!productId) {
    throw new AppError("productId is required");
  }

  const product = db.products.findById(productId);
  if (!product) {
    throw new AppError("product not found", 404);
  }

  if (typeof quantity !== "number" || quantity <= 0) {
    throw new AppError("quantity must be a positive number");
  }

  const total = calculateTotal(product.price, quantity);

  return db.orders.insert({
    userId: user.id,
    productId: product.id,
    quantity,
    total,
  });
}
