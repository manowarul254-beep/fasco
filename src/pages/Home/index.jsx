import Hero from "./component/Hero";
import BrandLogos from "./component/BrandLogos";
import NewArrivals from "../Home/component/Newarrivals";
import FeaturedSlider from "../../components/shared/Featuredslider";
import ProductSpotlight from "../../components/shared/ProductSpotlight";
import spotlight from "../../assets/spotlight.png";
import Features from "../../components/shared/features";
import Gallery from "../../components/shared/Gallery";
import Testimonials from "./component/Testimonials";
import Subscribe from "../../components/shared/Subscribe";

const Home = () => {
  return (
    <>
      <Hero />
      <BrandLogos />
      <FeaturedSlider title="Deals Of The Month" />
      <NewArrivals />
      <ProductSpotlight image={spotlight} />
      <Features />
      <Gallery />
      <Testimonials />
      <Subscribe />
    </>
  );
};

export default Home;