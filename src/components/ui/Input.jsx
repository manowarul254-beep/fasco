import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(({ label, error, className, id, ...props }, ref) => {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "border-b border-neutral-400 bg-transparent py-2 outline-none",
          "focus:border-black",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

export default Input;