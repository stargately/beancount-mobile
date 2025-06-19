import { AccountPickerScreen } from "@/screens/account-picker-screen/account-picker-screen";
import { Stack } from "expo-router";
import { i18n } from "@/translations";
import React from "react";

export default function AccountPicker() {
  return (
    <>
      <Stack.Screen options={{ title: i18n.t("accountPicker") }} />
      <AccountPickerScreen />
    </>
  );
}
