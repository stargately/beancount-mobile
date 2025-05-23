import * as Notifications from "expo-notifications";
import { useAddPushTokenToRemote } from "@/common/push-token/use-push-token-to-remote";

export const registerForPushNotificationAsync = async () => {
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
      const { mutate, error } = useAddPushTokenToRemote();
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
};
