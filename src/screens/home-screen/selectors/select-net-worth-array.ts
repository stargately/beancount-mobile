import { HomeChartsQuery } from "@/generated-graphql/graphql";
import { i18n } from "@/translations";

export function isSameMonth(date1?: string, date2?: string): boolean {
  if (!date1 || !date2) {
    return date1 === date2;
  }
  // Compare both year and month (YYYY-MM)
  return date1.slice(0, 7) === date2.slice(0, 7);
}

export function selectNetWorthArray(currency: string, data?: HomeChartsQuery) {
  const netWorth = data?.homeCharts?.data.find((n) => n.label === "Net Worth");
  const last = netWorth?.data.slice(
    netWorth?.data.length - 7,
    netWorth?.data.length,
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
