type QueryValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | Array<string | number>;

export function createQueryParams(
  params: Record<string, QueryValue>,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return;
      }

      value.forEach((item) => searchParams.append(key, String(item)));

      return;
    }

    if (value instanceof Date) {
      searchParams.append(key, value.toISOString());

      return;
    }

    if (typeof value === "string") {
      const trimmed = value.trim();

      if (!trimmed) {
        return;
      }

      searchParams.append(key, trimmed);

      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams;
}
