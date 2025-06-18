import { useFeatureFlagsQuery } from "@/generated-graphql/graphql";

type FlagMap = {
  spendingReportSubscription?: boolean;
};

export const useFeatureFlags = (userId: string): FlagMap => {
  const { data } = useFeatureFlagsQuery({
    variables: {
      userId,
    },
  });

  return {
    spendingReportSubscription: data?.featureFlags?.spendingReportSubscription,
  };
};
