
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";

import { Button, Container } from "../ui";
import { cn } from "../../utils/cn";
import ThemeToggle from "../ui/ThemeToggle";

// মেনু বদলাতে হলে শুধু এই অ্যারে বদলান
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Deals", to: "/shop" },
  { label: "New Arrivals", to: "/shop" },
  { label: "Packages", to: "/shop" },
];

const Navbar = ({
  logo = "FASCO",
  links = navLinks,
  onCartClick,
  cartCount = 0,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 text-[var(--brand)] backdrop-blur-xl transition-colors duration-300">
      <Container className="flex h-24 items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-4xl font-bold gradient-text"
        >
          {logo}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-base text-[var(--muted)] transition-colors hover:text-[var(--accent)]",
                  isActive && "font-semibold text-[var(--accent)]"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}

          <Link
            to="/signin"
            className="text-base text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            Sign in
          </Link>

          <Button
            as={Link}
            to="/signup"
            className="rounded-xl px-8 py-4 shadow-lg"
          >
            Sign Up
          </Button>

          {/* Desktop Theme Toggle */}
          <ThemeToggle />

          {onCartClick && (
            <button
              onClick={onCartClick}
              aria-label="Open cart"
              className="relative cursor-pointer p-2"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-[11px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Mobile Theme Toggle */}
          <ThemeToggle />

          {onCartClick && (
            <button
              onClick={onCartClick}
              aria-label="Open cart"
              className="relative cursor-pointer p-2"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-[11px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="cursor-pointer p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <nav className="flex flex-col gap-5 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-[var(--brand)] lg:hidden">
          {[...links, { label: "Sign in", to: "/signin" }].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}

          <Button
            as={Link}
            to="/signup"
            onClick={() => setOpen(false)}
            className="w-fit rounded-xl"
          >
            Sign Up
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
