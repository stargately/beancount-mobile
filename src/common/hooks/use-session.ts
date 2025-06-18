import { useReactiveVar } from "@apollo/client";
import { session } from "@/common/vars";

export const useSession = () => {
  const authToken = useReactiveVar(session);
  return authToken;
};
