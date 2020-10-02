import gql from "graphql-tag";

export const getFeatureFlags = gql`
  query FeatureFlags($userId: String!) {
    featureFlags(userId: $userId)
  }
`;
