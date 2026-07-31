import { db } from "../store/db.js";
import { isValidEmail, isValidPassword } from "../utils/validators.js";
import { AppError } from "./errors.js";

export function registerUser(input) {
  const { email, password, confirmPassword, acceptedTerms } = input ?? {};

  if (!email) {
    throw new AppError("email is required");
  }
  if (!isValidEmail(email)) {
    throw new AppError("email format is invalid");
  }
  if (!password) {
    throw new AppError("password is required");
  }
  if (!isValidPassword(password)) {
    throw new AppError(
      "password must be 8-20 characters long and contain both letters and numbers"
    );
  }
  if (confirmPassword !== password) {
    throw new AppError("confirmPassword does not match password");
  }
  if (!acceptedTerms) {
    throw new AppError("acceptedTerms must be true");
  }

  const existing = db.users
    .findAll()
    .find((user) => user.email === email);
  if (existing) {
    throw new AppError("email is already registered", 409);
  }

  const user = db.users.insert({ email, password, membership: "basic" });
  const { password: _password, ...safeUser } = user;
  return safeUser;
}
