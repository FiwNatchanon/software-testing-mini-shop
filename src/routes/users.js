import { Router } from "express";
import { registerUser } from "../services/registerUser.js";
import { updateProfile } from "../services/updateProfile.js";
import { getUserDiscount } from "../services/getUserDiscount.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../services/errors.js";

export const usersRouter = Router();

usersRouter.post("/", (req, res) => {
  try {
    const user = registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "internal server error" });
  }
});

usersRouter.get("/:id/discount", (req, res) => {
  try {
    const discount = getUserDiscount(req.params.id, userRepository);
    res.status(200).json({ userId: Number(req.params.id), discount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

usersRouter.patch("/:id", (req, res) => {
  try {
    const user = updateProfile(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "internal server error" });
  }
});
