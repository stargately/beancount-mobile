import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { getEndpoint } from "@/common/request";
import { store } from "@/common/store";
import { onErrorLink } from "@/common/apollo-error-handling";

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { authorization: `Bearer ${store.getState().base.authToken}` },
  });
  return forward(operation);
});

// use with apollo-client
const link = middlewareLink.concat(
  ApolloLink.from([
    onErrorLink,
    new HttpLink({
      uri: getEndpoint("api-gateway/"),
      fetch,
    }),
  ])
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
