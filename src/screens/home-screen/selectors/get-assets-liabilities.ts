import { AccountHierarchy } from "@/screens/home-screen/data/__generated__/AccountHierarchy";

export function getAssetsLiabilities(
  currency: string,
  data?: AccountHierarchy
) {
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
