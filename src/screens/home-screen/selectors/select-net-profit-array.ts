import { HomeCharts } from "@/screens/home-screen/data/__generated__/HomeCharts";
import { i18n } from "@/translations";
import { isSameMonth } from "@/screens/home-screen/selectors/select-net-worth-array";

export function selectNetProfitArray(currency: string, data?: HomeCharts) {
  const netProfit = data?.homeCharts?.data.find(
    (n) => n.label === "Net Profit"
  );
  const last = netProfit?.data.slice(
    netProfit?.data.length - 7,
    netProfit?.data.length
  );
  if (
    last &&
    last.length >= 2 &&
    isSameMonth(last[last.length - 1].date, last[last.length - 2].date)
  ) {
    last.splice(last.length - 2, 1);
  }

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
