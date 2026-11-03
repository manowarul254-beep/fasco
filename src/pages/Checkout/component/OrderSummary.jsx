
import { useState } from "react";

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  discount = 0,
  total,
  onApplyCode,
  codeStatus,
}) => {
  const [code, setCode] = useState("");

  return (
    <aside className="w-full min-w-0 bg-[var(--surface-secondary)] px-0 py-8 text-[var(--brand)] transition-colors duration-300 sm:py-10 lg:px-10 lg:py-14">

      {/* Order Items */}
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex min-w-0 items-start gap-4"
          >
            {/* Product Image */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)] sm:h-28 sm:w-28">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              )}

              <span className="absolute -right-0 -top-0 flex h-6 w-6 items-center justify-center rounded-bl-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-xs font-semibold text-white">
                {item.qty}
              </span>
            </div>

            {/* Product Details */}
            <div className="min-w-0 flex-1 pt-2 sm:pt-5">
              <p className="break-words font-heading text-sm font-bold text-[var(--brand)] sm:text-base">
                {item.title}
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-soft)] sm:text-sm">
                <span className="flex items-center gap-2">
                  {item.color && (
                    <span
                      className="h-3 w-3 rounded-full border border-[var(--border)]"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                  )}

                  {item.size}
                </span>

                <span className="font-semibold text-[var(--brand)]">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onApplyCode?.(code.trim());
        }}
        className="mt-8 flex w-full min-w-0 gap-3 sm:gap-4"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount code"
          className="h-12 min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--brand)] outline-none transition-colors placeholder:text-[var(--text-soft)] focus:border-[var(--accent)] sm:h-14 sm:px-5"
        />

        <button
          type="submit"
          className="h-12 w-24 shrink-0 cursor-pointer rounded-lg gradient-primary text-sm font-semibold shadow-lg transition-opacity hover:opacity-90 sm:h-14 sm:w-32"
        >
          Apply
        </button>
      </form>

      {/* Discount Status */}
      {codeStatus === "applied" && (
        <p className="mt-3 text-xs font-medium text-green-500">
          Discount applied successfully.
        </p>
      )}

      {codeStatus === "invalid" && (
        <p className="mt-3 text-xs font-medium text-red-500">
          Invalid discount code.
        </p>
      )}

      {/* Price Summary */}
      <div className="mt-8 space-y-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">

        <div className="flex justify-between gap-3">
          <span>Subtotal</span>
          <span className="font-medium text-[var(--brand)]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between gap-3">
            <span>Discount</span>
            <span className="font-medium text-green-500">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between gap-3">
          <span>Shipping</span>
          <span className="font-medium text-[var(--brand)]">
            {shipping === 0
              ? "Free"
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between gap-3 border-t border-[var(--border)] pt-5 text-base font-bold text-[var(--brand)]">
          <span>Total</span>
          <span className="gradient-text text-lg">
            ${total.toFixed(2)}
          </span>
        </div>

      </div>
    </aside>
  );
};

export default OrderSummary;
