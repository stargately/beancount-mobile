import { getAccountTotals } from "../select-account-totals";
import { AccountHierarchyQuery } from "@/generated-graphql/graphql";

// Helper to create minimal test data matching GraphQL types
type TestAccountBalance = {
  account: string;
  balance: number;
  balance_children: Record<string, number>;
  children: TestAccountBalance[];
};

type TestHierarchyItem = {
  type: string;
  label: string;
  data: TestAccountBalance;
};

type TestAccountHierarchyQuery = {
  accountHierarchy: {
    success: boolean;
    data: TestHierarchyItem[];
  };
};

// Helper function to create test data
function createTestData(
  items: Array<{
    label: string;
    balance_children: Record<string, number>;
    balance?: number;
  }>,
): TestAccountHierarchyQuery {
  return {
    accountHierarchy: {
      success: true,
      data: items.map((item) => ({
        type: "account",
        label: item.label,
        data: {
          account: item.label,
          balance: item.balance || 0,
          balance_children: item.balance_children,
          children: [],
        },
      })),
    },
  };
}

describe("getAccountTotals", () => {
  it("returns default values when currency is empty", () => {
    const data = createTestData([]);
    const result = getAccountTotals(
      "",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result).toEqual({
      assets: "0.00",
      liabilities: "0.00",
      income: "0.00",
      expenses: "0.00",
      equity: "0.00",
    });
  });

  it("returns default values when data is undefined", () => {
    const result = getAccountTotals("USD");

    expect(result).toEqual({
      assets: "0.00",
      liabilities: "0.00",
      income: "0.00",
      expenses: "0.00",
      equity: "0.00",
    });
  });

  it("returns default values when accountHierarchy.data is missing", () => {
    const data = {
      accountHierarchy: {
        success: true,
        data: null,
      },
    };

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result).toEqual({
      assets: "0.00",
      liabilities: "0.00",
      income: "0.00",
      expenses: "0.00",
      equity: "0.00",
    });
  });

  it("extracts assets total correctly", () => {
    const data = createTestData([
      { label: "Assets", balance_children: { USD: 1000.5 }, balance: 1000.5 },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.assets).toBe("1000.50");
  });

  it("extracts liabilities total correctly", () => {
    const data = createTestData([
      {
        label: "Liabilities",
        balance_children: { USD: 500.25 },
        balance: 500.25,
      },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.liabilities).toBe("500.25");
  });

  it("handles negative income values correctly", () => {
    const data = createTestData([
      {
        label: "Income",
        balance_children: { USD: -2000.75 },
        balance: -2000.75,
      },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.income).toBe("-2000.75");
  });

  it("handles positive income values correctly", () => {
    const data = createTestData([
      { label: "Income", balance_children: { USD: 1500.0 }, balance: 1500.0 },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.income).toBe("1500.00");
  });

  it("handles expenses total correctly", () => {
    const data = createTestData([
      {
        label: "Expenses",
        balance_children: { USD: 750.99 },
        balance: 750.99,
      },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.expenses).toBe("750.99");
  });

  it("handles negative equity values correctly", () => {
    const data = createTestData([
      {
        label: "Equity",
        balance_children: { USD: -3000.0 },
        balance: -3000.0,
      },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.equity).toBe("-3000.00");
  });

  it("handles positive equity values correctly", () => {
    const data = createTestData([
      { label: "Equity", balance_children: { USD: 500.0 }, balance: 500.0 },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );
    expect(result.equity).toBe("500.00");
  });

  it("handles multiple account types in the same data", () => {
    const data = createTestData([
      { label: "Assets", balance_children: { USD: 5000.0 }, balance: 5000.0 },
      {
        label: "Liabilities",
        balance_children: { USD: 1000.0 },
        balance: 1000.0,
      },
      {
        label: "Income",
        balance_children: { USD: -3000.0 },
        balance: -3000.0,
      },
      {
        label: "Expenses",
        balance_children: { USD: 2000.0 },
        balance: 2000.0,
      },
      { label: "Equity", balance_children: { USD: 1000.0 }, balance: 1000.0 },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result).toEqual({
      assets: "5000.00",
      liabilities: "1000.00",
      income: "-3000.00",
      expenses: "2000.00",
      equity: "1000.00",
    });
  });

  it("handles case-insensitive account labels", () => {
    const data = createTestData([
      { label: "ASSETS", balance_children: { USD: 100.0 }, balance: 100.0 },
      {
        label: "liabilities",
        balance_children: { USD: 50.0 },
        balance: 50.0,
      },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("100.00");
    expect(result.liabilities).toBe("50.00");
  });

  it("falls back to USD when requested currency is not available", () => {
    const data = createTestData([
      {
        label: "Assets",
        balance_children: { USD: 1000.0, EUR: 900.0 },
        balance: 1000.0,
      },
    ]);

    const result = getAccountTotals(
      "CNY",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("1000.00");
  });

  it("uses the requested currency when available", () => {
    const data = createTestData([
      {
        label: "Assets",
        balance_children: { USD: 1000.0, EUR: 900.0, CNY: 7000.0 },
        balance: 900.0,
      },
    ]);

    const result = getAccountTotals(
      "EUR",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("900.00");
  });

  it("returns 0 when currency is not found and no USD fallback", () => {
    const data = createTestData([
      { label: "Assets", balance_children: { EUR: 900.0 }, balance: 900.0 },
    ]);

    const result = getAccountTotals(
      "CNY",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("0.00");
  });

  it("skips items without balance_children data", () => {
    const data: TestAccountHierarchyQuery = {
      accountHierarchy: {
        success: true,
        data: [
          {
            type: "account",
            label: "Assets",
            data: {
              account: "Assets",
              balance: 0,
              balance_children: {},
              children: [],
            },
          },
          {
            type: "account",
            label: "Liabilities",
            data: {
              account: "Liabilities",
              balance: 500.0,
              balance_children: { USD: 500.0 },
              children: [],
            },
          },
        ],
      },
    };

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("0.00");
    expect(result.liabilities).toBe("500.00");
  });

  it("handles zero balances correctly", () => {
    const data = createTestData([
      { label: "Assets", balance_children: { USD: 0 }, balance: 0 },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("0.00");
  });

  it("handles very small decimal values correctly", () => {
    const data = createTestData([
      { label: "Assets", balance_children: { USD: 0.01 }, balance: 0.01 },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("0.01");
  });

  it("handles large values correctly", () => {
    const data = createTestData([
      {
        label: "Assets",
        balance_children: { USD: 999999999.99 },
        balance: 999999999.99,
      },
    ]);

    const result = getAccountTotals(
      "USD",
      data as unknown as AccountHierarchyQuery,
    );

    expect(result.assets).toBe("999999999.99");
  });
});
