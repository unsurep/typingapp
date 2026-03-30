/** Deep-merge plain objects (for locale message overrides on top of English). */
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T> | Record<string, unknown>
): T {
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(override)) {
    const bv = out[key];
    const ov = override[key as keyof typeof override];
    if (
      ov !== null &&
      typeof ov === "object" &&
      !Array.isArray(ov) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMerge(
        bv as Record<string, unknown>,
        ov as Record<string, unknown>
      );
    } else if (ov !== undefined) {
      out[key] = ov as unknown;
    }
  }
  return out as T;
}
