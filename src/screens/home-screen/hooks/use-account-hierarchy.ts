import { getAccountTotals } from "@/screens/home-screen/selectors/select-account-totals";
import { useAccountHierarchyQuery } from "@/generated-graphql/graphql";

export const useAccountHierarchy = (userId: string, currency: string) => {
  const { loading, data, error, refetch } = useAccountHierarchyQuery({
    variables: { userId },
    fetchPolicy: "network-only",
  });
  const accounts = getAccountTotals(currency, data);
  return { loading, data, error, refetch, accounts };
};
