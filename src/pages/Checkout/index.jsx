
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../../components/ui";
import Subscribe from "../../components/shared/Subscribe";
import ContactForm from "./component/ContactForm";
import DeliveryForm from "./component/DeliveryForm";
import PaymentForm from "./component/PaymentForm";
import OrderSummary from "./component/OrderSummary";
import { useCart, FREE_SHIPPING_AT } from "../../context/CartContext";

const SHIPPING_COST = 40;
const DEMO_CODES = { FASCO10: 10 };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setDone(true);
  };

  // Order completed
  if (done) {
    return (
      <Container className="w-full min-w-0 py-20 text-center sm:py-32">
        <h1 className="font-heading text-3xl font-bold text-muted">
          Thank you for your order!
        </h1>

        <p className="mt-3 text-neutral-500">
          This is a demo checkout, no real payment was made.
        </p>

        <Button as={Link} to="/shop" className="mt-8 rounded-lg">
          Continue shopping
        </Button>
      </Container>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <Container className="w-full min-w-0 py-20 text-center sm:py-32">
        <h1 className="font-heading text-3xl font-bold text-muted sm:text-4xl">
          FASCO Demo Checkout
        </h1>

        <p className="mt-6 text-neutral-500">
          Your cart is empty.
        </p>

        <Button as={Link} to="/shop" className="mt-6 rounded-lg">
          Go to shop
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Checkout Header */}
      <div className="w-full border-b border-neutral-400">
        <Container className="w-full min-w-0 py-6 text-center sm:py-8">
          <h1 className="font-heading text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
            FASCO Demo Checkout
          </h1>
        </Container>
      </div>

      {/* Checkout Content */}
      <section className="w-full min-w-0 overflow-x-hidden border-b border-neutral-400">
        <Container className="grid w-full min-w-0 grid-cols-1 gap-0 lg:grid-cols-2">

          {/* Left Side - Forms */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full min-w-0 max-w-full flex-col gap-10 py-8 sm:gap-12 sm:py-10 lg:py-14 lg:pr-12"
          >
            <div className="w-full min-w-0 max-w-full">
              <ContactForm />
            </div>

            <div className="w-full min-w-0 max-w-full">
              <DeliveryForm />
            </div>

            <div className="w-full min-w-0 max-w-full">
              <PaymentForm />
            </div>

            {/* Pay Now Button */}
            <div className="w-full min-w-0 max-w-full">
              <Button
                type="submit"
                fullWidth
                className="w-full max-w-full rounded-lg py-4 shadow-[0_15px_30px_rgba(0,0,0,0.2)] sm:py-5"
              >
                Pay Now
              </Button>
            </div>
          </form>

          {/* Right Side - Order Summary */}
          <div className="relative w-full min-w-0 max-w-full border-t border-neutral-300 lg:border-l lg:border-t-0 lg:border-neutral-400 lg:before:absolute lg:before:inset-y-0 lg:before:left-0 lg:before:top-5 lg:before:-z-10 lg:before:w-screen lg:before:bg-neutral-100">
            <div className="w-full min-w-0 max-w-full">
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
          </div>

        </Container>
      </section>

      <Subscribe />
    </>
  );
};

export default Checkout;
