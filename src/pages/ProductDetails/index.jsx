import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../components/ui";
import ProductSpotlight from "../../components/shared/ProductSpotlight";
import Features from "../../components/shared/Features";
import Featuredslider from "../../components/shared/Featuredslider";
import Subscribe from "../../components/shared/Subscribe";
import spotlight from "../../assets/spotlight.png";
import useProduct from "../../hooks/useProductById";
import ProductGallery from "./component/ProductGallery";
import ProductInfo from "./component/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  console.log("ProductDetails:", { id, loading, error, product });

  // অন্য প্রোডাক্টে গেলে পেজ উপরে
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) {
    return (
      <Container className="py-16">
        <div className="grid animate-pulse gap-10 lg:grid-cols-2">
          <div className="aspect-[3/4] bg-neutral-200" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-neutral-200" />
            <div className="h-4 w-1/3 bg-neutral-200" />
            <div className="h-40 bg-neutral-200" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-24 text-center">
        <p className="text-red-500">{error || "Product not found"}</p>
      </Container>
    );
  }

  return (
    <>
      <Container as="section" className="pb-20 pt-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* key দিলে প্রোডাক্ট বদলালে ভেতরের অবস্থা (সাইজ, রঙ, ছবি) নতুন করে শুরু হয় */}
          <ProductGallery key={`g-${product.id}`} images={product.images} title={product.title} />
          <ProductInfo key={`i-${product.id}`} product={product} />
        </div>
      </Container>

      <ProductSpotlight image={spotlight} />
      <Features />
      <Featuredslider />
      <Subscribe />
    </>
  );
};

export default ProductDetails;