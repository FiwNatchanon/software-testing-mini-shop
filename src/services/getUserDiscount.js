export function getUserDiscount(userId, userRepository) {
  const user = userRepository.findById(userId);

  if (!user) {
    throw new Error("ไม่พบ user นี้ในระบบ");
  }

  if (user.membership === "gold") {
    return 20;
  }
  if (user.membership === "silver") {
    return 10;
  }
  return 0;
}
