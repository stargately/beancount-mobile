import gql from "graphql-tag";

export const userProfile = gql`
  query UserProfile($userId: String!) {
    userProfile(userId: $userId) {
      email
      emailReportStatus
    }
  }
`;
