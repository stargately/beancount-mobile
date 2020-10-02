import Constants from "expo-constants";

export const headers: { [key: string]: string | null } = {
  "x-app-id": "mobile-beancount",
  "x-app-version": Constants.nativeAppVersion,
};
