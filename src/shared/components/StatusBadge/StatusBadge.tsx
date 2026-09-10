export const StatusBadge = ({
  label,
  icon,
  variant = "default",
}: {
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "success";
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        variant === "success"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-indigo-50 text-indigo-700"
      }`}
    >
      {icon}
      {label}
    </span>
  );
};
