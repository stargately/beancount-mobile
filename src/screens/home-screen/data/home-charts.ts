import gql from "graphql-tag";

export const homeCharts = gql`
  query HomeCharts($userId: String!) {
    homeCharts(userId: $userId) {
      data {
        type
        label
        data {
          date
          balance
          budgets
        }
      }
      success
    }
  }
`;
