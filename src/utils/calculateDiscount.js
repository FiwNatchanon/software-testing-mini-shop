export function calculateDiscount(price, percentage) {
  if (percentage > 100) {
    console.log("ส่วนลดห้ามเกิน 100%");
    return price;
  }
  return price - (price * percentage) / 100;
}
