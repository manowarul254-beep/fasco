import { useState } from "react";
import { cn } from "../../../utils/cn";

const ShopProductCard = ({ product }) => {
  const { name, price, oldPrice, image, colors = [], soldOut } = product;
  const [active, setActive] = useState(0);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {soldOut && (
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-400/80 text-center text-[9px] font-bold uppercase leading-tight text-white">
            Sold
            <br />
            Out
          </span>
        )}
      </div>

      <h3 className="mt-3 font-heading text-sm font-bold text-brand">{name}</h3>

      <p className="mt-1 text-sm text-brand">
        ${price.toFixed(2)}
        {oldPrice && (
          <span className="ml-2 text-xs text-neutral-400 line-through">
            ${oldPrice.toFixed(2)}
          </span>
        )}
      </p>

      <div className="mt-2 flex items-center gap-2">
        {colors.map((color, i) => (
          <button
            key={color + i}
            type="button"
            aria-label={`Color ${color}`}
            onClick={() => setActive(i)}
            style={{ backgroundColor: color }}
            className={cn(
              "h-4 w-4 cursor-pointer rounded-full border border-neutral-300",
              active === i && "ring-1 ring-brand ring-offset-2"
            )}
          />
        ))}
      </div>
    </article>
  );
};

export default ShopProductCard;