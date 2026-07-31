import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const redirectTo = location.state?.from || "/profile";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const user = await api.login({ email, password });
      setUser(user);
      navigate(redirectTo);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-enter mx-auto max-w-md">
      <header className="mb-8">
        <h1 className="section-title">เข้าสู่ระบบ</h1>
        <p className="section-sub">ยินดีต้อนรับกลับสู่ Mini Shop</p>
      </header>

      <form onSubmit={handleSubmit} className="surface space-y-4 p-6">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="field"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          เข้าสู่ระบบ
        </button>

        {error && <p className="alert-error">{error}</p>}
      </form>

      <p className="mt-5 text-center text-sm text-ink-muted">
        ยังไม่มีบัญชี?{" "}
        <Link
          to="/register"
          state={{ from: redirectTo }}
          className="font-semibold text-leaf hover:underline"
        >
          สมัครสมาชิก
        </Link>
      </p>
    </div>
  );
}
