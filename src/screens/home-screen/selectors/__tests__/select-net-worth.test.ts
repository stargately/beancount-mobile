import { getNetWorth } from "../select-net-worth";
import { HomeChartsQuery } from "@/generated-graphql/graphql";

describe("getNetWorth", () => {
  it("returns default value when currency is empty", () => {
    const result = getNetWorth("");
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("returns default value when data is undefined", () => {
    const result = getNetWorth("USD");
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("returns default value when homeCharts is missing", () => {
    const data = {} as HomeChartsQuery;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("returns default value when Net Worth label is not found", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Other",
            data: [],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("returns default value when Net Worth data array is empty", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("extracts the last balance for the given currency", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { USD: "1000.50" },
              },
              {
                date: "2025-02-01",
                balance: { USD: "2500.75" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "2500.75" });
  });

  it("formats the result to two decimal places", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { USD: "1234.5678" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "1234.57" });
  });

  it("handles negative net worth values", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { USD: "-500.25" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "-500.25" });
  });

  it("returns 0.00 when currency is not found in balance", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { EUR: "1000.00" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("handles multiple currencies and returns the requested one", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: {
                  USD: "1000.00",
                  EUR: "850.00",
                  GBP: "750.00",
                },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("EUR", data);
    expect(result).toEqual({ netAssets: "850.00" });
  });

  it("handles zero net worth", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { USD: "0" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "0.00" });
  });

  it("handles very large numbers correctly", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { USD: "1234567890.12" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "1234567890.12" });
  });

  it("handles very small decimal numbers", () => {
    const data = {
      homeCharts: {
        data: [
          {
            label: "Net Worth",
            data: [
              {
                date: "2025-01-01",
                balance: { USD: "0.01" },
              },
            ],
          },
        ],
      },
    } as any;
    const result = getNetWorth("USD", data);
    expect(result).toEqual({ netAssets: "0.01" });
  });
});
