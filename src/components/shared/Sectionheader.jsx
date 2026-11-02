import { cn } from "../../utils/cn";

const SectionHeader = ({ title, description, align = "center", className }) => {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <h2 className="font-heading text-4xl font-bold text-muted lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-[620px] leading-relaxed text-neutral-500",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;