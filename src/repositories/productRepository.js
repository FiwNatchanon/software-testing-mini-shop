import { db } from "../store/db.js";

export const productRepository = {
  findById(productId) {
    return db.products.findById(productId);
  },
  findAll() {
    return db.products.findAll();
  },
  insert(data) {
    return db.products.insert(data);
  },
};
