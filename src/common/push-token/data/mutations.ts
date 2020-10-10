import gql from "graphql-tag";

export const addPushTokenToRemote = gql`
  mutation addPushToken($pushToken: String) {
    addPushToken(token: $pushToken)
  }
`;
