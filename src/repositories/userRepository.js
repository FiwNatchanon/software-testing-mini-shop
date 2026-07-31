import { db } from "../store/db.js";

export const userRepository = {
  findById(userId) {
    return db.users.findById(userId);
  },
  findByEmail(email) {
    return db.users.findAll().find((user) => user.email === email) ?? null;
  },
  insert(data) {
    return db.users.insert(data);
  },
  update(userId, patch) {
    return db.users.update(userId, patch);
  },
};
