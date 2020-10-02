import * as Haptics from "expo-haptics";
import * as React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenProp,
} from "react-navigation";
import { ThemedBottomTabBar } from "@/common/themed-bottom-tab-bar";

import { TFuncType } from "@/types/screen-props";

import { HomeScreen } from "@/screens/home-screen";
import { LedgerScreen } from "@/screens/ledger-screen";
import { MineScreen } from "@/screens/mine-screen/mine-screen";
import { TabBarIcon } from "@/common/tab-bar-icon";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    headerMode: "none",
  }
);

HomeStack.navigationOptions = ({
  screenProps: { t },
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("home"),
  tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
    const name = Platform.OS === "ios" ? "ios-home" : "md-home";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation,
  }: {
    navigation: NavigationScreenProp<unknown>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Home");
  },
});

const LEDGER_ROUTE = "ledger";

const LedgerStack = createStackNavigator(
  {
    [LEDGER_ROUTE]: LedgerScreen,
  },
  {
    headerMode: "none",
  }
);

LedgerStack.navigationOptions = ({
  screenProps: { t },
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t(LEDGER_ROUTE),
  tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
    const name = Platform.OS === "ios" ? "ios-journal" : "md-journal";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation,
  }: {
    navigation: NavigationScreenProp<unknown>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate(LEDGER_ROUTE);
  },
});

const MineStack = createStackNavigator(
  {
    Mine: MineScreen,
  },
  {
    headerMode: "none",
  }
);

MineStack.navigationOptions = ({
  screenProps: { t },
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("mine"),
  tabBarIcon: function TabBarIconWrapper({ focused }: { focused: boolean }) {
    const name = Platform.OS === "ios" ? "ios-contact" : "md-contact";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation,
  }: {
    navigation: NavigationScreenProp<unknown>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Mine", { fromAnnouncement: false });
  },
});

export const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LedgerStack,
    MineStack,
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarComponent: function tabBarComponent(props) {
      return <ThemedBottomTabBar {...props} />;
    },
  }
);
