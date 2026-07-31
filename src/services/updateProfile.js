import { db } from "../store/db.js";
import { AppError } from "./errors.js";

export function updateProfile(userId, input) {
  const user = db.users.findById(userId);
  if (!user) {
    throw new AppError("user not found", 404);
  }

  const { displayName } = input ?? {};
  if (!displayName) {
    throw new AppError("displayName is required");
  }

  const updated = db.users.update(userId, { displayName });
  const { password: _password, ...safeUser } = updated;
  return safeUser;
}
