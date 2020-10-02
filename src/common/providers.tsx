import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { connect, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { apolloClient } from "@/common/apollo-client";
import { persistor, store } from "@/common/store";
import { antdDarkTheme, antdLightTheme } from "@/common/theme";
import enUS from "@ant-design/react-native/lib/locale-provider/en_US";
import zhCN from "@ant-design/react-native/lib/locale-provider/zh_CN";

export function Providers({
  children,
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    <Provider store={store}>
      <AntdProviderContainer>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </PersistGate>
      </AntdProviderContainer>
    </Provider>
  );
}

const AntdProviderContainer = connect(
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
    <AntdProvider
      theme={currentTheme === "dark" ? antdDarkTheme : antdLightTheme}
      locale={String(locale).startsWith("en") ? enUS : zhCN}
    >
      {children}
    </AntdProvider>
  );
});
