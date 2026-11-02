import SectionHeader from "../shared/Sectionheader";
import gallery1 from "../../assets/gallery1.png";
import gallery2 from "../../assets/gallery2.png";
import gallery3 from "../../assets/gallery3.png";
import gallery4 from "../../assets/gallery4.png";
import gallery5 from "../../assets/gallery1.png";
import gallery6 from "../../assets/gallery2.png";
import gallery7 from "../../assets/gallery3.png";


// নিজের ছবির পাথ বসিয়ে নিন
const images = [
  { src: gallery1, alt: "Gallery image 1" },
  { src: gallery2, alt: "Gallery image 2" },
  { src: gallery3, alt: "Gallery image 3" },
  { src: gallery4, alt: "Gallery image 4" },
  { src: gallery5, alt: "Gallery image 5" },
  { src: gallery6, alt: "Gallery image 6" },
  { src: gallery7, alt: "Gallery image 7" },
];
const Gallery = () => {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-20">
      <SectionHeader
        title="Follow Us On Instagram"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin"
      />

      <div className="mt-12 grid grid-cols-2 gap-0 md:grid-cols-4 lg:mt-24 lg:grid-cols-7 lg:items-center">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`overflow-hidden ${
              i % 2 === 0 ? "aspect-[256/308]" : "aspect-[256/380]"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;