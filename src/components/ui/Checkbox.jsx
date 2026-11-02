import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Checkbox = forwardRef(({ label, error, className, id, ...props }, ref) => {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center gap-2 text-sm"
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn("h-4 w-4 cursor-pointer accent-black", className)}
          {...props}
        />
        {label}
      </label>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

export default Checkbox;