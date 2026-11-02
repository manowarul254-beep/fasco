import { cn } from "../../utils/cn";

// কোন কোন পেজ নম্বর দেখাবে: [1, "…", 4, 5, 6, "…", 10]
const getPages = (page, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, page - 1, page, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
};

/**
 * Pagination: ১ ২ ৩ »
 * Props: page (বর্তমান), totalPages, onChange(newPage)
 */
const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const base = "flex h-9 w-9 items-center justify-center rounded-full text-xs cursor-pointer transition-colors";

  return (
    <nav className="mt-16 flex items-center justify-center gap-3" aria-label="Pagination">
      {getPages(page, totalPages).map((n, i) =>
        n === "…" ? (
          <span key={`dots-${i}`} className="px-1 text-neutral-400">…</span>
        ) : (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(base, n === page ? "bg-neutral-200 text-black" : "text-neutral-500 hover:bg-neutral-100")}
          >
            {n}
          </button>
        )
      )}
      {page < totalPages && (
        <button onClick={() => onChange(page + 1)} aria-label="Next page" className={cn(base, "text-neutral-500 hover:bg-neutral-100")}>
          »
        </button>
      )}
    </nav>
  );
};

export default Pagination;