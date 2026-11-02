import { useState } from "react";
import { Container } from "../../components/ui";
import PageHeader from "../../components/shared/Pageheader";
import ProductTile from "../../components/shared/ProductTile";
import Pagination from "../../components/shared/Pagination";
import FilterSidebar from "./component/FilterSidebar";
import ShopToolbar from "./component/ShopToolbar";
import useShopProducts from "../../hooks/useShopProducts";
import { initialFilters } from "../../data/shopFilters";
import ProductSpotlight from "../../components/shared/ProductSpotlight";
import Features from "../../components/shared/Features";
import Gallery from "../../components/shared/Gallery";
import Subscribe from "../../components/shared/Subscribe";
import spotlight from "../../assets/spotlight.png";

// Tailwind পুরো ক্লাসের নাম চেনে, তাই কলাম অনুযায়ী ক্লাস আগে থেকে লেখা
const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 lg:grid-cols-5",
};

const PER_PAGE = 9;

const Shop = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("best");
  const [columns, setColumns] = useState(3);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // মোবাইলে ফিল্টার খোলা-বন্ধ

  const { products, totalPages, loading, error, brands, tags } = useShopProducts({
    filters, sort, page, perPage: PER_PAGE,
  });

  // ফিল্টার বা সর্ট বদলালে আবার ১ নম্বর পেজে ফিরে যায়
  const handleFilters = (next) => { setFilters(next); setPage(1); };
  const handleSort = (value) => { setSort(value); setPage(1); };
  const handlePage = (n) => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <PageHeader title="Fashion" crumbs={[{ label: "Home", to: "/" }, { label: "Fashion" }]} />

      <Container as="section" className="pb-20">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-6 cursor-pointer border border-black px-5 py-2 text-sm lg:hidden"
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>

        <div className="grid gap-10 lg:grid-cols-[210px_1fr] lg:gap-x-12">
          <div className={showFilters ? "block" : "hidden lg:block"}>
            <FilterSidebar filters={filters} onChange={handleFilters} brands={brands} tags={tags} />
          </div>

          <div>
            <ShopToolbar sort={sort} onSortChange={handleSort} columns={columns} onColumnsChange={setColumns} />

            <div className={`mt-8 grid gap-x-6 gap-y-10 ${gridCols[columns]}`}>
              {loading &&
                Array.from({ length: PER_PAGE }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-neutral-200" />
                    <div className="mt-4 h-3 w-2/3 bg-neutral-200" />
                  </div>
                ))}
              {!loading && products.map((p) => <ProductTile key={p.id} product={p} />)}
            </div>

            {error && <p className="mt-10 text-center text-red-500">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="mt-10 text-center text-neutral-500">No products found.</p>
            )}

            {!loading && <Pagination page={page} totalPages={totalPages} onChange={handlePage} />}
          </div>
        </div>
      </Container>

      <ProductSpotlight image={spotlight} />
      <Features />
      <Gallery />
      <Subscribe />
    </>
  );
};

export default Shop;