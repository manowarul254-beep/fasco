
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

const DEMO_MS = ((30 * 24 + 6) * 3600 + 5 * 60 + 30) * 1000;

const pad = (n) => String(n).padStart(2, "0");

const TimeBox = ({ value, label }) => (
  <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3">
    <div className="flex h-14 w-full max-w-[76px] items-center justify-center rounded-lg bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:h-[76px]">
      <span className="font-digital text-2xl text-muted sm:text-4xl">
        {pad(value)}
      </span>
    </div>
    <span className="text-xs text-muted sm:text-base lg:text-xl">
      {label}
    </span>
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

  const next = () => {
    if (total > 0) setActive((i) => (i + 1) % total);
  };

  const prev = () => {
    if (total > 0) setActive((i) => (i - 1 + total) % total);
  };

  if (!total) return null;

  const ordered = [...deals.slice(active), ...deals.slice(0, active)];
  const [first, ...rest] = ordered;

  return (
    <section className="w-full min-w-0 overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid w-full min-w-0 max-w-[1281px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[566px_minmax(0,1fr)] lg:items-start lg:gap-0 lg:px-0">

        {/* Left Content */}
        <div className="w-full min-w-0">
          <h2 className="font-heading text-3xl font-bold text-muted sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mt-4 max-w-[430px] text-sm leading-relaxed text-neutral-500 sm:mt-6 sm:text-base">
            {description}
          </p>

          <Button className="mt-7 rounded-lg px-8 py-3 shadow-[0_15px_30px_rgba(0,0,0,0.2)] sm:mt-10 sm:px-12 sm:py-4">
            {buttonText}
          </Button>

          {/* Countdown Timer */}
          {showTimer && (
            <div className="mt-9 w-full min-w-0 sm:mt-14">
              <h3 className="text-xl font-medium text-muted sm:text-2xl">
                {hurryText}
              </h3>

              <div className="mt-5 flex w-full max-w-[340px] items-start gap-2 sm:gap-5 lg:gap-[30px]">
                <TimeBox value={days} label="Days" />
                <TimeBox value={hours} label="Hr" />
                <TimeBox value={minutes} label="Mins" />
                <TimeBox value={seconds} label="Sec" />
              </div>
            </div>
          )}

          {/* Previous / Next Buttons */}
          <div className="mt-8 flex gap-4 sm:mt-10 lg:mt-12">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-400 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:text-black sm:h-12 sm:w-12"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition hover:bg-neutral-100 sm:h-12 sm:w-12"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Right Side Slider */}
        <div className="w-full min-w-0 overflow-hidden lg:overflow-visible">
          <div className="flex min-w-0 items-start gap-4 sm:gap-6">

            {/* Active Deal Card */}
            <div className="relative h-[300px] w-[220px] shrink-0 overflow-hidden bg-[#E0E0E0] sm:h-[420px] sm:w-[280px] lg:h-[582px] lg:w-[404px]">
              {first.image && (
                <img
                  src={first.image}
                  alt={first.label}
                  className="h-full w-full object-cover"
                />
              )}

              <div className="absolute bottom-0 left-2 w-[190px] bg-white px-3 py-3 sm:left-6 sm:w-[217px] sm:px-6 sm:py-5">
                <p className="flex items-center gap-2 text-xs text-muted sm:gap-3 sm:text-sm">
                  <span>{pad(first.id)}</span>
                  <span className="h-px w-5 bg-muted sm:w-7" />
                  <span>{first.label}</span>
                </p>

                <p className="mt-2 text-2xl font-medium text-muted sm:text-3xl">
                  {first.discount}
                </p>
              </div>
            </div>

            {/* Remaining Cards */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="flex gap-4 overflow-x-auto overscroll-x-contain pb-2 sm:gap-6 lg:overflow-visible">
                {rest.map((item) => (
                  <div
                    key={item.id}
                    className="h-[250px] w-[180px] shrink-0 bg-[#E0E0E0] sm:h-[350px] sm:w-[260px] lg:h-[486px] lg:w-[372px]"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.label}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div className="mt-6 flex items-center gap-3 sm:mt-10 lg:mt-[70px]">
                {deals.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "flex shrink-0 cursor-pointer items-center justify-center rounded-full",
                      i === active
                        ? "h-6 w-6 border border-black"
                        : "h-2.5 w-2.5 bg-neutral-400"
                    )}
                  >
                    {i === active && (
                      <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSlider;
