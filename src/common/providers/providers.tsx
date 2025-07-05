import React from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/common/apollo/client";
import { SplashProvider } from "./splash-provider/splash-provider";
import { ThemeProvider } from "./theme-provider/theme-provider";
import { VariablesProvider } from "./vars-provider/vars-provider";
import { ToastProvider } from "./toast-provider";

export function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <SplashProvider>
      <VariablesProvider>
        <ToastProvider>
          <ThemeProvider>
            <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
          </ThemeProvider>
        </ToastProvider>
      </VariablesProvider>
    </SplashProvider>
  );
}
