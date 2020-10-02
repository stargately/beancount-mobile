import { useQuery } from "react-apollo";
import { homeCharts } from "@/screens/home-screen/data/home-charts";
import { HomeCharts } from "@/screens/home-screen/data/__generated__/HomeCharts";
import { i18n } from "@/translations";

function getNetWorth(currency: string, data?: HomeCharts) {
  if (!currency) {
    return { netAssets: "0.00" };
  }
  const netWorthList = data?.homeCharts?.data.find(
    (n) => n.label === "Net Worth"
  );
  return {
    netAssets: Number(
      netWorthList?.data[netWorthList?.data.length - 1]?.balance[currency] || 0
    ).toFixed(2),
  };
}

function getLastSixMonth(currency: string, data?: HomeCharts) {
  const netProfit = data?.homeCharts?.data.find(
    (n) => n.label === "Net Profit"
  );
  const last = netProfit?.data.slice(netProfit?.data.length - 6);
  let labels = last?.map((l) => l.date.slice(5, 7)) || [];
  let numbers = last?.map((l) => Number(l.balance[currency] || 0)) || [];
  if (labels.length === 0) {
    labels = [i18n.t("noDataCharts")];
  }
  if (numbers.length === 0) {
    numbers = [0];
  }
  return { labels, numbers };
}

function getNetWorthDataArray(currency: string, data?: HomeCharts) {
  const netWorth = data?.homeCharts?.data.find((n) => n.label === "Net Worth");
  const last = netWorth?.data.slice(
    netWorth?.data.length - 7,
    netWorth?.data.length - 1
  );
  let labels = last?.map((l) => l.date.slice(5, 7)) || [];
  let numbers = last?.map((l) => Number(l.balance[currency] / 1000 || 0)) || [];
  if (labels.length === 0) {
    labels = [i18n.t("noDataCharts")];
  }
  if (numbers.length === 0) {
    numbers = [0];
  }
  return { labels, numbers };
}

export const useHomeCharts = (userId: string, currency: string) => {
  const { loading, data, error, refetch } = useQuery<HomeCharts>(homeCharts, {
    variables: { userId },
  });
  const netWorth = getNetWorth(currency, data);
  const lastSixMonthData = getLastSixMonth(currency, data);
  const lastSixWorthData = getNetWorthDataArray(currency, data);
  return {
    loading,
    data,
    error,
    refetch,
    netWorth,
    lastSixMonthData,
    lastSixWorthData,
  };
};
