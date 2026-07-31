import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../lib/AuthContext.jsx";

const links = [
  { to: "/", label: "สินค้า", end: true },
  { to: "/register", label: "สมัครสมาชิก" },
  { to: "/login", label: "เข้าสู่ระบบ" },
  { to: "/profile", label: "โปรไฟล์" },
];

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center gap-6 px-5 py-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-xl font-extrabold tracking-tight transition hover:text-sand"
        >
          Mini Shop
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-white after:!w-full" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <span className="hidden rounded-full bg-leaf/30 px-3 py-1 text-xs font-medium text-sand sm:inline">
              {user.displayName || user.email}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}
