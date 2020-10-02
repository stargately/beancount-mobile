import gql from "graphql-tag";

export const addEntriesToRemote = gql`
  mutation addEntries($entriesInput: [EntryInput!]!) {
    addEntries(entriesInput: $entriesInput) {
      data
      success
    }
  }
`;
