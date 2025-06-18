import { useAddPushTokenMutation } from "@/generated-graphql/graphql";

export const useAddPushTokenToRemote = () => {
  const [mutate, { error, data }] = useAddPushTokenMutation();

  return { error, mutate, data };
};
