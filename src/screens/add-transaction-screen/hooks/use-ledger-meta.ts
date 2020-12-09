import { useQuery } from "react-apollo";
import { getLedgerMeta } from "@/screens/add-transaction-screen/data/queries";
import * as lodash from "lodash";
import {
  ledgerMeta,
  ledgerMetaVariables,
  // eslint-disable-next-line camelcase
  ledgerMeta_ledgerMeta_data,
} from "@/screens/add-transaction-screen/data/__generated__/ledgerMeta";

export interface OptionTab {
  title: string;
  options: Array<string>;
}

// eslint-disable-next-line camelcase
function getAccountsAndCurrency(data: ledgerMeta_ledgerMeta_data | undefined) {
  let assets: Array<string> = [];
  let expenses: Array<string> = [];
  let currencies: Array<string> = [];

  if (data) {
    // eslint-disable-next-line camelcase
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

function handleOptions(options: Array<string>) {
  const optionTabs: Array<OptionTab> = [{ title: "ALL", options }];
  options.forEach((val) => {
    const prefix = val.split(":")[0];
    const retIndex = lodash.findIndex(
      optionTabs,
      (opts) => opts.title === prefix
    );
    if (retIndex === -1) {
      optionTabs.push({ title: prefix, options: [val] });
    } else {
      optionTabs[retIndex].options.push(val);
    }
  });
  return optionTabs;
}

export const useLedgerMeta = (userId: string) => {
  const { data, error, loading, refetch } = useQuery<
    ledgerMeta,
    ledgerMetaVariables
  >(getLedgerMeta, { variables: { userId } });

  const { assets, expenses, currencies } = getAccountsAndCurrency(
    data?.ledgerMeta.data
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
