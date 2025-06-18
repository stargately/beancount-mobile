import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";

import fetch from "isomorphic-unfetch";
import { getEndpoint } from "@/common/request";
import { sessionVar } from "@/common/vars";
import { onErrorLink } from "@/common/apollo/error-handling";
import { cache } from "@/common/apollo/cache";

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = sessionVar()?.authToken;
  if (token) {
    operation.setContext({
      headers: { authorization: `Bearer ${token}` },
    });
  }
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
  ]),
);

export const apolloClient = new ApolloClient({
  link,
  cache,
});
