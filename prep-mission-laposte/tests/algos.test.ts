import { describe, expect, it } from "vitest";
import {
  cartTotalCents,
  closestToZero,
  formatPriceEur,
  groupBy,
  minHorseGap,
  parseQuery,
  resolveMimeType,
  uniqueBy,
} from "@/algos/codingGame";

describe("closestToZero", () => {
  it("retourne 0 si le tableau est vide", () => {
    expect(closestToZero([])).toBe(0);
  });

  it("choisit la température la plus proche de zéro", () => {
    expect(closestToZero([1, -2, -8, 4, 5])).toBe(1);
  });

  it("privilégie le positif en cas d'égalité", () => {
    expect(closestToZero([-5, 5])).toBe(5);
  });

  it("gère un zéro déjà présent", () => {
    expect(closestToZero([-1, 0, 1])).toBe(0);
  });
});

describe("minHorseGap", () => {
  it("calcule l'écart minimal après tri", () => {
    expect(minHorseGap([3, 5, 8, 10, 15])).toBe(2);
  });
});

describe("resolveMimeType", () => {
  const mapping = { html: "text/html", png: "image/png" };

  it("retrouve le type MIME sans tenir compte de la casse", () => {
    expect(resolveMimeType("index.HTML", mapping)).toBe("text/html");
  });

  it("retourne UNKNOWN sans extension", () => {
    expect(resolveMimeType("README", mapping)).toBe("UNKNOWN");
  });
});

describe("cartTotalCents", () => {
  it("applique 10 % dès 50 €", () => {
    expect(cartTotalCents([{ unitPriceCents: 3000, quantity: 2 }])).toBe(5400);
  });

  it("n'applique pas la remise sous le seuil", () => {
    expect(cartTotalCents([{ unitPriceCents: 1990, quantity: 2 }])).toBe(3980);
  });
});

describe("helpers", () => {
  it("formate un prix FR", () => {
    expect(formatPriceEur(1990)).toContain("19,90");
  });

  it("groupe par clé", () => {
    const grouped = groupBy(
      [
        { cat: "a", n: 1 },
        { cat: "b", n: 2 },
        { cat: "a", n: 3 },
      ],
      (item) => item.cat,
    );
    expect(grouped.a).toHaveLength(2);
  });

  it("déduplique par id", () => {
    expect(uniqueBy([{ id: 1 }, { id: 1 }, { id: 2 }], (item) => item.id)).toHaveLength(2);
  });

  it("parse une query string", () => {
    expect(parseQuery("?q=colis&sort=price")).toEqual({ q: "colis", sort: "price" });
  });
});
