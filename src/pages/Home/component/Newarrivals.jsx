import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../../../components/ui";
import Sectionheader from "../../../components/shared/Sectionheader";
import Categorytabs from "../../../components/shared/Categorytabs";
import Productcard from "../../../components/shared/Productcard";
import useProducts from "../../../hooks/useProducts";

// categories: API-র ক্যাটাগরির নাম (dummyjson). এক ক্যাটাগরিতে ৫টার কম থাকলে একাধিক দিন, মিলিয়ে ৬টা দেখাবে।
const tabs = [
  { key: "mens", label: "Men’s Fashion", categories: ["mens-shirts", "mens-shoes"] },
  { key: "womens", label: "Women’s Fashion", categories: ["womens-dresses", "tops"] },
  { key: "women-acc", label: "Women Accessories", categories: ["womens-jewellery", "womens-bags"] },
  { key: "men-acc", label: "Men Accessories", categories: ["mens-watches", "sunglasses"] },
  { key: "discount", label: "Discount Deals", categories: ["womens-shoes", "womens-watches"] },
];

const SkeletonCard = () => (
  <div className="h-[424px] animate-pulse rounded-lg bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
    <div className="aspect-[336/244] rounded-lg bg-neutral-200" />
    <div className="mt-4 h-5 w-1/2 rounded bg-neutral-200" />
    <div className="mt-10 h-4 w-1/3 rounded bg-neutral-200" />
  </div>
);

const NewArrivals = ({
  title = "New Arrivals",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin",
}) => {
  const [activeKey, setActiveKey] = useState("womens");
  const activeTab = tabs.find((t) => t.key === activeKey);
  const { products, loading, error } = useProducts(activeTab.categories, 6);

  return (
    <Container as="section" className="py-16 lg:py-20">
      <Sectionheader title={title} description={description} />

      <Categorytabs tabs={tabs} active={activeKey} onChange={setActiveKey} className="mt-12" />

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[61px] lg:gap-y-[60px]">
        {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        {!loading && products.map((p) => <Productcard key={p.id} product={p} />)}
      </div>

      {error && <p className="mt-10 text-center text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="mt-10 text-center text-neutral-500">No products found.</p>
      )}

      <div className="mt-14 flex justify-center">
        <Button as={Link} to="/shop" className="rounded-lg px-12 py-4 shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
          View More
        </Button>
      </div>
    </Container>
  );
};

export default NewArrivals;