/**
 * Format a number with comma separators using a fixed locale (en-US).
 * This avoids SSR/hydration mismatches when html[lang="ar"] causes
 * browsers to switch to Arabic-Indic numerals on the client side.
 */
export function fmt(value: number): string {
  return value.toLocaleString('en-US');
}
