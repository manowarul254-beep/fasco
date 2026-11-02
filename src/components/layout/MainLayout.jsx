import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ShopNavbar from "./ShopNavbar";
import Footer from "../shared/Footer";
import FloatingActions from "../shared/FloatingActions";
import MiniCart from "../shared/MiniCart";
import { useCart } from "../../context/CartContext";

// Home পেজে Navbar, বাকি সব পেজে ShopNavbar
const MainLayout = () => {
  const { count, setIsOpen } = useCart();
  const { pathname } = useLocation();

  // পেজ বদলালে উপরে ফিরে যায়
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const openCart = () => setIsOpen(true);

  return (
    <>
      {pathname === "/" ? <Navbar /> : <ShopNavbar cartCount={count} onCartClick={openCart} />}
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions cartCount={count} onCartClick={openCart} />
      <MiniCart />
    </>
  );
};

export default MainLayout;