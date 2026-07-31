import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [error, setError] = useState("");
  const redirectTo = location.state?.from || "/profile";

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const user = await api.register(form);
      setUser(user);
      navigate(redirectTo);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-enter mx-auto max-w-md">
      <header className="mb-8">
        <h1 className="section-title">สมัครสมาชิก</h1>
        <p className="section-sub">สร้างบัญชีเพื่อสั่งซื้อและจัดการโปรไฟล์</p>
      </header>

      <form onSubmit={handleSubmit} className="surface space-y-4 p-6">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="field"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="label">Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            className="field"
            placeholder="••••••••"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-mist-soft px-3 py-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={form.acceptedTerms}
            onChange={(event) => updateField("acceptedTerms", event.target.checked)}
            className="size-4 rounded border-ink/20 text-leaf accent-leaf"
          />
          ยอมรับเงื่อนไขการใช้งาน
        </label>

        <button type="submit" className="btn-primary w-full">
          สมัครสมาชิก
        </button>

        {error && <p className="alert-error">{error}</p>}
      </form>

      <p className="mt-5 text-center text-sm text-ink-muted">
        มีบัญชีแล้ว?{" "}
        <Link
          to="/login"
          state={{ from: redirectTo }}
          className="font-semibold text-leaf hover:underline"
        >
          เข้าสู่ระบบ
        </Link>
      </p>
    </div>
  );
}
