import { db } from "../store/db.js";
import { AppError } from "./errors.js";

export function loginUser(input) {
  const { email, password } = input ?? {};

  if (!email || !password) {
    throw new AppError("กรุณากรอกข้อมูลให้ครบ");
  }

  const user = db.users.findAll().find((user) => user.email === email);
  if (!user || user.password !== password) {
    throw new AppError("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);
  }

  const { password: _password, ...safeUser } = user;
  return safeUser;
}
