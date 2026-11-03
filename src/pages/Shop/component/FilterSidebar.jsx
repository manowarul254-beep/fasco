import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "../../../utils/cn";
import { sizeOptions, colorOptions, priceOptions, collectionOptions } from "../../../data/shopFilters";

// তালিকায় মান থাকলে বাদ, না থাকলে যোগ
const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

// একটা ফিল্টার গ্রুপ: শিরোনাম + (ঐচ্ছিক) খোলা-বন্ধ তীর
const FilterGroup = ({ title, collapsible = false, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-black">{title}</h3>
        {collapsible && (
          <button onClick={() => setOpen(!open)} aria-label={`Toggle ${title}`} className="cursor-pointer text-black">
            <ChevronUp size={14} className={cn("transition-transform", !open && "rotate-180")} />
          </button>
        )}
      </div>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

const textBtn = (active) =>
  cn("cursor-pointer text-xs transition-colors hover:text-black", active ? "text-black font-medium" : "text-neutral-400");

/**
 * FilterSidebar
 * Props:
 *  - filters  : বর্তমান ফিল্টারের অবস্থা
 *  - onChange : (newFilters) => {}
 *  - brands, tags : API থেকে আসা তালিকা
 */
const FilterSidebar = ({ filters, onChange, brands = [], tags = [] }) => {
  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <aside>
      <h2 className="font-heading text-xl font-bold text-black">Filters</h2>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s}
              onClick={() => set({ sizes: toggle(filters.sizes, s) })}
              className={cn(
                "h-7 w-7 cursor-pointer border text-[10px]",
                filters.sizes.includes(s) ? "border-black bg-black text-white" : "border-neutral-300 text-neutral-400"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colors">
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((c) => (
            <button
              key={c}
              onClick={() => set({ colors: toggle(filters.colors, c) })}
              aria-label={`Color ${c}`}
              className={cn(
                "h-5 w-5 cursor-pointer rounded-full",
                filters.colors.includes(c) && "ring-2 ring-black ring-offset-2"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Prices">
        <ul className="flex flex-col gap-3">
          {priceOptions.map((p) => (
            <li key={p.label}>
              <button
                onClick={() => set({ price: filters.price?.label === p.label ? null : p })}
                className={textBtn(filters.price?.label === p.label)}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Brands" collapsible>
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {brands.map((b) => (
            <button key={b} onClick={() => set({ brands: toggle(filters.brands, b) })} className={textBtn(filters.brands.includes(b))}>
              {b}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Collections" collapsible>
        <ul className="flex flex-col gap-3">
          {collectionOptions.map((c) => (
            <li key={c}>
              <button
                onClick={() => set({ collection: filters.collection === c ? null : c })}
                className={textBtn(filters.collection === c)}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Tags">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {tags.map((t) => (
            <button key={t} onClick={() => set({ tags: toggle(filters.tags, t) })} className={textBtn(filters.tags.includes(t))}>
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
};

export default FilterSidebar;