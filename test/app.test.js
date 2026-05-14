import { expect, test } from "vitest";
import { useLocalCurrency } from "../src/useLocalCurrency.js";

test("useLocalCurrency", () => {
  expect(useLocalCurrency(5)).toBe("R$ 5,00");
});
