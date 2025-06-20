import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/haptic-tab";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { localeVar } from "@/common/vars";
import { useReactiveVar } from "@apollo/client";

export default function TabLayout() {
  const theme = useTheme().colorTheme;
  const locale = useReactiveVar(localeVar);
  const [tabTitles, setTabTitles] = useState({
    home: i18n.t("home"),
    ledger: i18n.t("ledger"),
    setting: i18n.t("setting"),
  });

  useEffect(() => {
    setTabTitles({
      home: i18n.t("home"),
      ledger: i18n.t("ledger"),
      setting: i18n.t("setting"),
    });
  }, [locale]);

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
          title: tabTitles.home,
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
          title: tabTitles.ledger,
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
          title: tabTitles.setting,
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
