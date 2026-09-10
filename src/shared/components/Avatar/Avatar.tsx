import { cn } from "@/shared/utils/cn";
import type { AvatarProps } from "./Avatar.type";

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const Avatar = ({
  name,
  size = "md",
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        `
        flex items-center justify-center
        rounded-full
        bg-primary
        font-semibold
        text-primary-dark
        `,
        sizeMap[size]
      )}
    >
      {initials}
    </div>
  );
};

export default Avatar;