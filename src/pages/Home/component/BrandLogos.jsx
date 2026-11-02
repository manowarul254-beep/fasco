import { Container } from "../../../components/ui";

import chanel from "../../../assets/chanel.png";
import louisVuitton from "../../../assets/louis-vuitton.png";
import prada from "../../../assets/prada.png";
import calvinKlein from "../../../assets/calvinklein.png";
import denim from "../../../assets/denim.png";

const logos = [
  { name: "Chanel", src: chanel },
  { name: "Louis Vuitton", src: louisVuitton },
  { name: "Prada", src: prada },
  { name: "Calvin Klein", src: calvinKlein },
  { name: "Denim", src: denim },
];

const BrandLogos = () => {
  return (
    <section className="bg-white shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
      <Container className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 py-14 md:justify-between lg:py-20">
        {logos.map((logo) =>
          logo.src ? (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-6 w-auto object-contain md:h-8"
            />
          ) : (
            <span key={logo.name} className="text-xl font-semibold text-muted">
              {logo.name}
            </span>
          )
        )}
      </Container>
    </section>
  );
};

export default BrandLogos;