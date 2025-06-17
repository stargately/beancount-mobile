import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import { useSelector } from "react-redux";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import zhCN from "@ant-design/react-native/lib/locale-provider/zh_CN";
import { type AppState } from "@/common/store";
import { themes, ThemeProvider } from "@/common/theme";

export const AntdThemeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const currentTheme = useSelector(
    (state: AppState) => state.base.currentTheme ?? "light",
  );
  const locale = useSelector((state: AppState) => state.base.locale ?? "en");
  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <AntdProvider
        theme={themes[currentTheme].antdTheme}
        locale={String(locale).startsWith("en") ? enUS : zhCN}
      >
        {children}
      </AntdProvider>
    </ThemeProvider>
  );
};
