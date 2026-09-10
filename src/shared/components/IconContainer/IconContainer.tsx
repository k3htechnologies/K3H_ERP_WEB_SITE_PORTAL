import { cn } from "@/shared/utils/cn";
import type { IconContainerProps } from "./IconContainer.type";

const IconContainer = ({
  children,
  className,
  onClick,
}: IconContainerProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        `
        flex items-center justify-center
        h-10 w-10 rounded-lg

        bg-primary-2
        border-2 border-primary-2
        text-primary-dark

        transition-all duration-200
        hover:bg-primary-dark
        hover:text-white
        hover:shadow-md

        active:scale-95
        `,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default IconContainer;
