import { Link } from "react-router-dom";
import StarRating from "../ui/StarRating";

/**
 * ProductCard: একটা প্রোডাক্টের কার্ড (Home, Shop, Product পেজে একই কার্ড লুপ করে দেখানো হয়)
 *
 * product এর আকার (API থেকে এনে data/productApi.js এ এই আকারে বদলানো হয়):
 *  { id, title, brand, image, rating, reviewCount, price, almostSoldOut }
 */
const ProductCard = ({ product }) => {
  const { id, title, brand, image, rating, reviewCount, price, almostSoldOut } = product;

  return (
    <Link
      to={`/product/${id}`}
      className="block rounded-lg bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)]"
    >
      <div className="aspect-[336/244] overflow-hidden rounded-lg bg-[#E0E0E0]">
        {image && <img src={image} alt={title} className="h-full w-full object-cover" />}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-medium text-muted">{title}</h3>
          {brand && <p className="text-xs text-neutral-500">{brand}</p>}
        </div>
        <StarRating rating={rating} />
      </div>

      <p className="mt-6 text-xs text-muted">({reviewCount}) Customer Reviews</p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-2xl font-medium text-muted">${price}</p>
        {almostSoldOut && <span className="text-xs text-red-500">Almost Sold Out</span>}
      </div>
    </Link>
  );
};

export default ProductCard;