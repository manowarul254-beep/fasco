import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui";
import { cn } from "../../utils/cn";
import { useCart, FREE_SHIPPING_AT } from "../../context/CartContext";

/** MiniCart: ডান দিক থেকে খোলা কার্ট ড্রয়ার (যেকোনো পেজ থেকে খোলা যায়) */
const MiniCart = () => {
  const { items, isOpen, setIsOpen, subtotal, updateQty, removeFromCart } = useCart();
  const close = () => setIsOpen(false);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  return (
    <>
      <div
        onClick={close}
        className={cn("fixed inset-0 z-[60] bg-black/40 transition-opacity", isOpen ? "opacity-100" : "pointer-events-none opacity-0")}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-white shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="font-heading text-xl font-bold text-muted">Shopping Cart</h2>
          <button onClick={close} aria-label="Close cart" className="cursor-pointer"><X size={20} /></button>
        </div>

        <div className="px-6 pt-4 text-xs text-muted">
          {remaining > 0 ? (
            <p>Buy <b>${remaining.toFixed(2)}</b> more and get <b>free shipping</b></p>
          ) : (
            <p>You have <b>free shipping</b></p>
          )}
          <div className="mt-2 h-1 w-full bg-neutral-200"><div className="h-full bg-black transition-all" style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 && <p className="py-10 text-center text-sm text-neutral-500">Your cart is empty.</p>}
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 border-b border-neutral-100 py-4">
              <div className="h-24 w-[72px] shrink-0 bg-[#E0E0E0]">
                {item.image && <img src={item.image} alt={item.title} className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <h3 className="truncate font-heading text-sm font-bold">{item.title}</h3>
                  <button onClick={() => removeFromCart(item.key)} aria-label="Remove" className="cursor-pointer text-neutral-400 hover:text-black"><X size={14} /></button>
                </div>
                {(item.size || item.color) && (
                  <p className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                    {item.size}
                    {item.color && <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-neutral-300">
                    <button onClick={() => updateQty(item.key, item.qty - 1)} className="cursor-pointer p-1.5"><Minus size={12} /></button>
                    <span className="w-6 text-center text-xs">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)} className="cursor-pointer p-1.5"><Plus size={12} /></button>
                  </div>
                  <span className="text-sm">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-200 px-6 py-5">
          <div className="flex justify-between text-sm font-medium"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <p className="mt-1 text-xs text-neutral-500">Shipping and taxes are calculated at checkout.</p>
          <div className="mt-4 flex flex-col gap-3">
            <Button as={Link} to="/checkout" onClick={close} fullWidth>Checkout</Button>
            <Button as={Link} to="/cart" onClick={close} variant="outline" fullWidth>View Cart</Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MiniCart;