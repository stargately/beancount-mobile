import React from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/common/apollo/client";
import { SplashProvider } from "./splash-provider/splash-provider";
import { AntdThemeProvider } from "./antd-provider/antd-provider";
import { VariablesProvider } from "./vars-provider/vars-provider";

export function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <SplashProvider>
      <VariablesProvider>
        <AntdThemeProvider>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </AntdThemeProvider>
      </VariablesProvider>
    </SplashProvider>
  );
}
