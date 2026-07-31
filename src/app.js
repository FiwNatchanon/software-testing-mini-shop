import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { ordersRouter } from "./routes/orders.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", authRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
