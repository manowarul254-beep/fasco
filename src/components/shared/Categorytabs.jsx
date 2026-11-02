import { cn } from "../../utils/cn";

/**
 * CategoryTabs: ক্যাটাগরি বাছাইয়ের বাটন সারি (controlled কম্পোনেন্ট)
 * কোন ট্যাব সক্রিয়, সেটা বাইরের (parent) কম্পোনেন্ট জানে, এখানে শুধু দেখানো হয়।
 *
 * Props:
 *  - tabs     : [{ key, label }]
 *  - active   : সক্রিয় ট্যাবের key
 *  - onChange : (key) => {}
 */
const CategoryTabs = ({ tabs, active, onChange, className }) => {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4 lg:gap-[30px]", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "h-14 min-w-[160px] cursor-pointer rounded-lg px-6 text-base transition-all lg:w-[207px]",
            tab.key === active
              ? "bg-black text-white shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
              : "bg-neutral-50 text-neutral-500 hover:bg-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;