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

/**
 * একটা বা একাধিক ক্যাটাগরির প্রোডাক্ট এক সাথে এনে limit পর্যন্ত দেয়।
 * categories: "womens-dresses" অথবা ["womens-dresses", "tops"]
 */
export async function getProductsByCategories(categories, { limit = 6, signal } = {}) {
  const list = Array.isArray(categories) ? categories : [categories];
  const results = await Promise.all(list.map((c) => fetchCategory(c, signal)));
  return results.flat().slice(0, limit).map(normalize);
}