import { useQuery } from "@apollo/client";
import { accountHierarchy } from "@/screens/home-screen/data/account-hierarchy";
import { AccountHierarchy } from "@/screens/home-screen/data/__generated__/AccountHierarchy";
import { getAssetsLiabilities } from "@/screens/home-screen/selectors/select-assets-liabilities";

export const useAccountHierarchy = (userId: string, currency: string) => {
  const { loading, data, error, refetch } = useQuery<AccountHierarchy>(
    accountHierarchy,
    {
      variables: { userId },
      fetchPolicy: "network-only",
    },
  );
  const accounts = getAssetsLiabilities(currency, data);
  return { loading, data, error, refetch, accounts };
};
