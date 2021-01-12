import * as React from "react";
import { Platform } from "react-native";
import {
  HomeParamList,
  LedgerParamList,
  MineParamList,
  MainTabParamList,
} from "@/types/navigation-param";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemedBottomTabBar } from "@/common/themed-bottom-tab-bar";

import { HomeScreen } from "@/screens/home-screen";
import { LedgerScreen } from "@/screens/ledger-screen";
import { MineScreen } from "@/screens/mine-screen/mine-screen";
import { TabBarIcon } from "@/common/tab-bar-icon";
import { LocalizationContext } from "@/translations";

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const LedgerStack = createStackNavigator<LedgerParamList>();

function LinkNavigator() {
  return (
    <LedgerStack.Navigator screenOptions={{ headerShown: false }}>
      <LedgerStack.Screen name="LedgerScreen" component={LedgerScreen} />
    </LedgerStack.Navigator>
  );
}

const MineStack = createStackNavigator<MineParamList>();

function MineNavigator() {
  return (
    <MineStack.Navigator screenOptions={{ headerShown: false }}>
      <MineStack.Screen name="MineScreen" component={MineScreen} />
    </MineStack.Navigator>
  );
}

const MainTab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const { t } = React.useContext(LocalizationContext);
  return (
    <MainTab.Navigator
      tabBar={(props) => <ThemedBottomTabBar {...props} />}
      initialRouteName="Home"
    >
      <MainTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: t("home"),
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            const name = Platform.OS === "ios" ? "ios-home" : "md-home";
            const tabIcon = <TabBarIcon name={name} focused={focused} />;
            return tabIcon;
          },
        }}
      />
      <MainTab.Screen
        name="Ledger"
        component={LinkNavigator}
        options={{
          tabBarLabel: t("ledger"),
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            const name = Platform.OS === "ios" ? "ios-journal" : "md-journal";
            const tabIcon = <TabBarIcon name={name} focused={focused} />;
            return tabIcon;
          },
        }}
      />
      <MainTab.Screen
        name="Mine"
        component={MineNavigator}
        options={{
          tabBarLabel: t("mine"),
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            const name = Platform.OS === "ios" ? "ios-apps" : "md-apps";
            const tabIcon = <TabBarIcon name={name} focused={focused} />;
            return tabIcon;
          },
        }}
      />
    </MainTab.Navigator>
  );
}
