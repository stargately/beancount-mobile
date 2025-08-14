import { AccountHierarchyQuery } from "@/generated-graphql/graphql";

export function getAccountTotals(
  currency: string,
  data?: AccountHierarchyQuery,
) {
  if (!currency) {
    return {
      assets: "0.00",
      liabilities: "0.00",
      income: "0.00",
      expenses: "0.00",
      equity: "0.00",
    };
  }

  const getTotal = (label: string) => {
    const list = data?.accountHierarchy?.data.filter((a) => a.label === label);
    let total = 0;
    list?.forEach((a) => {
      total += Number(a.data.balance_children[currency] || 0);
    });
    return total;
  };

  const assets = getTotal("Assets");
  const liabilities = getTotal("Liabilities");
  const income = getTotal("Income");
  const expenses = getTotal("Expenses");
  const equity = getTotal("Equity");

  return {
    assets: assets.toFixed(2),
    liabilities: liabilities.toFixed(2),
    income: income.toFixed(2),
    expenses: expenses.toFixed(2),
    equity: equity.toFixed(2),
  };
}
