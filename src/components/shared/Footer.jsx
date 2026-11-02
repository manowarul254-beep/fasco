import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";

const links = [
  { label: "Support Center", to: "/support" },
  { label: "Invoicing", to: "/invoicing" },
  { label: "Contract", to: "/contract" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ,s", to: "/faq" },
];

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container>
        <div className="flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
          <Link to="/" className="font-heading text-3xl font-medium text-muted">
            FASCO
          </Link>

          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-10">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-base text-muted transition hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="pb-4 text-center text-xs text-muted">
          Copyright © 2022 Xpro . All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;