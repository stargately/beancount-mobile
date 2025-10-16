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

  it("handles the first day of the year", () => {
    const formatted = getFormatDate(new Date(2025, 0, 1));
    expect(formatted).toBe("2025-01-01");
  });

  it("handles the last day of the year", () => {
    const formatted = getFormatDate(new Date(2025, 11, 31));
    expect(formatted).toBe("2025-12-31");
  });

  it("formats dates from different years correctly", () => {
    const formatted1 = getFormatDate(new Date(2020, 5, 15));
    const formatted2 = getFormatDate(new Date(2030, 5, 15));
    expect(formatted1).toBe("2020-06-15");
    expect(formatted2).toBe("2030-06-15");
  });

  it("handles leap year dates", () => {
    const formatted = getFormatDate(new Date(2024, 1, 29));
    expect(formatted).toBe("2024-02-29");
  });
});
