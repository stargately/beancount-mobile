import { useQuery } from "react-apollo";
import { userProfile } from "@/screens/mine-screen/data/query";
import { UserProfile } from "@/screens/mine-screen/data/__generated__/UserProfile";

export const useUserProfile = (userId: string) => {
  const { data, error, loading } = useQuery<UserProfile>(userProfile, {
    variables: { userId },
  });
  return {
    email: data?.userProfile?.email,
    emailReportStatus: data?.userProfile?.emailReportStatus,
    error,
    loading,
  };
};
