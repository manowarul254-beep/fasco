import { Link } from "react-router-dom";
import { Container } from "../ui";

/**
 * Pageheader: পেজের শিরোনাম + ব্রেডক্রাম (Shop, Cart, Checkout... সব পেজে একই)
 * Props:
 *  - title  : "Fashion"
 *  - crumbs : [{ label: "Home", to: "/" }, { label: "Fashion" }]  (শেষটায় to লাগবে না)
 */
const Pageheader = ({ title, crumbs = [] }) => {
  return (
    <Container as="section" className="py-10 text-center lg:py-14">
      <h1 className="font-heading text-4xl font-bold text-muted lg:text-5xl">{title}</h1>

      {crumbs.length > 0 && (
        <nav className="mt-3 flex items-center justify-center gap-3 text-xs text-muted">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-3">
              {c.to ? <Link to={c.to} className="hover:underline">{c.label}</Link> : <span>{c.label}</span>}
              {i < crumbs.length - 1 && <span className="text-neutral-400">›</span>}
            </span>
          ))}
        </nav>
      )}
    </Container>
  );
};

export default Pageheader;