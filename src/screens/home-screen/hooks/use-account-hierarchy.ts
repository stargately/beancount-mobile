import { getAssetsLiabilities } from "@/screens/home-screen/selectors/select-assets-liabilities";
import { useAccountHierarchyQuery } from "@/generated-graphql/graphql";

export const useAccountHierarchy = (userId: string, currency: string) => {
  const { loading, data, error, refetch } = useAccountHierarchyQuery({
    variables: { userId },
    fetchPolicy: "network-only",
  });
  const accounts = getAssetsLiabilities(currency, data);
  return { loading, data, error, refetch, accounts };
};
