import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/AuthContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    api
      .getProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleSubmitReview(event) {
    event.preventDefault();
    setReviewMessage("");
    try {
      await api.addReview(id, { rating: Number(rating), comment });
      setReviewMessage("ส่งรีวิวสำเร็จ ขอบคุณสำหรับความคิดเห็น");
      setComment("");
    } catch (err) {
      setReviewMessage(err.message);
    }
  }

  if (error) return <p className="alert-error page-enter">{error}</p>;
  if (!product) {
    return (
      <p className="page-enter text-ink-muted animate-pulse">กำลังโหลด...</p>
    );
  }

  const isSuccess = reviewMessage.includes("สำเร็จ");

  return (
    <div className="page-enter space-y-8">
      <div>
        <Link to="/" className="btn-ghost -ml-4 mb-4">
          ← กลับรายการสินค้า
        </Link>
        <h1 className="section-title">{product.name}</h1>
        <p className="section-sub">{product.description}</p>
        <p className="mt-4 font-display text-3xl font-bold text-leaf">฿{product.price}</p>

        {user ? (
          <Link to={`/order/${product.id}`} className="btn-primary mt-6">
            สั่งซื้อสินค้านี้
          </Link>
        ) : (
          <div className="mt-6 space-y-3">
            <Link
              to="/login"
              state={{ from: `/order/${product.id}` }}
              className="btn-primary"
            >
              เข้าสู่ระบบเพื่อสั่งซื้อ
            </Link>
            <p className="text-sm text-ink-muted">
              ยังไม่มีบัญชี?{" "}
              <Link
                to="/register"
                state={{ from: `/order/${product.id}` }}
                className="font-semibold text-leaf hover:underline"
              >
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmitReview} className="surface animate-rise-slow p-6">
        <h2 className="font-display text-xl font-bold text-ink">เขียนรีวิว</h2>
        <p className="mt-1 mb-5 text-sm text-ink-muted">แบ่งปันประสบการณ์ของคุณกับสินค้านี้</p>

        <label className="label">คะแนน (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          className="field mb-4"
        />

        <label className="label">ความคิดเห็น</label>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="field mb-5 resize-none"
          rows={3}
        />

        <button type="submit" className="btn-primary">
          ส่งรีวิว
        </button>

        {reviewMessage && (
          <p className={`mt-4 ${isSuccess ? "alert-ok" : "alert-error"}`}>
            {reviewMessage}
          </p>
        )}
      </form>
    </div>
  );
}
