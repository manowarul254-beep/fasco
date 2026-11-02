import { useEffect, useState } from "react";

const BASE_URL = "https://dummyjson.com";

const normalize = (p) => {
  const discount = Math.round(p.discountPercentage ?? 0);

  return {
    id: p.id,
    title: p.title,
    brand: p.brand ?? "",
    image: p.thumbnail ?? p.images?.[0] ?? "",
    images: p.images?.length ? p.images : [p.thumbnail].filter(Boolean),
    rating: p.rating ?? 0,
    reviewCount: p.reviews?.length ?? 0,
    price: p.price,
    discount,
    oldPrice: discount ? Math.round(p.price / (1 - discount / 100)) : null,
    stock: p.stock ?? 0,
    almostSoldOut: typeof p.stock === "number" && p.stock <= 10,
    description: p.description ?? "",
    category: p.category ?? "",
  };
};

async function getProduct(id, signal) {
  const res = await fetch(`${BASE_URL}/products/${id}`, { signal });
  if (!res.ok) throw new Error(`Product not found (status ${res.status})`);
  return normalize(await res.json());
}

export default function useProductById(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getProduct(id, controller.signal)
      .then(setProduct)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { product, loading, error };
}