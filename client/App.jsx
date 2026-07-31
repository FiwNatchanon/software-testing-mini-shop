import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CreateOrder from "./pages/CreateOrder.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(31,107,82,0.08),_transparent_70%)]"
      />
      <Navbar />
      <main className="relative mx-auto max-w-3xl px-5 py-10 sm:px-6">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order/:productId" element={<CreateOrder />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
