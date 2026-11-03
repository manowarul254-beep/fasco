import { useEffect, useMemo, useState } from "react";
import { getFashionProducts, ACCESSORY_CATEGORIES } from "../data/shopApi";

const sorters = {
  best: (a, b) => b.rating - a.rating,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  name: (a, b) => a.title.localeCompare(b.title),
};

const applyFilters = (products, f) =>
  products.filter((p) => {
    if (f.price && (p.price < f.price.range[0] || p.price > f.price.range[1])) return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.tags.length && !f.tags.some((t) => p.tags.includes(t))) return false;
    if (f.collection === "Accessories" && !ACCESSORY_CATEGORIES.includes(p.category)) return false;
    // sizes আর colors: API-তে তথ্য নেই বলে এখন ছাঁকা হয় না
    return true;
  });

// সবচেয়ে বেশি আসা মানগুলো বের করে (ব্র্যান্ড, ট্যাগ)
const topValues = (products, pick, limit) => {
  const count = {};
  products.forEach((p) => [].concat(pick(p)).forEach((v) => v && (count[v] = (count[v] || 0) + 1)));
  return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([v]) => v);
};

/**
 * useShopProducts({ filters, sort, page, perPage })
 * ফেরত দেয়: { products, totalPages, total, loading, error, brands, tags }
 */
export default function useShopProducts({ filters, sort, page, perPage = 9 }) {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getFashionProducts(controller.signal)
      .then(setAll)
      .catch((err) => err.name !== "AbortError" && setError(err.message))
      .finally(() => !controller.signal.aborted && setLoading(false));
    return () => controller.abort();
  }, []);

  const options = useMemo(
    () => ({ brands: topValues(all, (p) => p.brand, 6), tags: topValues(all, (p) => p.tags, 12) }),
    [all]
  );

  const { products, total, totalPages } = useMemo(() => {
    const filtered = applyFilters(all, filters).sort(sorters[sort] ?? sorters.best);
    const start = (page - 1) * perPage;
    return {
      products: filtered.slice(start, start + perPage),
      total: filtered.length,
      totalPages: Math.max(1, Math.ceil(filtered.length / perPage)),
    };
  }, [all, filters, sort, page, perPage]);

  return { products, total, totalPages, loading, error, ...options };
}