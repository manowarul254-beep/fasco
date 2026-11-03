import { Link } from "react-router-dom";

/**
 * ProductTile: Shop পেজের প্রোডাক্ট (বক্স ছাড়া; ছবি, নাম, দাম, রঙের গোল)
 *
 * product এর আকার:
 *  { id, title, image, price, oldPrice, soldOut, colors: ["#fff", ...] }
 */
const ProductTile = ({ product }) => {
  const { id, title, image, price, oldPrice, soldOut, colors = [] } = product;

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#E0E0E0]">
        {image && (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {soldOut && (
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-400/80 text-center text-[9px] font-bold leading-tight text-white">
            SOLD
            <br />
            OUT
          </span>
        )}
      </div>

      <h3 className="mt-4 truncate font-heading text-sm font-bold text-black">{title}</h3>

      <p className="mt-1 flex items-center gap-2 text-xs text-black">
        <span>${price.toFixed(2)}</span>
        {oldPrice && <span className="text-orange-300 line-through">${oldPrice.toFixed(2)}</span>}
      </p>

      {colors.length > 0 && (
        <div className="mt-3 flex gap-2">
          {colors.map((c) => (
            <span
              key={c}
              className="h-4 w-4 rounded-full border border-black/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      )}
    </Link>
  );
};

export default ProductTile;