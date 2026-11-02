import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui";
import useCountdown from "../../hooks/useCountdown";
import { cn } from "../../utils/cn";


import deal from "../../assets/deal.png";
import deal1 from "../../assets/deal1.png";
import deal2 from "../../assets/deal1.png";
import deal3 from "../../assets/deal1.png";
import deal4 from "../../assets/deal1.png";

const defaultDeals = [
  { id: 1, label: "Spring Sale", discount: "30% OFF", image: deal },
  { id: 2, label: "Summer Sale", discount: "25% OFF", image: deal1 },
  { id: 3, label: "Autumn Sale", discount: "20% OFF", image: deal2 },
  { id: 4, label: "Winter Sale", discount: "40% OFF", image: deal3 },
  { id: 5, label: "Winter Sale", discount: "50% OFF", image: deal4 },
];


// endDate না দিলে ডেমো: ২ দিন ৬ ঘণ্টা ৫ মিনিট ৩০ সেকেন্ড
const DEMO_MS = ((30 * 24 + 6) * 3600 + 5 * 60 + 30) * 1000;

const pad = (n) => String(n).padStart(2, "0");

const TimeBox = ({ value, label }) => (
  <div className="flex w-[76px] flex-col items-center gap-3">
    <div className="flex h-[76px] w-[76px] items-center justify-center rounded-lg bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <span className="font-digital text-4xl text-muted">{pad(value)}</span>
    </div>
    <span className="text-xl text-muted">{label}</span>
  </div>
);

const FeaturedSlider = ({
  title = "Deals Of The Month",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin",
  buttonText = "Buy Now",
  hurryText = "Hurry, Before It’s Too Late!",
  showTimer = true,
  endDate,
  deals = defaultDeals,
}) => {
  const [active, setActive] = useState(0);
  const [target] = useState(() =>
    endDate ? new Date(endDate).getTime() : Date.now() + DEMO_MS
  );
  const { days, hours, minutes, seconds } = useCountdown(target);

  const total = deals.length;
  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  // সক্রিয় কার্ড সবসময় প্রথমে, বাকিগুলো পরপর
  const ordered = [...deals.slice(active), ...deals.slice(0, active)];
  const [first, ...rest] = ordered;

  return (
    <section className="overflow-hidden bg-white py-16">
      {/*
        গ্রিডের মাঝের কলামটা ঠিক Container-এর সমান (১২৮১px, দুই পাশে একই padding)।
        বাঁ কলাম মাঝের কলামের শুরু থেকে বসে, স্লাইডার মাঝের কলামের শুরু থেকে স্ক্রিনের ডান কিনারা পর্যন্ত যায়।
      */}
      <div className="grid grid-cols-[1fr_min(1281px,100%_-_2rem)_1fr] gap-y-12 md:grid-cols-[1fr_min(1281px,100%_-_3rem)_1fr] xl:grid-cols-[1fr_min(1281px,100%)_1fr]">
        {/* বাঁ কলাম */}
        <div className="relative col-start-2 lg:row-start-1 lg:w-[566px]">
          <h2 className="font-heading text-4xl font-bold text-muted lg:text-5xl">{title}</h2>
          <p className="mt-6 max-w-[430px] leading-relaxed text-neutral-500">{description}</p>

          <Button className="mt-10 rounded-lg px-12 py-4 shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
            {buttonText}
          </Button>

          {showTimer && (
            <>
              <h3 className="mt-14 text-2xl font-medium text-muted">{hurryText}</h3>
              <div className="mt-5 flex gap-[30px]">
                <TimeBox value={days} label="Days" />
                <TimeBox value={hours} label="Hr" />
                <TimeBox value={minutes} label="Mins" />
                <TimeBox value={seconds} label="Sec" />
              </div>
            </>
          )}

          {/* আগে/পরে বাটন */}
          <div className="mt-10 flex gap-4 lg:absolute lg:bottom-0 lg:right-6 lg:mt-0">
            <button
              onClick={prev}
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-400 shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer hover:text-black"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ডান কলাম: স্ক্রিনের কিনারা পর্যন্ত */}
        <div className="col-[2/-1] flex min-w-0 items-start gap-6 lg:row-start-1 lg:ml-[566px]">
          {/* সক্রিয় (বড়) কার্ড */}
          <div className="relative h-[420px] w-[280px] shrink-0 bg-[#E0E0E0] lg:h-[582px] lg:w-[404px]">
            {first.image && (
              <img src={first.image} alt={first.label} className="h-full w-full object-cover" />
            )}
            <div className="absolute bottom-0 left-6 w-[217px] bg-white px-6 py-5">
              <p className="flex items-center gap-3 text-sm text-muted">
                <span>{pad(first.id)}</span>
                <span className="h-px w-7 bg-muted" />
                <span>{first.label}</span>
              </p>
              <p className="mt-2 text-3xl font-medium text-muted">{first.discount}</p>
            </div>
          </div>

          {/* বাকি কার্ড + ডট */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              {rest.map((deal) => (
                <div
                  key={deal.id}
                  className="h-[350px] w-[260px] shrink-0 bg-[#E0E0E0] lg:h-[486px] lg:w-[372px]"
                >
                  {deal.image && (
                    <img src={deal.image} alt={deal.label} className="h-full w-full object-cover" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 lg:mt-[70px]">
              {deals.map((deal, i) => (
                <button
                  key={deal.id}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-full cursor-pointer",
                    i === active ? "h-6 w-6 border border-black" : "h-2.5 w-2.5 bg-neutral-400"
                  )}
                >
                  {i === active && <span className="h-2.5 w-2.5 rounded-full bg-black" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;