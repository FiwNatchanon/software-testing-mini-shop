import { Router } from "express";
import { createOrder } from "../services/createOrder.js";
import { AppError } from "../services/errors.js";

export const ordersRouter = Router();

ordersRouter.post("/", (req, res) => {
  try {
    const order = createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "internal server error" });
  }
});
