import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "../../../components/ui/container";
import SectionHeader from "../../../components/shared/Sectionheader";

import person1 from "../../../assets/testimonials2.png";
import person2 from "../../../assets/testimonials2.png";
import person3 from "../../../assets/testimonials1.png";

const testimonials = [
  {
    name: "James K.",
    role: "Traveler",
    image: person1,
    text: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
  },
  {
    name: "Sarah W.",
    role: "Designer",
    image: person2,
    text: "Exactly what I was looking for. Thank you for making it pleasant and most of all hassle free! All products are great.",
  },
  {
    name: "Ellen W.",
    role: "Customer",
    image: person3,
    text: "Great quality and very fast delivery. The support team was friendly and helped me with everything I needed.",
  },
];

const Stars = ({ small }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`fill-[#FF9F0D] text-[#FF9F0D] ${small ? "h-3 w-3" : "h-5 w-5"}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ item, small = false, onClick }) => (
  <div
    onClick={onClick}
    className={`flex h-full items-center rounded-lg bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] ${
      small
        ? "cursor-pointer gap-6 px-9 transition hover:opacity-90"
        : "flex-col gap-8 p-8 md:flex-row md:gap-14 md:px-12"
    }`}
  >
    {/* ছবি + পেছনের ধূসর বক্স */}
    <div className="relative shrink-0">
      <div
        className={`absolute h-full w-full bg-[#D9D9D9] ${
          small ? "-bottom-3 -left-4" : "-bottom-5 -left-5"
        }`}
      />
      <img
        src={item.image}
        alt={item.name}
        className={`relative object-cover ${
          small ? "h-[150px] w-[150px]" : "h-[200px] w-[200px] lg:h-[242px] lg:w-[242px]"
        }`}
      />
    </div>

    <div>
      <p className={small ? "text-xs leading-relaxed" : "text-base leading-relaxed lg:text-lg"}>
        "{item.text}"
      </p>
      <div className={small ? "mt-3" : "mt-4"}>
        <Stars small={small} />
      </div>
      <hr className={`border-brand ${small ? "my-3 w-24" : "my-6 w-[230px]"}`} />
      <h3 className={`font-heading text-muted ${small ? "text-lg" : "text-3xl"}`}>
        {item.name}
      </h3>
      <p className={`text-muted ${small ? "mt-1 text-xs" : "mt-3 text-base"}`}>
        {item.role}
      </p>
    </div>
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  return (
    <section className="bg-[#FAFAFA] py-16 lg:py-24">
      <Container>
        <SectionHeader
          title="This Is What Our Customers Say"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis"
        />

        <div className="relative mt-12 lg:mt-20 lg:h-[400px]">
          {/* বাঁয়ের কার্ড (শুধু বড় স্ক্রিনে) */}
          <div className="absolute left-0 top-1/2 hidden h-[300px] w-[45%] -translate-y-1/2 lg:block">
            <TestimonialCard
              item={testimonials[prev]}
              small
              onClick={() => setActive(prev)}
            />
          </div>

          {/* ডানের কার্ড (শুধু বড় স্ক্রিনে) */}
          <div className="absolute right-0 top-1/2 hidden h-[300px] w-[45%] -translate-y-1/2 lg:block">
            <TestimonialCard
              item={testimonials[next]}
              small
              onClick={() => setActive(next)}
            />
          </div>

          {/* মাঝের বড় কার্ড */}
          <div className="relative z-10 mx-auto h-full lg:w-[50%]">
            <TestimonialCard item={testimonials[active]} />
          </div>
        </div>

        {/* নেভিগেশন বাটন */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setActive(prev)}
            aria-label="Previous"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:bg-neutral-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActive(next)}
            aria-label="Next"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:bg-neutral-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;