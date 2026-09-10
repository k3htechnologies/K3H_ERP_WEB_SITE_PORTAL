type FormDataValue =
  | string
  | number
  | boolean
  | Date
  | File
  | Blob
  | null
  | undefined
  | Array<string | number | boolean | File | Blob>;

export function createFormData(data: Record<string, FormDataValue>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return;
      }
      value.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else {
          formData.append(key, String(item));
        }
      });
      return;
    }
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
      return;
    }
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) {
        return;
      }
      formData.append(key, trimmed);
      return;
    }
    formData.append(key, String(value));
  });

  return formData;
}
