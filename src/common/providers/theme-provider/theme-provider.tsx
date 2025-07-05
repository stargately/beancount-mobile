import React from "react";
import {
  themes,
  ThemeProvider as CallStackThemeProvider,
} from "@/common/theme";
import { themeVar } from "@/common/vars";
import { useReactiveVar } from "@apollo/client";

export const ThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const currentTheme = useReactiveVar(themeVar);
  return (
    <CallStackThemeProvider theme={themes[currentTheme]}>
      {children}
    </CallStackThemeProvider>
  );
};
