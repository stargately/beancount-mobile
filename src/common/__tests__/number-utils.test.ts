import { shortNumber } from "../number-utils";

describe("shortNumber", () => {
  it("formats values below one thousand with a fixed decimal", () => {
    expect(shortNumber(0)).toBe("0.0");
    expect(shortNumber(12)).toBe("12.0");
    expect(shortNumber(999.4)).toBe("999.4");
  });

  it("applies suffixes for large magnitudes", () => {
    expect(shortNumber(1000)).toBe("1K");
    expect(shortNumber(1250)).toBe("1.3K");
    expect(shortNumber(1500000)).toBe("1.5M");
    expect(shortNumber(2000000)).toBe("2M");
    expect(shortNumber(3500000000)).toBe("3.5B");
  });

  it("preserves the negative sign for negative values", () => {
    expect(shortNumber(-50)).toBe("-50.0");
    expect(shortNumber(-2100)).toBe("-2.1K");
    expect(shortNumber(-3500000)).toBe("-3.5M");
  });

  it("handles numeric strings", () => {
    expect(shortNumber("1250")).toBe("1.3K");
    expect(shortNumber("999" as const)).toBe("999.0");
  });

  it("returns the original value when parsing fails", () => {
    expect(shortNumber("not-a-number")).toBe("not-a-number");
  });
});
