import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { connect, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import zhCN from "@ant-design/react-native/lib/locale-provider/zh_CN";
import { apolloClient } from "@/common/apollo-client";
import { persistor, store } from "@/common/store";
import { themes, ThemeProvider } from "@/common/theme";

export function Providers({
  children,
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    <Provider store={store}>
      <AntdThemeProviderContainer>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </PersistGate>
      </AntdThemeProviderContainer>
    </Provider>
  );
}

const AntdThemeProviderContainer = connect(
  (state: { base: { currentTheme: string; locale: string } }) => {
    return {
      currentTheme: state.base.currentTheme,
      locale: state.base.locale,
    };
  }
)(function ({
  currentTheme,
  locale,
  children,
}: {
  currentTheme: "dark" | "light";
  locale: string;
  children: JSX.Element | Array<JSX.Element>;
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
