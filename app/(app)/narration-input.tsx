import { NarrationInputScreen } from "@/screens/add-transaction-screen/narration-input-screen";
import { i18n } from "@/translations";
import { Stack } from "expo-router";
import React from "react";

export default function Invite() {
  return (
    <>
      <Stack.Screen options={{ title: i18n.t("narration") }} />
      <NarrationInputScreen />
    </>
  );
}
