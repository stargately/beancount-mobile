import CurrencyIcons from "currency-icons";

export const getCurrencySymbol = (currency: string) => {
  if (currency === "CNY") {
    return "¥";
  }
  return CurrencyIcons[currency]?.symbol || "";
};

export const getShortCurrencyNumber = (value: string) => {
  const n = Number(value);
  if (Math.abs(n) < 1e3) {
    return `${n}`;
  }
  if (Math.abs(n) >= 1e3 && Math.abs(n) < 1e6) {
    return `${(n / 1e3).toFixed(0)}K`;
  }
  if (Math.abs(n) >= 1e6 && Math.abs(n) < 1e9) {
    return `${(n / 1e6).toFixed(1)}M`;
  }
  if (Math.abs(n) >= 1e9 && Math.abs(n) < 1e12) {
    return `${(n / 1e9).toFixed(1)}B`;
  }
  return `${(n / 1e12).toFixed(1)}T`;
};
