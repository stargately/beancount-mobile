import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { connect, Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import zhCN from "@ant-design/react-native/lib/locale-provider/zh_CN";
import { apolloClient } from "@/common/apollo-client";
import { persistor, store } from "@/common/store";
import { themes, ThemeProvider } from "@/common/theme";
import { SplashProvider } from "./splash-provider/splash-provider";
import { LocalizationProvider } from "./localization-provider/localization-provider";
import { AppState } from "@/common/store";

export function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <SplashProvider>
      <LocalizationProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AntdThemeProviderContainer>
              <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
            </AntdThemeProviderContainer>
          </PersistGate>
        </ReduxProvider>
      </LocalizationProvider>
    </SplashProvider>
  );
}

const AntdThemeProviderContainer = connect((state: AppState) => {
  return {
    currentTheme: state.base.currentTheme,
    locale: state.base.locale,
  };
})(function ({
  currentTheme,
  locale,
  children,
}: {
  currentTheme: "dark" | "light";
  locale: string;
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
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
});
