import { useState } from "react";

/**
 * OrderSummary: ডানের ধূসর প্যানেল (আইটেম, ডিসকাউন্ট কোড, Subtotal / Shipping / Total)
 * Props:
 *  - items, subtotal, shipping, discount (টাকার অঙ্ক), total
 *  - onApplyCode : (code) => {}
 *  - codeStatus  : null | "applied" | "invalid"
 */
const OrderSummary = ({ items, subtotal, shipping, discount = 0, total, onApplyCode, codeStatus }) => {
  const [code, setCode] = useState("");

  return (
    <aside className="px-0 py-10 lg:px-16 lg:py-14">
      {/* আইটেম */}
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.key} className="flex items-start gap-4">
            <div className="relative h-28 w-28 shrink-0 bg-[#E0E0E0]">
              {item.image && <img src={item.image} alt="" className="h-full w-full object-cover" />}
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {item.qty}
              </span>
            </div>
            <div className="min-w-0 flex-1 pt-6">
              <p className="font-heading text-base font-bold text-black">{item.title}</p>
              <div className="mt-1 flex items-center justify-between text-sm text-neutral-700">
                <span className="flex items-center gap-2">
                  {item.color && <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />}
                  {item.size}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ডিসকাউন্ট কোড */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onApplyCode?.(code.trim());
        }}
        className="mt-8 flex gap-4"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount code"
          className="h-14 min-w-0 flex-1 bg-white px-5 text-sm outline-none placeholder:text-neutral-700"
        />
        <button
          type="submit"
          className="h-14 w-32 cursor-pointer rounded-lg bg-black text-sm text-white shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
        >
          Apply
        </button>
      </form>
      {codeStatus === "applied" && <p className="mt-2 text-xs text-green-600">Discount applied.</p>}
      {codeStatus === "invalid" && <p className="mt-2 text-xs text-red-500">Invalid discount code.</p>}

      {/* হিসাব */}
      <div className="mt-8 space-y-4 text-sm text-neutral-800">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        {discount > 0 && (
          <div className="flex justify-between"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-black"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
    </aside>
  );
};

export default OrderSummary;