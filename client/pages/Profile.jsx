import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/AuthContext.jsx";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="page-enter surface mx-auto max-w-md px-6 py-12 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">ยังไม่ได้เข้าสู่ระบบ</h1>
        <p className="mt-2 text-ink-muted">
          กรุณา{" "}
          <Link to="/login" className="font-semibold text-leaf hover:underline">
            เข้าสู่ระบบ
          </Link>{" "}
          หรือ{" "}
          <Link to="/register" className="font-semibold text-leaf hover:underline">
            สมัครสมาชิก
          </Link>{" "}
          ก่อน
        </p>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      const updated = await api.updateProfile(user.id, { displayName });
      setUser(updated);
      setMessage("บันทึกโปรไฟล์สำเร็จ");
    } catch (err) {
      setMessage(err.message);
    }
  }

  const isSuccess = message.includes("สำเร็จ");

  return (
    <div className="page-enter mx-auto max-w-md space-y-5">
      <header>
        <h1 className="section-title">โปรไฟล์</h1>
        <p className="section-sub">จัดการข้อมูลบัญชีของคุณ</p>
      </header>

      <div className="surface p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-leaf-soft font-display text-xl font-bold text-leaf">
            {(user.displayName || user.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-ink-muted">Email</p>
            <p className="font-semibold text-ink">{user.email}</p>
            {user.displayName && (
              <p className="mt-1 text-sm text-ink-muted">
                ชื่อที่แสดง: <span className="font-medium text-ink-soft">{user.displayName}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="surface p-6">
        <label className="label">ชื่อที่แสดง (Display Name)</label>
        <input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="field mb-4"
          placeholder="ชื่อที่ต้องการแสดง"
        />
        <button type="submit" className="btn-primary">
          บันทึก
        </button>
        {message && (
          <p className={`mt-4 ${isSuccess ? "alert-ok" : "alert-error"}`}>{message}</p>
        )}
      </form>
    </div>
  );
}
