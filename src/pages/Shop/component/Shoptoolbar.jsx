import { cn } from "../../../utils/cn";
import { sortOptions } from "../../../data/shopFilters";

// n কলামের আইকন: ১ হলে তিনটা আড়াআড়ি দাগ, বাকিগুলোতে n টা খাড়া দাগ
const ColumnIcon = ({ n }) =>
  n === 1 ? (
    <span className="flex flex-col gap-[3px]">
      {[0, 1, 2].map((i) => <span key={i} className="h-[2px] w-3 bg-current" />)}
    </span>
  ) : (
    <span className="flex gap-[2px]">
      {Array.from({ length: n }).map((_, i) => <span key={i} className="h-3 w-[2px] bg-current" />)}
    </span>
  );

/**
 * ShopToolbar: বাঁয়ে সর্ট ড্রপডাউন, ডানে কলাম সংখ্যা বদলানোর বাটন
 * Props: sort, onSortChange, columns, onColumnsChange
 */
const ShopToolbar = ({ sort, onSortChange, columns, onColumnsChange }) => {
  return (
    <div className="flex items-center justify-between">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="cursor-pointer bg-transparent font-heading text-xs font-bold text-black outline-none"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* কলাম বাটন (বড় স্ক্রিনে) */}
      <div className="hidden gap-2 lg:flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onColumnsChange(n)}
            aria-label={`${n} columns`}
            className={cn(
              "flex h-6 w-7 cursor-pointer items-center justify-center rounded-sm transition-colors",
              n === columns ? "bg-neutral-300 text-black" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
            )}
          >
            <ColumnIcon n={n} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopToolbar;