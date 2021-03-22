import { useQuery } from "@apollo/client";
import { accountHierarchy } from "@/screens/home-screen/data/account-hierarchy";
import { AccountHierarchy } from "@/screens/home-screen/data/__generated__/AccountHierarchy";

function getAccounts(currency: string, data?: AccountHierarchy) {
  if (!currency) {
    return { assets: "0.00", liabilities: "0.00" };
  }
  const assetsList = data?.accountHierarchy?.data.filter(
    (a) => a.label === "Assets"
  );
  let assets = 0;
  assetsList?.forEach((a) => {
    assets += Number(a.data.balance_children[currency] || 0);
  });

  const liabilitiesList = data?.accountHierarchy?.data.filter(
    (a) => a.label === "Liabilities"
  );
  let liabilities = 0;
  liabilitiesList?.forEach((a) => {
    liabilities += Number(a.data.balance_children[currency] || 0);
  });

  return { assets: assets.toFixed(2), liabilities: liabilities.toFixed(2) };
}

export const useAccountHierarchy = (userId: string, currency: string) => {
  const { loading, data, error, refetch } = useQuery<AccountHierarchy>(
    accountHierarchy,
    {
      variables: { userId },
    }
  );
  const accounts = getAccounts(currency, data);
  return { loading, data, error, refetch, accounts };
};
