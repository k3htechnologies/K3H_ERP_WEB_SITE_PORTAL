export const formatINR = (
  value: number | string | null | undefined,
  options?: {
    fallback?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
  },
): string => {
  const {
    fallback = "₹ 0",
    maximumFractionDigits = 2,
    minimumFractionDigits = 0,
  } = options || {};

  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const amount =
    typeof value === "string" ? Number(value.replace(/,/g, "").trim()) : value;

  if (!Number.isFinite(amount)) {
    return fallback;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
};

export const formatINRCompact = (value: number | null | undefined) => {
  if (!value) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};
