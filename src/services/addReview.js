import { db } from "../store/db.js";
import { AppError } from "./errors.js";

export function addReview(productId, input) {
  const product = db.products.findById(productId);
  if (!product) {
    throw new AppError("product not found", 404);
  }

  const { rating, comment } = input ?? {};

  if (rating === undefined || rating === null) {
    throw new AppError("rating is required");
  }
  if (typeof rating !== "number") {
    throw new AppError("rating must be a number");
  }
  if (rating < 1 || rating > 5) {
    throw new AppError("rating must be between 1 and 5");
  }
  if (!comment) {
    throw new AppError("comment is required");
  }

  return db.reviews.insert({
    productId: product.id,
    rating,
    comment,
  });
}
