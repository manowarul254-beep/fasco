import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-black text-white hover:bg-neutral-800",
  outline: "border border-black bg-transparent text-black hover:bg-black hover:text-white",
  secondary: "bg-white text-black hover:bg-neutral-200",
  ghost: "bg-transparent text-black hover:bg-black/5",
  danger: "bg-red-600 text-white hover:bg-red-700",
  link: "bg-transparent p-0 text-black underline underline-offset-4 hover:opacity-70",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-10 py-4 text-lg",
  icon: "h-10 w-10 p-0",
};

const Button = ({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}) => {
  const isButton = Tag === "button";

  return (
    <Tag
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium",
        "transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...(isButton && { disabled: disabled || loading })}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </Tag>
  );
};

export default Button;