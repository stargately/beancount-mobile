import React from "react";
import { View, ViewStyle } from "react-native";
import { G, Rect, Svg, Text } from "react-native-svg";

import AbstractChart, {
  AbstractChartConfig,
  AbstractChartProps,
} from "@yuyongmao/react-native-chart-kit/dist/AbstractChart";
import { ChartData } from "@yuyongmao/react-native-chart-kit/dist/HelperTypes";

const barWidth = 16;

export interface BarChartProps extends AbstractChartProps {
  data: ChartData;
  width: number;
  height: number;
  fromZero?: boolean;
  withInnerLines?: boolean;
  yAxisLabel: string;
  yAxisSuffix: string;
  chartConfig: AbstractChartConfig;
  style?: Partial<ViewStyle>;
  horizontalLabelRotation?: number;
  verticalLabelRotation?: number;
  /**
   * Show vertical labels - default: True.
   */
  withVerticalLabels?: boolean;
  /**
   * Show horizontal labels - default: True.
   */
  withHorizontalLabels?: boolean;
  /**
   * The number of horizontal lines
   */
  segments?: number;
  showBarTops?: boolean;
  showValuesOnTopOfBars?: boolean;
}

class BarChart extends AbstractChart<BarChartProps, {}> {
  getBarPercentage = () => {
    const { barPercentage = 1 } = this.props.chartConfig;
    return barPercentage;
  };

  renderBars = ({
    data,
    width = 0,
    height = 0,
    paddingTop = 0,
    paddingRight = 0,
    barRadius = 0,
  }: Pick<
    Omit<AbstractChartConfig, "data">,
    "width" | "height" | "paddingRight" | "paddingTop" | "barRadius"
  > & {
    data: number[];
  }) => {
    const baseHeight = this.calcBaseHeight(data, height);

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const bw = barWidth * this.getBarPercentage();
      return (
        <Rect
          key={Math.random()}
          x={paddingRight + (i * (width - paddingRight)) / data.length + bw / 2}
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          rx={barRadius}
          width={bw}
          height={(Math.abs(barHeight) / 4) * 3}
          fill={this.props.chartConfig.color && this.props.chartConfig.color(0)}
        />
      );
    });
  };

  renderBarTops = ({
    data,
    width = 0,
    height = 0,
    paddingTop = 0,
    paddingRight = 0,
  }: Pick<
    Omit<AbstractChartConfig, "data">,
    "width" | "height" | "paddingRight" | "paddingTop"
  > & {
    data: number[];
  }) => {
    const baseHeight = this.calcBaseHeight(data, height);

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const bw = barWidth * this.getBarPercentage();
      return (
        <Rect
          key={Math.random()}
          x={paddingRight + (i * (width - paddingRight)) / data.length + bw / 2}
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={bw}
          height={2}
          fill={
            this.props.chartConfig.color && this.props.chartConfig.color(0.6)
          }
        />
      );
    });
  };

  renderValuesOnTopOfBars = ({
    data,
    width = 0,
    height = 0,
    paddingTop = 0,
    paddingRight = 0,
  }: Pick<
    Omit<AbstractChartConfig, "data">,
    "width" | "height" | "paddingRight" | "paddingTop"
  > & {
    data: number[];
  }) => {
    const baseHeight = this.calcBaseHeight(data, height);

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const bw = barWidth * this.getBarPercentage();
      return (
        <Text
          key={Math.random()}
          x={paddingRight + (i * (width - paddingRight)) / data.length + bw / 1}
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop - 1}
          fill={
            this.props.chartConfig.color && this.props.chartConfig.color(0.6)
          }
          fontSize="12"
          textAnchor="middle"
        >
          {data[i]}
        </Text>
      );
    });
  };

  render() {
    const {
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      verticalLabelRotation = 0,
      horizontalLabelRotation = 0,
      withInnerLines = true,
      showBarTops = true,
      showValuesOnTopOfBars = false,
      segments = 4,
    } = this.props;

    const { borderRadius = 0, paddingTop = 16, paddingRight = 64 } = style;

    const config = {
      width,
      height,
      verticalLabelRotation,
      horizontalLabelRotation,
      barRadius:
        (this.props.chartConfig && this.props.chartConfig.barRadius) || 0,
      decimalPlaces:
        (this.props.chartConfig && this.props.chartConfig.decimalPlaces) || 2,
      formatYLabel:
        (this.props.chartConfig && this.props.chartConfig.formatYLabel) ||
        function (label) {
          return label;
        },
      formatXLabel:
        (this.props.chartConfig && this.props.chartConfig.formatXLabel) ||
        function (label) {
          return label;
        },
    };

    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig,
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius as number}
            ry={borderRadius as number}
            fill="url(#backgroundGradient)"
          />
          <G>
            {withInnerLines
              ? this.renderHorizontalLines({
                  ...config,
                  count: segments,
                  paddingTop,
                  paddingRight,
                })
              : null}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                  ...config,
                  count: segments,
                  data: data.datasets[0].data,
                  paddingTop: paddingTop as number,
                  paddingRight: paddingRight as number,
                })
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                  ...config,
                  labels: data.labels,
                  paddingRight: paddingRight as number,
                  paddingTop: paddingTop as number,
                  horizontalOffset: barWidth * this.getBarPercentage(),
                })
              : null}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop: paddingTop as number,
              paddingRight: paddingRight as number,
            })}
          </G>
          <G>
            {showValuesOnTopOfBars &&
              this.renderValuesOnTopOfBars({
                ...config,
                data: data.datasets[0].data,
                paddingTop: paddingTop as number,
                paddingRight: paddingRight as number,
              })}
          </G>
          <G>
            {showBarTops &&
              this.renderBarTops({
                ...config,
                data: data.datasets[0].data,
                paddingTop: paddingTop as number,
                paddingRight: paddingRight as number,
              })}
          </G>
        </Svg>
      </View>
    );
  }
}

export { BarChart };
