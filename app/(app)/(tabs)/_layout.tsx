import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";

export default function TabLayout() {
  const theme = useTheme().colorTheme;
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.white,
          borderTopColor: theme.black40,
        },
        lazy: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t("home"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={28}
              color={focused ? theme.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ledger"
        options={{
          title: i18n.t("ledger"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="wallet"
              size={28}
              color={focused ? theme.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: i18n.t("setting"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="settings"
              size={28}
              color={focused ? theme.primary : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
