import { ArrowUp, ShoppingCart } from "lucide-react";

/**
 * FloatingActions: ডানদিকের নিচের কোণায় কার্ট আর "উপরে যান" বাটন (দুটোই সবসময় দেখায়)
 * Props:
 *  - cartCount   : কার্টে কয়টা আইটেম
 *  - onCartClick : কার্ট বাটনে ক্লিক করলে কী হবে (MiniCart খোলা)
 */
const FloatingActions = ({ cartCount = 0, onCartClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-8">
      {/* কার্ট: কালো গোল-কোণা চৌকো */}
      <button
        aria-label="Open cart"
        onClick={onCartClick}
        className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-black text-white shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 cursor-pointer"
      >
        <ShoppingCart size={22} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px]">
            {cartCount}
          </span>
        )}
      </button>

      {/* তীর: পাতলা বর্ডারওয়ালা সাদা গোল */}
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-black bg-white text-black transition-transform hover:scale-105 cursor-pointer"
      >
        <ArrowUp size={28} strokeWidth={1.25} />
      </button>
    </div>
  );
};

export default FloatingActions;