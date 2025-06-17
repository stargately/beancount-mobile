import { PayeeInputScreen } from "@/screens/add-transaction-screen/payee-input-screen";
import { Stack } from "expo-router";
import React from "react";

export default function PayeeInput() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PayeeInputScreen />
    </>
  );
}
