import * as React from "react";
import {
  BottomTabBar,
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import { useTheme } from "@/common/theme";

export function ThemedBottomTabBar(
  props: BottomTabBarProps<BottomTabBarOptions>
): JSX.Element {
  const theme = useTheme().colorTheme;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <BottomTabBar
      {...props}
      activeTintColor={theme.activeTintColor}
      inactiveTintColor={theme.inactiveTintColor}
      style={{
        backgroundColor: theme.activeBackgroundColor,
      }}
    />
  );
}
