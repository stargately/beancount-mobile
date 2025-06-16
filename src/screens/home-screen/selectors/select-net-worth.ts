import { HomeCharts } from "@/screens/home-screen/data/__generated__/HomeCharts";

export function getNetWorth(currency: string, data?: HomeCharts) {
  if (!currency) {
    return { netAssets: "0.00" };
  }
  const netWorthList = data?.homeCharts?.data.find(
    (n) => n.label === "Net Worth",
  );
  // console.log("netWorthList", netWorthList?.data.slice(-1)[0]?.balance[currency])
  return {
    netAssets: Number(
      netWorthList?.data[netWorthList?.data.length - 1]?.balance[currency] || 0,
    ).toFixed(2),
  };
}
