import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../../components/ui";
import Subscribe from "../../components/shared/Subscribe";
import ContactForm from "./component/ContactForm";
import DeliveryForm from "./component/DeliveryForm";
import PaymentForm from "./component/PaymentForm";
import OrderSummary from "./component/OrderSummary";
import { useCart, FREE_SHIPPING_AT } from "../../context/CartContext";

const SHIPPING_COST = 40; // ফ্রি শিপিংয়ের সীমার নিচে হলে এই খরচ
const DEMO_CODES = { FASCO10: 10 }; // ডেমো ডিসকাউন্ট কোড: কোড → শতাংশ (আসল কোড ব্যাকএন্ড থেকে যাচাই করতে হবে)

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);
  const [codeStatus, setCodeStatus] = useState(null);

  const discount = (subtotal * percent) / 100;
  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_COST;
  const total = subtotal - discount + shipping;

  const handleApplyCode = (code) => {
    const found = DEMO_CODES[code.toUpperCase()];
    setPercent(found ?? 0);
    setCodeStatus(found ? "applied" : "invalid");
  };

  // ডেমো: আসল পেমেন্ট নেই, শুধু কার্ট খালি করে ধন্যবাদ দেখায়
  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setDone(true);
  };

  // অর্ডার শেষ
  if (done)
    return (
      <Container className="py-32 text-center">
        <h1 className="font-heading text-3xl font-bold text-muted">Thank you for your order!</h1>
        <p className="mt-3 text-neutral-500">This is a demo checkout, no real payment was made.</p>
        <Button as={Link} to="/shop" className="mt-8 rounded-lg">Continue shopping</Button>
      </Container>
    );

  // কার্ট খালি
  if (items.length === 0)
    return (
      <Container className="py-32 text-center">
        <h1 className="font-heading text-4xl font-bold text-muted">FASCO Demo Checkout</h1>
        <p className="mt-6 text-neutral-500">Your cart is empty.</p>
        <Button as={Link} to="/shop" className="mt-6 rounded-lg">Go to shop</Button>
      </Container>
    );

  return (
    <>
      {/* শিরোনাম + নিচে পুরো প্রস্থের দাগ */}
      <div className="border-b border-neutral-400">
        <Container className="py-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-black lg:text-4xl">FASCO Demo Checkout</h1>
        </Container>
      </div>

      {/* বাঁয়ে ফর্ম, ডানে ধূসর প্যানেল (স্ক্রিনের ডান কিনারা পর্যন্ত) */}
      <section className="overflow-hidden border-b border-neutral-400">
        <Container className="grid lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-12 py-10 lg:pr-12 lg:py-14">
            <ContactForm />
            <DeliveryForm />
            <PaymentForm />
            <Button type="submit" fullWidth className="rounded-lg py-5 shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
              Pay Now
            </Button>
          </form>

          <div className="relative border-neutral-400 lg:border-l lg:before:absolute lg:before:inset-y-0 lg:before:left-0 lg:before:top-5 lg:before:-z-10 lg:before:w-screen lg:before:bg-neutral-100">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              onApplyCode={handleApplyCode}
              codeStatus={codeStatus}
            />
          </div>
        </Container>
      </section>

      <Subscribe />
    </>
  );
};

export default Checkout;