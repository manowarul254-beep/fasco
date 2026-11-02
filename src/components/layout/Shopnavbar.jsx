import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Container } from "../ui";
import { cn } from "../../utils/cn";

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
    "pb-1 text-sm text-muted transition-opacity hover:opacity-60",
    isActive && "border-b border-black text-black"
  );

const ShopNavbar = ({ logo = "FASCO", cartCount = 0, onCartClick }) => {
  const [open, setOpen] = useState(false);

  const cartButton = (
    <button onClick={onCartClick} aria-label="Open cart" className="relative cursor-pointer p-2">
      <ShoppingBag size={20} />
      {cartCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
          {cartCount}
        </span>
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-page/90 backdrop-blur">
      <Container className="flex h-24 items-center justify-between">
        <Link to="/" className="font-heading text-4xl font-bold text-muted">
          {logo}
        </Link>

        <nav className="hidden items-center gap-12 lg:flex">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.label}
            </NavLink>
          ))}

          <div className="group relative">
            <button className="flex cursor-pointer items-center gap-1 pb-1 text-sm text-muted">
              Pages <ChevronDown size={12} />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-40 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {pagesMenu.map((p) => (
                <Link key={p.label} to={p.to} className="block px-4 py-2 text-sm text-muted hover:bg-neutral-50">
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <button aria-label="Search" className="cursor-pointer p-2"><Search size={20} /></button>
          <Link to="/signin" aria-label="Account" className="p-2"><User size={20} /></Link>
          <button aria-label="Wishlist" className="cursor-pointer p-2"><Heart size={20} /></button>
          {cartButton}
        </div>

        <div className="flex items-center lg:hidden">
          {cartButton}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="cursor-pointer p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-neutral-200 bg-page px-4 py-6 lg:hidden">
          {[...links, ...pagesMenu].map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-muted">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default ShopNavbar;