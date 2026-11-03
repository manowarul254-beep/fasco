import { HandHeart, BadgeCheck, Package, Headset } from "lucide-react";
import Container from "../ui/container";

const features = [
  {
    icon: HandHeart,
    title: "High Quality",
    text: "crafted from top materials",
  },
  {
    icon: BadgeCheck,
    title: "Warranty Protection",
    text: "Over 2 years",
  },
  {
    icon: Package,
    title: "Free Shipping",
    text: "Order over 150 $",
  },
  {
    icon: Headset,
    title: "24 / 7 Support",
    text: "Dedicated support",
  },
];

const Features = () => {
  return (
    <section className="py-[90px] bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.06)]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 lg:justify-center">
              <Icon className="w-10 h-10 shrink-0 text-black" strokeWidth={1.25} />
              <div>
                <h3 className="text-[20px] leading-[1.2] font-medium text-[#3a3a3a]">
                  {title}
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#4a4a4a]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;