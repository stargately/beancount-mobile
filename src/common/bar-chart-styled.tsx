import React from "react";
import { BarChart } from "@/common/bar-chart";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";

export function BarChartStyled({
  labels,
  numbers,
  currencySymbol,
}: {
  labels: Array<string>;
  numbers: Array<number>;
  currencySymbol: string;
}): JSX.Element {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        decimalPlaces: 0,
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
      }}
      fromZero
      verticalLabelRotation={0}
    />
  );
}
