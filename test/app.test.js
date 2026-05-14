import { expect, test } from "vitest";
import { useDifDate } from "../src/useDifDate.js";

test("useLocalCurrency", () => {
  expect(useLocalCurrency(5)).toBe("R$ 5,00");
});
