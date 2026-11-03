import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Shop/component/Cart";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ConfirmationCode from "./pages/Auth/ConfirmationCode";
import NewPassword from "./pages/Auth/NewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navbar + Footer ওয়ালা পেজ */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Navbar/Footer ছাড়া পেজ */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirmation-code" element={<ConfirmationCode />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* ভুল ঠিকানা দিলে হোমে ফিরিয়ে দেয় */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;