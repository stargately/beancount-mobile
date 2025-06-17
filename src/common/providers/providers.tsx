import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { apolloClient } from "@/common/apollo-client";
import { persistor, store } from "@/common/store";
import { SplashProvider } from "./splash-provider/splash-provider";
import { AntdThemeProvider } from "./antd-provider/antd-provider";

export function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <SplashProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AntdThemeProvider>
            <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
          </AntdThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </SplashProvider>
  );
}
