import gql from "graphql-tag";

export const UpdateReportSubscribe = gql`
  mutation updateReportSubscribe($userId: String!, $status: ReportStatus!) {
    updateReportSubscribe(userId: $userId, status: $status) {
      success
    }
  }
`;
