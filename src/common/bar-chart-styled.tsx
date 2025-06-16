import React from "react";
import { BarChart } from "@/common/bar-chart";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";

const shortNumber = require("short-number");

export function BarChartStyled({
  labels,
  numbers,
  currencySymbol,
}: {
  labels: string[];
  numbers: number[];
  currencySymbol: string;
}): JSX.Element {
  const theme = useTheme().colorTheme;
  return (
    // @ts-ignore
    <BarChart
      data={{
        labels,
        datasets: [
          {
            data: numbers,
          },
        ],
      }}
      width={ScreenWidth - 2 * contentPadding}
      height={200}
      yAxisLabel={currencySymbol}
      chartConfig={{
        backgroundColor: theme.white,
        backgroundGradientFrom: theme.white,
        backgroundGradientTo: theme.white,
        color: () => theme.primary,
        labelColor: () => theme.text01,
        style: {
          borderRadius: 16,
        },
        propsForBackgroundLines: {
          stroke: theme.black10,
          strokeDasharray: "",
          strokeWidth: 1,
        },
        formatXLabel: (x) => i18n.t(x),
        formatYLabel: (y) => shortNumber(Number(y)),
      }}
      fromZero
      verticalLabelRotation={0}
    />
  );
}
