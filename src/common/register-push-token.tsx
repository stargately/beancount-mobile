// import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
// import gql from "graphql-tag";
// import { apolloClient } from "@/common/apollo-client";

// export const ADD_PUSH_TOKEN = gql`
//   mutation addPushToken($pushToken: String) {
//     addPushToken(token: $pushToken)
//   }
// `;

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
  // const pushToken = await Notifications.getExpoPushTokenAsync();
  // if (pushToken) {
  //   try {
  //     await apolloClient.mutate({
  //       mutation: ADD_PUSH_TOKEN,
  //       variables: {
  //         pushToken
  //       }
  //     });
  //   } catch (error) {
  //     // tslint:disable-next-line
  //     console.log(`add push token fail ${error}`);
  //   }
  // }
  return finalStatus;
};
