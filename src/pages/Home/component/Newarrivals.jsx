
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../../../components/ui";
import Sectionheader from "../../../components/shared/Sectionheader";
import Categorytabs from "../../../components/shared/Categorytabs";
import Productcard from "../../../components/shared/Productcard";
import useProducts from "../../../hooks/useProducts";

const tabs = [
  { key: "mens", label: "Men’s Fashion", categories: ["mens-shirts", "mens-shoes"] },
  { key: "womens", label: "Women’s Fashion", categories: ["womens-dresses", "tops"] },
  { key: "women-acc", label: "Women Accessories", categories: ["womens-jewellery", "womens-bags"] },
  { key: "men-acc", label: "Men Accessories", categories: ["mens-watches", "sunglasses"] },
  { key: "discount", label: "Discount Deals", categories: ["womens-shoes", "womens-watches"] },
];

const SkeletonCard = () => (
  <div className="w-full min-w-0 animate-pulse rounded-lg bg-white p-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-5">
    <div className="aspect-[336/244] w-full rounded-lg bg-neutral-200" />
    <div className="mt-4 h-5 w-1/2 rounded bg-neutral-200" />
    <div className="mt-5 h-4 w-1/3 rounded bg-neutral-200" />
  </div>
);

const NewArrivals = ({
  title = "New Arrivals",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin",
}) => {
  const [activeKey, setActiveKey] = useState("womens");
  const activeTab = tabs.find((t) => t.key === activeKey) || tabs[0];

  const { products, loading, error } = useProducts(activeTab.categories, 6);

  return (
    <Container
      as="section"
      className="w-full min-w-0 max-w-full overflow-x-clip py-10 sm:py-14 lg:py-20"
    >
      <div className="w-full min-w-0">
        <Sectionheader title={title} description={description} />
      </div>

      {/* Mobile: horizontally scrollable category tabs */}
      <div className="mt-8 w-full min-w-0 overflow-x-auto overscroll-x-contain sm:mt-10 lg:mt-12">
        <Categorytabs
          tabs={tabs}
          active={activeKey}
          onChange={setActiveKey}
          className="!mt-0 !w-max !min-w-full"
        />
      </div>

      {/* Responsive product grid */}
      <div className="mt-8 grid w-full min-w-0 grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full min-w-0">
              <SkeletonCard />
            </div>
          ))}

        {!loading &&
          products.map((p) => (
            <div key={p.id} className="w-full min-w-0">
              <Productcard product={p} />
            </div>
          ))}
      </div>

      {error && (
        <p className="mt-8 break-words text-center text-sm text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="mt-8 text-center text-neutral-500">
          No products found.
        </p>
      )}

      <div className="mt-10 flex w-full justify-center sm:mt-14">
        <Button
          as={Link}
          to="/shop"
          className="max-w-full rounded-lg px-8 py-3 shadow-[0_15px_30px_rgba(0,0,0,0.2)] sm:px-12 sm:py-4"
        >
          View More
        </Button>
      </div>
    </Container>
  );
};

export default NewArrivals;
