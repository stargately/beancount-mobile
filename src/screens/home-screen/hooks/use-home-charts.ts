import { useHomeChartsQuery } from "@/generated-graphql/graphql";
import { selectNetWorthArray } from "@/screens/home-screen/selectors/select-net-worth-array";
import { selectNetProfitArray } from "@/screens/home-screen/selectors/select-net-profit-array";
import { getNetWorth } from "@/screens/home-screen/selectors/select-net-worth";

export const useHomeCharts = (userId: string, currency: string) => {
  const { loading, data, error, refetch } = useHomeChartsQuery({
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const netWorth = getNetWorth(currency, data);
  const lastSixProfitData = selectNetProfitArray(currency, data);
  const lastSixWorthData = selectNetWorthArray(currency, data);

  return {
    loading,
    data,
    error,
    refetch,
    netWorth,
    lastSixProfitData,
    lastSixWorthData,
  };
};
