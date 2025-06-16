import { useSelector } from "react-redux";
import { AppState } from "@/common/store";

export const useSession = () => {
  const authToken = useSelector((state: AppState) => state.base.authToken);
  console.log("Current auth token:", authToken);
  return authToken;
};
