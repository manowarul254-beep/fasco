import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { cn } from "../../utils/cn";

// ডিজাইনের মাপ: ১৯২০ × ৫৭০ (নিচের সব পজিশন এই মাপের পিক্সেল, পরে % এ বদলানো হয়)
const W = 1920;
const H = 570;

// ছবির ওপর লেবেল: points = লাইন (প্রথম বিন্দু = গোল চিহ্ন), box = লেবেল বাক্সের [x, y, প্রস্থ, উচ্চতা]
const defaultHotspots = [
  { label: "Flat Cap", points: [[524, 29], [598, 30], [619, 50]], box: [619, 55, 124, 38] },
  { label: "Suspender", points: [[441, 143], [305, 144], [288, 163]], box: [202, 167, 124, 38] },
  { label: "Hugo Boss", points: [[477, 210], [551, 211], [572, 231]], box: [572, 236, 125, 38] },
  { label: "Hugo Boss", points: [[397, 309], [262, 310], [243, 329]], box: [158, 333, 125, 38] },
  { label: "Santoni", points: [[481, 482], [555, 483], [576, 503]], box: [576, 508, 125, 38] },
];

const pctX = (x) => `${(x / W) * 100}%`;
const pctY = (y) => `${(y / H) * 100}%`;

/**
 * ProductSpotlight: বাঁয়ে মডেলের ছবি + লেবেল, ডানে ধূসর প্যানেলে প্রোডাক্টের তথ্য
 *
 * বড় স্ক্রিনে (১২৮০px+) সবকিছু ডিজাইনের অনুপাত ধরে vw এককে বাড়ে-কমে,
 * তাই কোনো অংশ কাটা পড়ে না। ছোট স্ক্রিনে ছবি উপরে, তথ্য নিচে।
 *
 * Props:
 *  - image       : বাঁ দিকের ছবি (মডেল + কালো আকৃতি সহ)
 *  - collection, title, description
 *  - sizes       : ["S", "M", "L"] ; defaultSize : "M"
 *  - price       : 100 (সংখ্যা)
 *  - buttonText, buttonLink (দিলে লিংক হবে) অথবা onBuy (ক্লিক ফাংশন)
 *  - hotspots    : লেবেলের তালিকা ([] দিলে লেবেল থাকবে না)
 */
const ProductSpotlight = ({
  image,
  collection = "Women Collection",
  title = "Peaky Blinders",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque du is ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis.",
  sizes = ["S", "M", "L"],
  defaultSize = "M",
  price = 100,
  buttonText = "Buy Now",
  buttonLink,
  onBuy,
  hotspots = defaultHotspots,
  className,
}) => {
  const [size, setSize] = useState(defaultSize);
  const [whole, decimal] = Number(price).toFixed(2).split(".");

  return (
    <section className={cn("relative overflow-hidden bg-[#FAFAFA] xl:aspect-[1920/570]", className)}>
      {/* বাঁ দিকের ছবি: object-contain, তাই মাথা বা পা কোনোটাই কাটা পড়বে না */}
      <div className="xl:absolute xl:inset-y-0 xl:left-0 xl:w-[56%]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-auto w-full xl:h-full xl:object-contain xl:object-left"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-neutral-100 xl:aspect-auto xl:h-full" />
        )}
      </div>

      {/* ডান প্যানেল: কোণাকুনি কাটা ধূসর অংশ */}
      <div className="bg-[#D9D9D9] px-4 py-10 md:px-6 xl:absolute xl:inset-0 xl:p-0 xl:[clip-path:polygon(54.95%_0,100%_0,100%_100%,45.2%_100%)]">
        <div className="xl:absolute xl:left-[56.4%] xl:top-[10.9%] xl:w-[36%]">
          <p className="text-sm text-neutral-500 xl:text-[0.83vw] xl:leading-[1.2]">{collection}</p>

          <h2 className="mt-3 font-heading text-4xl font-bold text-muted xl:mt-[1.2vw] xl:text-[2.7vw] xl:leading-[1.1]">
            {title}
          </h2>

          <p className="mt-6 text-sm text-black underline underline-offset-2 xl:mt-[1.2vw] xl:text-[0.83vw] xl:leading-[1.2]">
            DESCRIPTION
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500 xl:mt-[1.2vw] xl:max-w-[27vw] xl:text-[0.83vw] xl:leading-[1.5]">
            {description}
          </p>

          <div className="mt-5 flex items-center gap-3 xl:mt-[0.94vw] xl:gap-[0.6vw]">
            <span className="text-sm text-neutral-500 xl:text-[0.83vw]">Size:</span>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-1 text-sm transition-colors",
                  "xl:rounded-[0.6vw] xl:px-[1vw] xl:py-[0.2vw] xl:text-[0.83vw]",
                  s === size ? "bg-black text-white" : "border border-neutral-400 text-muted hover:bg-white"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="mt-5 text-2xl font-semibold text-black xl:mt-[1.2vw] xl:text-[1.46vw] xl:leading-[1.2]">
            ${whole}
            <span className="text-[0.7em]">.{decimal}</span>
          </p>

          <Button
            {...(buttonLink ? { as: Link, to: buttonLink } : { onClick: () => onBuy?.({ title, price, size }) })}
            className="mt-5 rounded-lg px-12 py-4 shadow-[0_15px_30px_rgba(0,0,0,0.2)] xl:mt-[1.2vw] xl:h-[2.92vw] xl:w-[10.8vw] xl:rounded-[0.5vw] xl:p-0 xl:text-[0.83vw]"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {/* কোণাকুনি দাগ + লেবেল (শুধু বড় স্ক্রিনে) */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <line x1="1055" y1="0" x2="868" y2={H} stroke="#111" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {hotspots.map((h, i) => (
            <polyline
              key={i}
              points={h.points.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke="#484848"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {hotspots.map((h, i) => {
          const [dx, dy] = h.points[0];
          const [bx, by, bw, bh] = h.box;
          return (
            <div key={i}>
              <span
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted bg-neutral-300"
                style={{ left: pctX(dx), top: pctY(dy), width: "1.04%", aspectRatio: "1" }}
              />
              <span
                className="absolute flex items-center justify-center border border-black bg-white/80 text-[0.83vw] text-black"
                style={{ left: pctX(bx), top: pctY(by), width: pctX(bw), height: pctY(bh) }}
              >
                {h.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSpotlight;