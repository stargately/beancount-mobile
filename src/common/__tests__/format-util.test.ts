import { getFormatDate } from "../format-util";

describe("getFormatDate", () => {
  it("formats a date with zero-padded month and day", () => {
    const formatted = getFormatDate(new Date(2025, 1, 3));
    expect(formatted).toBe("2025-02-03");
  });

  it("supports double-digit months and days without extra zeroes", () => {
    const formatted = getFormatDate(new Date(2025, 10, 23));
    expect(formatted).toBe("2025-11-23");
  });
});
