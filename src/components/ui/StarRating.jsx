import { Star } from "lucide-react";

/** StarRating: rating (০-৫) অনুযায়ী কমলা তারা দেখায় */
const StarRating = ({ rating = 0, size = 18 }) => (
  <div className="flex gap-0.5" aria-label={`Rating ${rating} out of 5`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <Star
        key={i}
        size={size}
        strokeWidth={0}
        className={i < Math.round(rating) ? "fill-[#FF9F0D]" : "fill-neutral-300"}
      />
    ))}
  </div>
);

export default StarRating;