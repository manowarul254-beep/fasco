import { ChevronDown } from "lucide-react";
import { cn } from "../../../utils/cn";

/**
 * SelectField: তীরসহ বক্সওয়ালা ড্রপডাউন
 * Props: name, value (না দিলে uncontrolled), onChange, placeholder, options, leftIcon, className
 */
const SelectField = ({ name, value, onChange, placeholder, options, leftIcon, className, required }) => (
  <div className="relative">
    {leftIcon && <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2">{leftIcon}</span>}
    <select
      name={name}
      required={required}
      {...(value !== undefined ? { value, onChange } : { defaultValue: placeholder ? "" : undefined })}
      className={cn(
        "w-full cursor-pointer appearance-none border border-neutral-400 bg-white px-5 py-4 text-sm text-black outline-none focus:border-black",
        className
      )}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown size={18} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2" />
  </div>
);

export default SelectField;