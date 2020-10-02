import * as React from "react";
import { BottomTabBar } from "react-navigation";
import { ThemeProps } from "@/types/theme-props";
import { theme } from "@/common/theme";

type Props = {
  currentTheme: ThemeProps;
};

export function ThemedBottomTabBar(props: Props): JSX.Element {
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
