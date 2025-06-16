import * as React from "react";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { useTheme } from "@/common/theme";

export function ThemedBottomTabBar(props: BottomTabBarProps): JSX.Element {
  const theme = useTheme().colorTheme;
  return (
    // @ts-ignore
    <BottomTabBar
      {...props}
      // activeTintColor={theme.activeTintColor}
      // inactiveTintColor={theme.inactiveTintColor}
      style={{
        backgroundColor: theme.activeBackgroundColor,
      }}
    />
  );
}
