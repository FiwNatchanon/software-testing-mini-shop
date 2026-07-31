import { Router } from "express";
import { loginUser } from "../services/loginUser.js";
import { AppError } from "../services/errors.js";

export const authRouter = Router();

authRouter.post("/", (req, res) => {
  try {
    const user = loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "internal server error" });
  }
});
