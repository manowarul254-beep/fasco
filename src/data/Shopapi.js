// Shop পেজের ডাটা আনা। অন্য API হলে শুধু এই ফাইল বদলাবে।

const BASE_URL = "https://dummyjson.com";

// "Fashion" পেজে যেসব ক্যাটাগরি দেখানো হবে
const FASHION_CATEGORIES = [
  "womens-dresses", "tops", "mens-shirts", "mens-shoes", "womens-shoes",
  "womens-bags", "womens-jewellery", "womens-watches", "mens-watches", "sunglasses",
];

// "Accessories" কালেকশনে যেসব ক্যাটাগরি পড়ে
export const ACCESSORY_CATEGORIES = [
  "womens-bags", "womens-jewellery", "womens-watches", "mens-watches", "sunglasses",
];

// ডেমো: dummyjson-এ রঙের তথ্য নেই, তাই আইডি অনুযায়ী নকল রঙ বসানো হয়েছে। নিজের API-তে রঙ থাকলে এটা মুছে p.colors ব্যবহার করুন।
const DEMO_COLORS = ["#FFD60A", "#000000", "#7FA8D6", "#F8C8DC", "#C8E6C9", "#D1C4E9", "#8D6E63", "#1E3A5F"];
const demoColors = (id) => [DEMO_COLORS[id % 8], DEMO_COLORS[(id + 3) % 8]];

const normalize = (p) => ({
  id: p.id,
  title: p.title,
  image: p.thumbnail ?? p.images?.[0] ?? "",
  price: p.price,
  oldPrice: p.discountPercentage >= 15 ? +(p.price / (1 - p.discountPercentage / 100)).toFixed(2) : null,
  soldOut: p.availabilityStatus === "Out of Stock" || p.stock === 0,
  colors: p.colors ?? demoColors(p.id),
  brand: p.brand ?? "",
  tags: p.tags ?? [],
  category: p.category,
  rating: p.rating ?? 0,
});

// সব প্রোডাক্ট একবার এনে ফ্যাশন ক্যাটাগরি রাখা হয়; ফিল্টার/সর্ট/পেজিনেশন ব্রাউজারে হয়।
export async function getFashionProducts(signal) {
  const res = await fetch(`${BASE_URL}/products?limit=0`, { signal });
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  return data.products.filter((p) => FASHION_CATEGORIES.includes(p.category)).map(normalize);
}