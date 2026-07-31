import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../lib/AuthContext.jsx";

export default function CreateOrder() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api
      .getProduct(productId)
      .then(setProduct)
      .catch((err) => setError(err.message));
  }, [productId]);

  if (!user) {
    return (
      <div className="page-enter surface mx-auto max-w-md px-6 py-12 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">ต้องเข้าสู่ระบบก่อน</h1>
        <p className="mt-2 text-ink-muted">กรุณาเข้าสู่ระบบก่อนสั่งซื้อสินค้า</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            state={{ from: `/order/${productId}` }}
            className="btn-primary"
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            to="/register"
            state={{ from: `/order/${productId}` }}
            className="btn-ghost"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const created = await api.createOrder({
        productId: Number(productId),
        quantity: Number(quantity),
        userId: user.id,
      });
      setOrder(created);
    } catch (err) {
      setError(err.message);
    }
  }

  if (order) {
    return (
      <div className="page-enter surface mx-auto max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-leaf-soft text-2xl text-leaf">
          ✓
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">สร้างออเดอร์สำเร็จ</h1>
        <div className="mt-5 space-y-2 rounded-xl bg-mist-soft px-4 py-4 text-left text-sm">
          <p className="flex justify-between">
            <span className="text-ink-muted">Order</span>
            <span className="font-semibold">#{order.id}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-ink-muted">จำนวน</span>
            <span className="font-semibold">{order.quantity} ชิ้น</span>
          </p>
          <p className="flex justify-between border-t border-ink/5 pt-2">
            <span className="text-ink-muted">ยอดรวม</span>
            <span className="font-display text-lg font-bold text-leaf">฿{order.total}</span>
          </p>
        </div>
        <button onClick={() => navigate("/")} className="btn-primary mt-6 w-full">
          กลับไปหน้ารายการสินค้า
        </button>
      </div>
    );
  }

  const estimated =
    product && quantity > 0 ? Number(product.price) * Number(quantity) : null;

  return (
    <div className="page-enter mx-auto max-w-md">
      <header className="mb-8">
        <Link to={product ? `/products/${product.id}` : "/"} className="btn-ghost -ml-4 mb-3">
          ← กลับ
        </Link>
        <h1 className="section-title">สร้างออเดอร์</h1>
        <p className="section-sub">ยืนยันจำนวนก่อนสั่งซื้อ</p>
      </header>

      {product && (
        <div className="surface mb-4 flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-sm text-ink-muted">สินค้า</p>
            <p className="font-display text-lg font-bold text-ink">{product.name}</p>
          </div>
          <p className="font-semibold text-leaf">฿{product.price} / ชิ้น</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="surface p-6">
        <label className="label">จำนวน</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="field mb-4"
        />

        {estimated != null && (
          <p className="mb-5 flex items-center justify-between rounded-xl bg-mist-soft px-4 py-3 text-sm">
            <span className="text-ink-muted">ยอดโดยประมาณ</span>
            <span className="font-display text-lg font-bold text-leaf">฿{estimated}</span>
          </p>
        )}

        <button type="submit" className="btn-primary w-full">
          ยืนยันสั่งซื้อ
        </button>

        {error && <p className="alert-error mt-4">{error}</p>}
      </form>
    </div>
  );
}
