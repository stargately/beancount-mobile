import { NarrationInputScreen } from "@/screens/add-transaction-screen/narration-input-screen";
import { Stack } from "expo-router";
import React from "react";

export default function Invite() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <NarrationInputScreen />
    </>
  );
}
