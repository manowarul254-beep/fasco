
import { cn } from "../../utils/cn";

const Container = ({ as: Tag = "div", className, children, ...props }) => {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-site px-4 md:px-6 xl:px-0", className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
 
export default Container;
 