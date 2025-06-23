import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import zhCN from "@ant-design/react-native/lib/locale-provider/zh_CN";
import { themes, ThemeProvider } from "@/common/theme";
import { localeVar, themeVar } from "@/common/vars";
import { useReactiveVar } from "@apollo/client";

export const AntdThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const currentTheme = useReactiveVar(themeVar);
  const locale = useReactiveVar(localeVar);
  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <AntdProvider
        theme={themes[currentTheme].antdTheme}
        locale={String(locale).startsWith("zh") ? zhCN : enUS}
      >
        {children}
      </AntdProvider>
    </ThemeProvider>
  );
};
