import { useMutation } from "react-apollo";
import {
  addEntriesVariables,
  addEntries,
} from "@/screens/add-transaction-screen/data/__generated__/addEntries";
import { addEntriesToRemote } from "@/screens/add-transaction-screen/data/mutations";

export const useAddEntriesToRemote = () => {
  const [mutate, { error, data }] = useMutation<
    addEntries,
    addEntriesVariables
  >(addEntriesToRemote);

  return { error, mutate, data };
};
