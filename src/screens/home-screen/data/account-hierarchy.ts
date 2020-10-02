import gql from "graphql-tag";

export const accountHierarchy = gql`
  query AccountHierarchy($userId: String!) {
    accountHierarchy(userId: $userId) {
      data {
        type
        label
        data {
          account
          balance
          balance_children
          children {
            account
            balance
            balance_children
          }
        }
      }
      success
    }
  }
`;
