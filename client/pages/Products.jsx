import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page-enter">
      <header className="mb-8">
        <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
          Mini Shop
        </p>
        <h1 className="section-title">รายการสินค้า</h1>
        <p className="section-sub">เลือกสินค้าที่ต้องการ แล้วสั่งซื้อได้ทันที</p>
      </header>

      {error && <p className="alert-error mb-6">{error}</p>}

      <div className="grid gap-3">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-row animate-rise"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-ink">{product.name}</p>
                <p className="mt-1 truncate text-sm text-ink-muted">{product.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-lg font-bold text-leaf">฿{product.price}</p>
                <p className="mt-1 text-xs text-ink-muted">ดูรายละเอียด →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && !error && (
        <div className="surface mt-2 px-6 py-12 text-center">
          <p className="font-display text-lg font-semibold text-ink-soft">ยังไม่มีสินค้าในระบบ</p>
          <p className="mt-1 text-sm text-ink-muted">กลับมาใหม่เมื่อมีสินค้าเพิ่ม</p>
        </div>
      )}
    </div>
  );
}
