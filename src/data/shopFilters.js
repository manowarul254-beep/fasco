// ফিল্টারের স্থির অপশন (ডিজাইন থেকে)। ব্র্যান্ড আর ট্যাগ API-র ডাটা থেকে নিজে আসে।

export const sizeOptions = ["S", "M", "L", "XL"];

export const colorOptions = [
  "#FF6B6B", "#FF8A3D", "#FFEB6B", "#8DE86B", "#6BE8A2", "#6BE8D6", "#6BB5F5",
  "#6BF0F0", "#6B9BF5", "#7B7BF5", "#9B6BF5", "#C86BF5", "#F56BE0", "#F56B6B",
];

export const priceOptions = [
  { label: "$0-$50", range: [0, 50] },
  { label: "$50-$100", range: [50, 100] },
  { label: "$100-$150", range: [100, 150] },
  { label: "$150-$200", range: [150, 200] },
  { label: "$300-$400", range: [300, 400] },
];

export const collectionOptions = ["All products", "Best sellers", "New arrivals", "Accessories"];

export const initialFilters = {
  sizes: [],
  colors: [],
  price: null, // { label, range }
  brands: [],
  collection: null,
  tags: [],
};

export const sortOptions = [
  { value: "best", label: "Best selling" },
  { value: "low", label: "Price: low to high" },
  { value: "high", label: "Price: high to low" },
  { value: "name", label: "Name: A-Z" },
];