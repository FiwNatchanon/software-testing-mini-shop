async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  register(input) {
    return request("/users", { method: "POST", body: JSON.stringify(input) });
  },
  login(input) {
    return request("/login", { method: "POST", body: JSON.stringify(input) });
  },
  getProducts() {
    return request("/products");
  },
  getProduct(id) {
    return request(`/products/${id}`);
  },
  addReview(productId, input) {
    return request(`/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  createOrder(input) {
    return request("/orders", { method: "POST", body: JSON.stringify(input) });
  },
  updateProfile(userId, input) {
    return request(`/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },
  getDiscount(userId) {
    return request(`/users/${userId}/discount`);
  },
};
