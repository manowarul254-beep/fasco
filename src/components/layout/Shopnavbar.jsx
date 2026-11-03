
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { Container } from "../ui";
import { cn } from "../../utils/cn";
import ThemeToggle from "../ui/ThemeToggle";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Products", to: "/shop" },
];

const pagesMenu = [
  { label: "Sign In", to: "/signin" },
  { label: "Sign Up", to: "/signup" },
  { label: "Cart", to: "/cart" },
  { label: "Checkout", to: "/checkout" },
];

const linkClass = ({ isActive }) =>
  cn(
    "pb-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]",
    isActive &&
      "border-b border-[var(--accent)] font-semibold text-[var(--accent)]"
  );

const ShopNavbar = ({
  logo = "FASCO",
  cartCount = 0,
  onCartClick,
}) => {
  const [open, setOpen] = useState(false);

  const cartButton = (
    <button
      onClick={onCartClick}
      aria-label="Open cart"
      className="relative cursor-pointer rounded-lg p-2 transition-colors hover:bg-[var(--surface-secondary)]"
    >
      <ShoppingBag size={20} />

      {cartCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-[10px] text-white">
          {cartCount}
        </span>
      )}
    </button>
  );

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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-12 lg:flex">

          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              className={linkClass}
            >
              {l.label}
            </NavLink>
          ))}

          {/* Pages Dropdown */}
          <div className="group relative">
            <button className="flex cursor-pointer items-center gap-1 pb-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
              Pages
              <ChevronDown size={14} />
            </button>

            <div className="invisible absolute left-0 top-full z-50 w-44 translate-y-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {pagesMenu.map((p) => (
                <Link
                  key={p.label}
                  to={p.to}
                  className="block px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--accent)]"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-1 lg:flex">

          <button
            aria-label="Search"
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-[var(--surface-secondary)]"
          >
            <Search size={20} />
          </button>

          <Link
            to="/signin"
            aria-label="Account"
            className="rounded-lg p-2 transition-colors hover:bg-[var(--surface-secondary)]"
          >
            <User size={20} />
          </Link>

          <button
            aria-label="Wishlist"
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-[var(--surface-secondary)]"
          >
            <Heart size={20} />
          </button>

          {cartButton}

          {/* Theme Toggle */}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          <ThemeToggle />

          {cartButton}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-[var(--surface-secondary)]"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {open && (
        <nav className="flex flex-col gap-4 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-[var(--brand)] lg:hidden">

          {[...links, ...pagesMenu].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default ShopNavbar;
