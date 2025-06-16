import * as Notifications from "expo-notifications";
import { useAddPushTokenToRemote } from "@/common/push-token/use-push-token-to-remote";
import { useCallback } from "react";

export const useRegisterPushToken = () => {
  const { mutate, error } = useAddPushTokenToRemote();
  const registerForPushNotificationAsync = useCallback(async () => {
    const settings = await Notifications.requestPermissionsAsync();
    const granted =
      settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;
    if (!granted) {
      return;
    }
    const pushToken: Notifications.ExpoPushToken =
      await Notifications.getExpoPushTokenAsync();

    if (pushToken) {
      try {
        await mutate({ variables: { pushToken: pushToken.data } });
        if (error) {
          // tslint:disable-next-line
          console.log(`add push token fail ${error}`);
        }
      } catch (e) {
        // tslint:disable-next-line
        console.log(`add push token fail ${e}`);
      }
    }
  }, [mutate, error]);
  return registerForPushNotificationAsync;
};
