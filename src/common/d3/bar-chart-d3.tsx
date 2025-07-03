import React from "react";
import { View } from "react-native";
import Svg, { Rect, Text as SvgText, G, Line } from "react-native-svg";
import { scaleBand, scaleLinear } from "d3-scale";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { shortNumber } from "@/common/number-utils";

export function BarChartD3({
  labels,
  numbers,
  currencySymbol,
}: {
  labels: string[];
  numbers: number[];
  currencySymbol: string;
}): JSX.Element {
  const theme = useTheme().colorTheme;

  // Chart dimensions
  const chartWidth = ScreenWidth - contentPadding * 2;
  const chartHeight = 220;
  const barWidth = (chartWidth / labels.length) * 0.6;
  const axisFontSize = 12;
  const labelFontSize = 13;
  const leftPadding = 50;
  const bottomPadding = 30;
  const topPadding = 20;

  // Scales
  const xScale = scaleBand()
    .domain(labels)
    .range([leftPadding, chartWidth])
    .padding(0.2);

  const maxValue = Math.max(...numbers, 1);

  const yScale = scaleLinear()
    .domain([0, maxValue])
    .range([chartHeight - bottomPadding, topPadding])
    .nice();

  // Y axis ticks
  const yTicks = yScale.ticks(5);

  return (
    <View>
      <Svg
        width={chartWidth}
        height={chartHeight}
        // style={{ backgroundColor: "blue" }}
      >
        {/* Y axis grid lines and labels */}
        {yTicks.map((tick: number, i: number) => (
          <G key={i}>
            <Line
              x1={leftPadding}
              x2={chartWidth}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke={theme.black40}
              strokeDasharray="4,2"
              strokeWidth={1}
            />
            <SvgText
              x={leftPadding - 16}
              y={yScale(tick) + 5}
              fontSize={axisFontSize}
              fill={theme.text01}
              textAnchor="end"
            >
              {`${currencySymbol}${shortNumber(tick)}`}
            </SvgText>
          </G>
        ))}

        {/* Bars */}
        {numbers.map((num, i) => {
          const barHeight = yScale(0) - yScale(num);
          const minHeight = 2; // Minimum height for visibility
          const finalHeight = barHeight === 0 ? minHeight : barHeight;
          const finalY = barHeight === 0 ? yScale(0) - minHeight : yScale(num);

          return (
            <Rect
              key={i}
              x={xScale(labels[i])}
              y={finalY}
              width={barWidth}
              height={finalHeight}
              fill={theme.primary}
              rx={3}
            />
          );
        })}

        {/* X axis labels */}
        {labels.map((label, i) => (
          <SvgText
            key={i}
            x={(xScale(label) ?? 0) + barWidth / 2}
            y={chartHeight - 8}
            fontSize={labelFontSize}
            fill={theme.text01}
            textAnchor="middle"
          >
            {i18n.t(label)}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
