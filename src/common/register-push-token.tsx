import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useAddPushTokenToRemote } from "@/common/push-token/use-push-token-to-remote";

export const registerForPushNotificationAsync = async (): Promise<string> => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return finalStatus;
  }
  const pushToken: Notifications.ExpoPushToken = await Notifications.getExpoPushTokenAsync();

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
  return finalStatus;
};
