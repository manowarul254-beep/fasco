import { useState } from "react";
import { cn } from "../../../utils/cn";

const ProductGallery = ({ images = [], title }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* থাম্বনেইল: বড় স্ক্রিনে বাঁয়ে উল্লম্ব, ছোট স্ক্রিনে নিচে আড়াআড়ি */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-auto sm:max-h-[560px] sm:w-[72px] sm:shrink-0 sm:flex-col">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-[72px] w-[60px] shrink-0 cursor-pointer overflow-hidden border bg-[#E0E0E0] sm:w-full",
                active === i ? "border-black" : "border-transparent"
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="aspect-[3/4] min-w-0 flex-1 overflow-hidden bg-[#E0E0E0]">
        <img
          src={images[active]}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProductGallery;