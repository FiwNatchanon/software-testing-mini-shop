export function calculateTotal(price, quantity) {
  if (price < 0) {
    throw new Error("ราคาต้องไม่ติดลบ");
  }
  if (quantity > 0) {
    return price * quantity;
  }
  return 0;
}
