import { useMemo, useState } from "react";
import { products, filterOptions } from "../data/products";

const PER_PAGE = 9;

const initialFilters = {
  sizes: [],
  colors: [],
  price: null, // filterOptions.prices-এর index
  brands: [],
  collection: "All products",
  tag: null,
};

export const useProductFilters = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("best");
  const [page, setPage] = useState(1);

  // একাধিক বাছাই (সাইজ, রঙ, ব্র্যান্ড)
  const toggle = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));
    setPage(1);
  };

  // একটাই বাছাই (দাম, কালেকশন, ট্যাগ)
  const select = (key, value) => {
    setFilters((f) => ({
      ...f,
      [key]:
        f[key] === value ? (key === "collection" ? "All products" : null) : value,
    }));
    setPage(1);
  };

  const clear = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const range = filters.price !== null ? filterOptions.prices[filters.price] : null;

    const list = products.filter(
      (p) =>
        (!filters.sizes.length || p.sizes.some((s) => filters.sizes.includes(s))) &&
        (!filters.colors.length || p.colors.some((c) => filters.colors.includes(c))) &&
        (!range || (p.price >= range.min && p.price <= range.max)) &&
        (!filters.brands.length || filters.brands.includes(p.brand)) &&
        (filters.collection === "All products" || p.collection === filters.collection) &&
        (!filters.tag || p.tags.includes(filters.tag))
    );

    const sorters = {
      best: (a, b) => b.sold - a.sold,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
    };

    return [...list].sort(sorters[sort]);
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const items = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return {
    filters, toggle, select, clear,
    sort, setSort,
    page: current, setPage, totalPages,
    items, total: filtered.length,
  };
};