import { useLedgerMetaQuery, LedgerMeta } from "@/generated-graphql/graphql";

export interface OptionTab {
  title: string;
  options: string[];
}

function getAccountsAndCurrency(data: LedgerMeta | undefined) {
  let assets: string[] = [];
  let expenses: string[] = [];
  let currencies: string[] = [];

  if (data) {
    const assetsName = data.options.name_assets;
    const expensesName = data.options.name_expenses;
    const incomeName = data.options.name_income;
    const liabilityName = data.options.name_liabilities;
    const equity = data.options.name_equity;

    const fromInOrder = (a: string, b: string) => {
      function getOrder(name: string) {
        if (name.startsWith(assetsName)) {
          return 0;
        }
        if (name.startsWith(liabilityName)) {
          return 1;
        }
        if (name.startsWith(incomeName)) {
          return 2;
        }
        if (name.startsWith(expensesName)) {
          return 3;
        }
        if (name.startsWith(equity)) {
          return 4;
        }
        return 5;
      }

      return getOrder(a) - getOrder(b);
    };

    const toInOrder = (a: string, b: string) => {
      function getOrder(name: string) {
        if (name.startsWith(expensesName)) {
          return 0;
        }
        if (name.startsWith(liabilityName)) {
          return 3;
        }
        if (name.startsWith(assetsName)) {
          return 1;
        }
        if (name.startsWith(equity)) {
          return 4;
        }
        if (name.startsWith(incomeName)) {
          return 2;
        }
        return 5;
      }

      return getOrder(a) - getOrder(b);
    };

    assets = [...data.accounts].sort(fromInOrder);
    expenses = [...data.accounts].sort(toInOrder);
    currencies = data.options.operating_currency;
  }
  return { assets, expenses, currencies };
}

function handleOptions(options: string[]) {
  const optionTabs: OptionTab[] = [{ title: "All", options }];
  options.forEach((val) => {
    const prefix = val.split(":")[0];
    const index = optionTabs.findIndex((opt) => opt.title === prefix);
    if (index === -1) {
      optionTabs.push({ title: prefix, options: [val] });
    } else {
      optionTabs[index].options.push(val);
    }
  });
  return optionTabs;
}

export const useLedgerMeta = (userId: string) => {
  const { data, error, loading, refetch } = useLedgerMetaQuery({
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const { assets, expenses, currencies } = getAccountsAndCurrency(
    data?.ledgerMeta.data,
  );

  const assetsOptionTabs = handleOptions(assets);
  const expensesOptionTabs = handleOptions(expenses);

  return {
    data: data?.ledgerMeta.data,
    assets,
    expenses,
    assetsOptionTabs,
    expensesOptionTabs,
    currencies,
    error,
    loading,
    refetch,
  };
};
