import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button, Container } from "../ui";
import { cn } from "../../utils/cn";

// মেনু বদলাতে হলে শুধু এই অ্যারে বদলান
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Deals", to: "/shop" },
  { label: "New Arrivals", to: "/shop" },
  { label: "Packages", to: "/shop" },
];

/**
 * Navbar
 * Props:
 *  - logo        : লোগোর লেখা
 *  - links       : মেনু লিংকের অ্যারে ({ label, to })
 *  - onCartClick : দিলে কার্ট আইকন দেখাবে (ডিজাইনে নেই, তাই ডিফল্টে লুকানো)
 *  - cartCount   : কার্টের আইটেম সংখ্যা
 */
const Navbar = ({ logo = "FASCO", links = navLinks, onCartClick, cartCount = 0 }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-page/90 backdrop-blur">
      <Container className="flex h-24 items-center justify-between">
        <Link to="/" className="font-heading text-4xl font-bold text-muted">
          {logo}
        </Link>

        {/* ডেস্কটপ */}
        <nav className="hidden items-center gap-12 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                cn("text-base text-muted transition-opacity hover:opacity-60", isActive && "font-medium")
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/signin" className="text-base text-muted transition-opacity hover:opacity-60">
            Sign in
          </Link>
          <Button
            as={Link}
            to="/signup"
            className="rounded-xl px-10 py-4 shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
          >
            Sign Up
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {onCartClick && (
            <button onClick={onCartClick} aria-label="Open cart" className="relative p-2 cursor-pointer">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 cursor-pointer">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* মোবাইল মেনু */}
      {open && (
        <nav className="flex flex-col gap-4 border-t border-neutral-200 bg-page px-4 py-6 lg:hidden">
          {[...links, { label: "Sign in", to: "/signin" }].map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-muted">
              {l.label}
            </Link>
          ))}
          <Button as={Link} to="/signup" onClick={() => setOpen(false)} className="w-fit rounded-xl">
            Sign Up
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;