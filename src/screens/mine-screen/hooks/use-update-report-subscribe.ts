import { useMutation } from "@apollo/client";
import {
  updateReportSubscribe,
  updateReportSubscribeVariables,
} from "@/screens/mine-screen/data/__generated__/updateReportSubscribe";
import { UpdateReportSubscribe } from "@/screens/mine-screen/data/mutation";

export const useUpdateReportSubscribeToRemote = () => {
  const [mutate, { error, data }] = useMutation<
    updateReportSubscribe,
    updateReportSubscribeVariables
  >(UpdateReportSubscribe);

  return { error, mutate, data };
};
