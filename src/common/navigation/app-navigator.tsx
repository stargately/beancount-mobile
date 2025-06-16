import * as React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation-param";
import { useTheme } from "@/common/theme";

import { MainTabNavigator } from "@/common/navigation/main-tab-navigator";
import { AddTransactionScreen } from "@/screens/add-transaction-screen";
import { AddTransactionNextScreen } from "@/screens/add-transaction-screen/add-transaction-next-screen";
import { PayeeInputScreen } from "@/screens/add-transaction-screen/payee-input-screen";
import { NarrationInputScreen } from "@/screens/add-transaction-screen/narration-input-screen";
import { AccountPickerScreen } from "@/screens/account-picker-screen";
import { ReferralScreen } from "@/screens/referral-screen/referral-screen";
import { InviteScreen } from "@/screens/referral-screen/invite-screen";

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={MainTabNavigator} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen
        name="AddTransactionNext"
        component={AddTransactionNextScreen}
      />
      <Stack.Screen name="AccountPicker" component={AccountPickerScreen} />
      <Stack.Screen name="PayeeInput" component={PayeeInputScreen} />
      <Stack.Screen name="NarrationInput" component={NarrationInputScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="Invite" component={InviteScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  const theme = useTheme();
  const navigationTheme = theme.name === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
