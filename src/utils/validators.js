export function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return (
    typeof password === "string" &&
    /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/.test(password)
  );
}
