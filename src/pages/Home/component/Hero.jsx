import { Link } from "react-router-dom";
import { Button, Container } from "../../../components/ui";
import heroLeft from "../../../assets/heroleft.png";
import heroTop from "../../../assets/heromid1.png";
import heroBottom from "../../../assets/heromid2.png";
import heroRight from "../../../assets/heroright.png";

const defaultImages = {
  left: heroLeft,
  centerTop: heroTop,
  centerBottom: heroBottom,
  right: heroRight,
};

const Hero = ({
  title = "ULTIMATE",
  outlineText = "SALE",
  subtitle = "NEW COLLECTION",
  buttonText = "SHOP NOW",
  buttonLink = "/shop",
  images = defaultImages,
}) => {
  return (
    // উপরে ফাঁকা জায়গা দেওয়া আছে, যাতে Navbar-এর সাথে ছবি না লাগে
    <Container as="section" className="pt-6 pb-16 lg:pt-16">
      <div className="grid gap-6 lg:h-[756px] lg:grid-cols-[392fr_426fr_392fr] lg:gap-[34px]">
        {/* বাঁ কলাম: ধূসর বক্স, মানুষটা নিচে বসানো */}
        <div className="hidden overflow-hidden rounded-xl bg-[#E0E0E0] lg:block">
          <img
            src={images.left}
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        {/* মাঝের কলাম */}
        <div className="flex flex-col gap-6 lg:gap-0">
          {/* উপরের ছবি (১৫০px) */}
          <div className="h-40 shrink-0 overflow-hidden rounded-xl bg-[#E0E0E0] lg:h-[150px]">
            <img
              src={images.centerTop}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* লেখা আর বাটন */}
          <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
            <h1 className="whitespace-nowrap text-6xl font-medium leading-none tracking-tight text-muted lg:text-[84px]">
              {title}
            </h1>
            <p className="text-outline whitespace-nowrap text-8xl font-medium leading-none tracking-tight lg:text-[160px]">
              {outlineText}
            </p>
            <p className="mt-4 text-lg tracking-[0.2em] text-muted">
              {subtitle}
            </p>
            <Button
              as={Link}
              to={buttonLink}
              className="mt-8 rounded-xl px-12 py-4 shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
            >
              {buttonText}
            </Button>
          </div>

          {/* নিচের ছবি (১৫০px) */}
          <div className="h-40 shrink-0 overflow-hidden rounded-xl bg-[#E0E0E0] lg:h-[150px]">
            <img
              src={images.centerBottom}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* ডান কলাম: ধূসর বক্স, মানুষটা নিচে বসানো */}
        <div className="hidden overflow-hidden rounded-xl bg-[#E0E0E0] lg:block lg:pt-[190px]">
          <img
            src={images.right}
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
