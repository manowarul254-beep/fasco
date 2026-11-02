
import { useState } from "react";
import {
  ArrowUpDown,
  Eye,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Share2,
  Star,
  Truck,
} from "lucide-react";

import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";

import { Button } from "../../../components/ui";
import StarRating from "../../../components/ui/StarRating";
import { cn } from "../../../utils/cn";
import { useCart } from "../../../context/CartContext";
import SaleTimer from "./SaleTimer";

// Product sizes
const sizes = ["M", "L", "XL", "XXL"];

// Product colors
const colors = [
  { name: "Blue", hex: "#8FB1CC" },
  { name: "Black", hex: "#000000" },
  { name: "Pink", hex: "#FFC9D6" },
];

// Date formatter
const fmt = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

const label = "font-heading text-sm font-bold text-black";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();

  const [size, setSize] = useState("M");
  const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const stock = Number(product.stock) || 0;
  const price = Number(product.price) || 0;

  const soldOut = stock <= 0;
  const stockPct = Math.max(8, Math.min(100, stock));

  // Estimated delivery date
  const from = new Date();
  from.setDate(from.getDate() + 5);

  const to = new Date();
  to.setDate(to.getDate() + 9);

  // Add product to cart
  const handleAddToCart = () => {
    if (soldOut) return;

    const cartProduct = {
      ...product,
      id: product.id,
      title: product.title,
      image: product.image || product.thumbnail,
      price,
    };

    addToCart(cartProduct, {
      qty,
      size,
      color: color.hex,
    });
  };

  return (
    <div>
      <p className="font-heading text-[11px] text-neutral-600">
        FASCO
      </p>

      {/* Product title and wishlist */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-black">
          {product.title}
        </h1>

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => setLiked(!liked)}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200"
        >
          <Star
            size={16}
            className={cn(liked && "fill-black")}
          />
        </button>
      </div>

      {/* Rating */}
      <div className="mt-1 flex items-center gap-2">
        <StarRating rating={product.rating} />
        <span className="text-xs text-black">
          ({product.reviewCount})
        </span>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-center gap-2">
        <p className="text-xl font-medium text-black">
          ${price.toFixed(2)}
        </p>

        {product.oldPrice && (
          <span className="text-xs text-neutral-400 line-through">
            ${Number(product.oldPrice).toFixed(2)}
          </span>
        )}

        {product.discount > 0 && (
          <span className="rounded-sm bg-[#E5484D] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            Save {product.discount}%
          </span>
        )}
      </div>

      {/* People viewing */}
      <p className="mt-6 flex items-center gap-2 text-sm text-neutral-500">
        <Eye size={16} className="text-black" />
        24 people are viewing this right now
      </p>

      {/* Sale timer */}
      <div className="mt-5">
        <SaleTimer />
      </div>

      {/* Stock */}
      <p className="mt-6 text-xs text-neutral-600">
        {soldOut ? (
          <span className="text-red-500">Sold out</span>
        ) : (
          <>
            Only <b>{stock}</b> item(s) left in stock!
          </>
        )}
      </p>

      <div className="mt-2 h-1 w-full bg-neutral-200">
        <div
          className="h-full bg-[#E5484D]"
          style={{ width: `${stockPct}%` }}
        />
      </div>

      {/* Size selection */}
      <p className={cn(label, "mt-7")}>
        Size: <span className="font-normal">{size}</span>
      </p>

      <div className="mt-3 flex gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            className={cn(
              "flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-sm px-3 text-xs transition",
              size === s
                ? "bg-black text-white"
                : "bg-neutral-50 text-black hover:bg-neutral-100"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Color selection */}
      <p className={cn(label, "mt-6")}>
        Color: <span className="font-normal">{color.name}</span>
      </p>

      <div className="mt-3 flex gap-3">
        {colors.map((c) => (
          <button
            key={c.name}
            type="button"
            aria-label={c.name}
            onClick={() => setColor(c)}
            className={cn(
              "h-8 w-8 cursor-pointer rounded-full p-[3px] ring-1 transition",
              color.name === c.name
                ? "ring-black"
                : "ring-transparent"
            )}
          >
            <span
              className="block h-full w-full rounded-full"
              style={{ backgroundColor: c.hex }}
            />
          </button>
        ))}
      </div>

      {/* Quantity */}
      <p className={cn(label, "mt-6")}>
        Quantity
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div className="flex h-11 items-center border border-neutral-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-9 cursor-pointer items-center justify-center hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={12} />
          </button>

          <span className="w-9 text-center text-xs">
            {qty}
          </span>

          <button
            type="button"
            aria-label="Increase quantity"
            disabled={qty >= stock}
            onClick={() =>
              setQty((q) => Math.min(stock, q + 1))
            }
            className="flex h-full w-9 cursor-pointer items-center justify-center hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Add to cart */}
        <Button
          type="button"
          variant="outline"
          onClick={handleAddToCart}
          disabled={soldOut}
          className="h-11 min-w-[200px] flex-1 rounded-sm font-heading text-sm font-bold"
        >
          {soldOut ? "Sold Out" : "Add to cart"}
        </Button>
      </div>

      {/* Additional actions */}
      <div className="mt-12 flex flex-wrap items-center gap-6 border-b border-neutral-200 pb-5 text-xs text-black">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 hover:opacity-60"
        >
          <ArrowUpDown size={14} />
          Compare
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 hover:opacity-60"
        >
          <MessageCircle size={14} />
          Ask a question
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 hover:opacity-60"
        >
          <Share2 size={14} />
          Share
        </button>
      </div>

      {/* Delivery */}
      <div className="mt-5 space-y-3 text-xs text-black">
        <p className="flex items-center gap-2">
          <Truck size={14} />

          <span>
            <b className="font-heading">
              Estimated Delivery:
            </b>{" "}
            {fmt(from)} - {fmt(to)}
          </span>
        </p>

        <p className="flex items-center gap-2">
          <Package size={14} />

          <span>
            <b className="font-heading">
              Free Shipping &amp; Returns:
            </b>{" "}
            On all orders over $75
          </span>
        </p>
      </div>

      {/* Payment methods */}
      <div className="mt-6 bg-neutral-50 px-4 py-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-3xl text-neutral-500">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcJcb />
          <FaCcDiscover />
          <FaCcDinersClub />
        </div>

        <p className="mt-3 font-heading text-xs font-bold text-black">
          Guarantee safe &amp; secure checkout
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
