// Mock dependencies BEFORE any imports
const Module = require("module");
const originalRequire = Module.prototype.require;

Module.prototype.require = function (this: NodeModule, id: string) {
  // Mock expo-localization
  if (id === "expo-localization") {
    return {
      getLocales: () => [{ languageCode: "en" }],
    };
  }

  // Mock @/translations to avoid loading expo dependencies
  if (id === "@/translations" || id.includes("/translations")) {
    return {
      i18n: {
        t: (key: string) => {
          if (key === "noDataCharts") return "No data";
          return key;
        },
        locale: "en",
        enableFallback: true,
      },
      setLocale: () => {},
    };
  }

  return originalRequire.apply(this, arguments);
};

import { HomeChartsQuery } from "@/generated-graphql/graphql";
import { selectChartArray, isSameMonth } from "../select-chart-array-helper";

describe("selectChartArray", () => {
  it("returns no data labels when data is undefined", () => {
    const result = selectChartArray("Test Label", "USD");
    expect(result.labels).toEqual(["No data"]);
    expect(result.numbers).toEqual([0]);
  });

  it("returns no data labels when homeCharts is missing", () => {
    const data = {} as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["No data"]);
    expect(result.numbers).toEqual([0]);
  });

  it("returns no data labels when requested label is not found", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Other Label",
            data: [],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["No data"]);
    expect(result.numbers).toEqual([0]);
  });

  it("extracts last 7 data points", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: Array.from({ length: 12 }, (_, i) => ({
              date: `2025-${String(i + 1).padStart(2, "0")}-01`,
              balance: { USD: String(1000 + i * 100) },
            })),
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["06", "07", "08", "09", "10", "11", "12"]);
    expect(result.numbers).toEqual([1500, 1600, 1700, 1800, 1900, 2000, 2100]);
  });

  it("handles fewer than 7 data points", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: [
              { date: "2025-01-01", balance: { USD: "1000" } },
              { date: "2025-02-01", balance: { USD: "1100" } },
              { date: "2025-03-01", balance: { USD: "1200" } },
            ],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["01", "02", "03"]);
    expect(result.numbers).toEqual([1000, 1100, 1200]);
  });

  it("removes duplicate month entries when last two are same month", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: [
              { date: "2025-01-01", balance: { USD: "1000" } },
              { date: "2025-01-15", balance: { USD: "1100" } },
              { date: "2025-01-30", balance: { USD: "1200" } },
            ],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    // Should keep only the last entry for January
    expect(result.labels).toEqual(["01", "01"]);
    expect(result.numbers).toEqual([1000, 1200]);
  });

  it("handles missing currency in balance", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: [{ date: "2025-01-01", balance: { EUR: "1000" } }],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["01"]);
    expect(result.numbers).toEqual([0]);
  });

  it("handles negative values", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: [
              { date: "2025-01-01", balance: { USD: "-500" } },
              { date: "2025-02-01", balance: { USD: "200" } },
            ],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["01", "02"]);
    expect(result.numbers).toEqual([-500, 200]);
  });

  it("handles decimal values correctly", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: [{ date: "2025-01-01", balance: { USD: "1234.56" } }],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["01"]);
    expect(result.numbers).toEqual([1234.56]);
  });

  it("extracts only month portion from date labels", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Test Label",
            data: [{ date: "2025-12-25", balance: { USD: "5000" } }],
          },
        ],
      },
    } as unknown as HomeChartsQuery;
    const result = selectChartArray("Test Label", "USD", data);
    expect(result.labels).toEqual(["12"]);
  });
});

describe("isSameMonth helper", () => {
  it("returns true for dates in the same year and month", () => {
    expect(isSameMonth("2025-01-15", "2025-01-20")).toBe(true);
  });

  it("returns false for dates in different months", () => {
    expect(isSameMonth("2025-01-15", "2025-02-15")).toBe(false);
  });

  it("returns false for same month in different years", () => {
    expect(isSameMonth("2024-01-15", "2025-01-20")).toBe(false);
  });

  it("returns true for same date", () => {
    expect(isSameMonth("2025-03-15", "2025-03-15")).toBe(true);
  });

  it("handles undefined dates", () => {
    expect(isSameMonth(undefined, undefined)).toBe(true);
    expect(isSameMonth("2025-01-15", undefined)).toBe(false);
    expect(isSameMonth(undefined, "2025-01-15")).toBe(false);
  });
});
