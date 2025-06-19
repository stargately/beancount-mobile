import React from "react";
import { LineChart } from "@yuyongmao/react-native-chart-kit";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { shortNumber } from "@/common/number-utils";

export function LineChartStyled({
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
      fromZero
      segments={4}
      chartConfig={{
        backgroundColor: theme.white,
        backgroundGradientFrom: theme.white,
        backgroundGradientTo: theme.white,
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
      formatXLabel={(x) => i18n.t(x)}
      formatYLabel={(y) => shortNumber(Number(y))}
      style={{
        borderRadius: 8,
      }}
      horizontalOffset={16}
      verticalLabelRotation={0}
      horizontalLabelRotation={0}
    />
  );
}
