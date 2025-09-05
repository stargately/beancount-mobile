import { AccountHierarchyQuery } from "@/generated-graphql/graphql";

export function getAccountTotals(
  currency: string,
  data?: AccountHierarchyQuery,
) {
  if (!currency || !data?.accountHierarchy?.data) {
    return {
      assets: "0.00",
      liabilities: "0.00",
      income: "0.00",
      expenses: "0.00",
      equity: "0.00",
    };
  }

  const hierarchyData = data.accountHierarchy.data;
  const totals = {
    assets: "0.00",
    liabilities: "0.00",
    income: "0.00",
    expenses: "0.00",
    equity: "0.00",
  };

  // Extract totals from the hierarchy data based on account type labels
  hierarchyData.forEach((item) => {
    if (!item.data?.balance_children) return;

    // Get the currency balance (assuming USD for now, but could be dynamic)
    const balanceChildren = item.data.balance_children as Record<
      string,
      number
    >;
    const balance = balanceChildren[currency] || balanceChildren.USD || 0;
    const formattedBalance = Math.abs(balance).toFixed(2);

    switch (item.label.toLowerCase()) {
      case "assets":
        totals.assets = formattedBalance;
        break;
      case "liabilities":
        totals.liabilities = formattedBalance;
        break;
      case "income":
        totals.income = balance < 0 ? `-${formattedBalance}` : formattedBalance;
        break;
      case "expenses":
        totals.expenses = formattedBalance;
        break;
      case "equity":
        totals.equity = balance < 0 ? `-${formattedBalance}` : formattedBalance;
        break;
    }
  });

  return totals;
}
