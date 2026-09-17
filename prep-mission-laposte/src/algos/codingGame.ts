/**
 * Puzzles type CodinGame — à connaître par cœur.
 * En test, lis TOUS les cas (tableau vide, égalité, négatifs) avant de coder.
 */

/** Température la plus proche de 0. En cas d'égalité, on privilégie le positif. Tableau vide → 0. */
export function closestToZero(temperatures: number[]): number {
  if (temperatures.length === 0) return 0;

  return temperatures.reduce((closest, current) => {
    const closestAbs = Math.abs(closest);
    const currentAbs = Math.abs(current);
    if (currentAbs < closestAbs) return current;
    if (currentAbs === closestAbs) return Math.max(closest, current);
    return closest;
  });
}

/** Écart minimal entre deux chevaux (Horse-Racing Duals). */
export function minHorseGap(strengths: number[]): number {
  if (strengths.length < 2) return 0;
  const sorted = [...strengths].sort((a, b) => a - b);
  let min = Infinity;
  for (let i = 1; i < sorted.length; i += 1) {
    min = Math.min(min, sorted[i] - sorted[i - 1]);
  }
  return min;
}

/** Associe une extension de fichier à son type MIME (puzzle MIME Type). */
export function resolveMimeType(
  filename: string,
  mapping: Record<string, string>,
): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === filename.length - 1) return "UNKNOWN";
  const ext = filename.slice(lastDot + 1).toLowerCase();
  return mapping[ext] ?? "UNKNOWN";
}

export interface CartLine {
  unitPriceCents: number;
  quantity: number;
}

/** Total TTC d'un panier. Remise 10 % à partir de 50 € (5000 centimes). */
export function cartTotalCents(lines: CartLine[]): number {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPriceCents * line.quantity, 0);
  if (subtotal >= 5000) {
    return Math.round(subtotal * 0.9);
  }
  return subtotal;
}

export function formatPriceEur(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function groupBy<T, K extends string>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      acc[key] = acc[key] ?? [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

export function uniqueBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Parse une query string simple : "q=colis&sort=price". */
export function parseQuery(search: string): Record<string, string> {
  const query = search.startsWith("?") ? search.slice(1) : search;
  if (!query) return {};
  return Object.fromEntries(
    query.split("&").map((pair) => {
      const [rawKey, rawValue = ""] = pair.split("=");
      return [decodeURIComponent(rawKey), decodeURIComponent(rawValue)];
    }),
  );
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delayMs: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}
