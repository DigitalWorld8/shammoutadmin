// utils/objectHelpers.ts
export const ensureExtensible = <T>(obj: T): T => {
    if (!obj) return obj;
    if (Object.isExtensible(obj)) return obj;
    return JSON.parse(JSON.stringify(obj)) as T;
  };