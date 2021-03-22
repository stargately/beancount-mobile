import { useMutation } from "@apollo/client";
import {
  addPushToken,
  addPushTokenVariables,
} from "@/common/push-token/data/__generated__/addPushToken";
import { addPushTokenToRemote } from "@/common/push-token/data/mutations";

export const useAddPushTokenToRemote = () => {
  const [mutate, { error, data }] = useMutation<
    addPushToken,
    addPushTokenVariables
  >(addPushTokenToRemote);

  return { error, mutate, data };
};
