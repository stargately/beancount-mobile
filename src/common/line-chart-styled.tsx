import React from "react";

import { LineChart } from "react-native-chart-kit";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { theme } from "@/common/theme";

export function LineChartStyled({
  labels,
  numbers,
  currencySymbol,
}: {
  labels: Array<string>;
  numbers: Array<number>;
  currencySymbol: string;
}): JSX.Element {
  return (
    <LineChart
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
      withVerticalLines={false}
      withShadow={false}
      yAxisLabel={currencySymbol}
      yAxisSuffix="k"
      fromZero
      segments={4}
      chartConfig={{
        backgroundColor: theme.white,
        backgroundGradientFrom: theme.white,
        backgroundGradientTo: theme.white,
        decimalPlaces: 2,
        color: () => theme.primary,
        labelColor: () => theme.text01,
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: theme.primary,
          fill: theme.white,
        },
        propsForBackgroundLines: {
          stroke: theme.black10,
          strokeDasharray: "",
          strokeWidth: 1,
        },
      }}
      style={{
        borderRadius: 8,
      }}
      verticalLabelRotation={0}
    />
  );
}
