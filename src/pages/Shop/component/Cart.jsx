
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

import { Button, Container } from "../../../components/ui";
import PageHeader from "../../../components/shared/PageHeader";
import Subscribe from "../../../components/shared/Subscribe";
import { useCart } from "../../../context/CartContext";

const Cart = () => {
  const {
    items,
    subtotal,
    updateQty,
    removeFromCart,
  } = useCart();

  const [isWrapped, setIsWrapped] = useState(false);

  const wrapPrice = isWrapped ? 10 : 0;
  const total = subtotal + wrapPrice;

  return (
    <>
      <PageHeader
        title="Shopping Cart"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Your Shopping Cart" },
        ]}
      />

      <Container as="section" className="pb-20 pt-8">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-neutral-500">
              Your cart is empty.
            </p>

            <Button
              as={Link}
              to="/shop"
              className="mt-6 rounded-lg"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="hidden grid-cols-[2fr_1fr_1.2fr_1fr] items-center border-b border-neutral-300 pb-5 font-heading text-base font-semibold text-black md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {/* Product List */}
            {items.map((item) => (
              <div
                key={item.key}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-neutral-300 py-6 md:grid-cols-[2fr_1fr_1.2fr_1fr]"
              >
                {/* Product Information */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="h-[140px] w-[104px] shrink-0 overflow-hidden bg-[#E0E0E0]">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      className="block font-heading text-sm font-bold text-black hover:underline md:text-base"
                    >
                      {item.title}
                    </Link>

                    {item.size && (
                      <p className="mt-2 text-sm text-neutral-400">
                        Size: {item.size}
                      </p>
                    )}

                    {item.color && (
                      <p className="mt-3 flex items-center gap-2 text-sm text-neutral-400">
                        Color: {item.color}
                      </p>
                    )}

                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="mt-3 cursor-pointer text-sm text-neutral-400 underline hover:text-black"
                    >
                      Remove
                    </button>

                    <p className="mt-2 text-sm font-medium md:hidden">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <span className="hidden text-sm font-medium md:block">
                  ${item.price.toFixed(2)}
                </span>

                {/* Quantity */}
                <div className="flex items-center">
                  <div className="flex h-9 items-center border border-neutral-300">
                    <button
                      onClick={() =>
                        updateQty(item.key, Math.max(1, item.qty - 1))
                      }
                      aria-label="Decrease quantity"
                      className="cursor-pointer px-2 hover:bg-neutral-100"
                    >
                      <Minus size={12} />
                    </button>

                    <span className="w-8 text-center text-sm text-neutral-500">
                      {String(item.qty).padStart(2, "0")}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.key, item.qty + 1)
                      }
                      aria-label="Increase quantity"
                      className="cursor-pointer px-2 hover:bg-neutral-100"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Product Total */}
                <span className="hidden text-right text-sm font-medium md:block">
                  ${(item.price * item.qty).toFixed(2)}
                </span>

                {/* Mobile Remove */}
                <button
                  onClick={() => removeFromCart(item.key)}
                  aria-label="Remove product"
                  className="text-neutral-400 hover:text-black md:hidden"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="mt-5 flex justify-end">
              <div className="w-full max-w-[410px]">

                {/* Gift Wrap */}
                <label className="flex cursor-pointer items-center gap-3 border-b border-neutral-300 py-5">
                  <input
                    type="checkbox"
                    checked={isWrapped}
                    onChange={(e) =>
                      setIsWrapped(e.target.checked)
                    }
                    className="h-5 w-5 cursor-pointer accent-black"
                  />

                  <span className="text-sm text-neutral-400">
                    For{" "}
                    <strong className="text-black">
                      $10.00
                    </strong>{" "}
                    Please Wrap The Product
                  </span>
                </label>

                {/* Subtotal */}
                <div className="flex justify-between py-6 font-heading text-base font-semibold text-black">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Gift Wrap Charge */}
                {isWrapped && (
                  <>
                    <div className="flex justify-between border-t border-neutral-200 py-4 text-sm text-neutral-500">
                      <span>Gift Wrapping</span>
                      <span>${wrapPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between border-t border-neutral-200 py-4 font-heading text-base font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </>
                )}

                <Button
                  as={Link}
                  to="/checkout"
                  fullWidth
                  className="mt-2 h-12 rounded-lg bg-black text-sm font-medium text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:bg-neutral-800"
                >
                  Checkout
                </Button>

                {/* View Cart */}
                <Link
                  to="/cart"
                  className="mt-3 block text-center font-heading text-sm font-semibold text-black underline underline-offset-2"
                >
                  View Cart
                </Link>

              </div>
            </div>
          </>
        )}
      </Container>

      {/* Existing Subscribe Section */}
      <Subscribe />
    </>
  );
};

export default Cart;
