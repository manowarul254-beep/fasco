import { useEffect, useState } from "react";

const BASE_URL = "https://dummyjson.com";

// API-র প্রোডাক্টকে কার্ডের আকারে বদলায়
const normalize = (p) => ({
  id: p.id,
  title: p.title,
  brand: p.brand ?? "",
  image: p.thumbnail ?? p.images?.[0] ?? "",
  rating: p.rating ?? 0,
  reviewCount: p.reviews?.length ?? 0,
  price: p.price,
  almostSoldOut: typeof p.stock === "number" && p.stock <= 10,
});

async function fetchCategory(category, signal) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`, { signal });
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  return data.products;
}

async function getProducts(categories, limit, signal) {
  const list = Array.isArray(categories) ? categories : [categories];
  const results = await Promise.all(list.map((c) => fetchCategory(c, signal)));
  return results.flat().slice(0, limit).map(normalize);
}

export default function useProducts(categories, limit = 6) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const key = Array.isArray(categories) ? categories.join(",") : categories;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getProducts(key.split(","), limit, controller.signal)
      .then(setProducts)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [key, limit]);

  return { products, loading, error };
}