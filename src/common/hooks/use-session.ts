import { useSelector } from "react-redux";
import { AppState } from "@/common/store";

export const useSession = () => {
  const authToken = useSelector((state: AppState) => state.base.authToken);
  return authToken;
};
