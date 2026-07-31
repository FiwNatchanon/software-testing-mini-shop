import { Router } from "express";
import { db } from "../store/db.js";
import { addReview } from "../services/addReview.js";
import { AppError } from "../services/errors.js";

export const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.status(200).json(db.products.findAll());
});

productsRouter.get("/:id", (req, res) => {
  const product = db.products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json(product);
});

productsRouter.post("/:id/reviews", (req, res) => {
  try {
    const review = addReview(req.params.id, req.body);
    res.status(201).json(review);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "internal server error" });
  }
});
