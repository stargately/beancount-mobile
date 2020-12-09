import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { List } from "@ant-design/react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenWidth } from "@/common/screen-util";
import { analytics } from "@/common/analytics";
import { OptionTab } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";

interface Route {
  key: string;
  title: string;
}

type NaviRouteState = NavigationState<Route>;

type Props = {
  navigation: NavigationScreenProp<string>;
};

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    tabbar: {
      backgroundColor: theme.primary,
    },
    tab: {
      width: 120,
    },
    indicator: {
      backgroundColor: theme.warning,
    },
    label: {
      fontSize: 16,
      fontWeight: "400",
    },
  });

export function AccountPickerScreen(pickerProps: Props): JSX.Element {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_account_picker", {});
    }
    init();
  }, []);

  const { navigation } = pickerProps;
  const onSelected: (item: string) => void = navigation.getParam("onSelected");
  const optionTabs: Array<OptionTab> = navigation.getParam("optionTabs");
  const [index, setIndex] = useState(0);
  const routes: Array<Route> = optionTabs.map((opt) => {
    return { key: opt.title, title: opt.title };
  });
  const scene: any = {};
  optionTabs.forEach((val) => {
    const OptionsTab = () => (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <List>
            {val.options.map((op, idx) => {
              return (
                <List.Item
                  key={idx}
                  arrow="horizontal"
                  style={{
                    backgroundColor: theme.white,
                  }}
                  onPress={async () => {
                    await analytics.track("tap_account_picker_confirm", {
                      selectedAccount: op,
                    });
                    onSelected(op);
                    navigation.pop();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: theme.black,
                    }}
                  >
                    {op}
                  </Text>
                </List.Item>
              );
            })}
          </List>
        </ScrollView>
      </SafeAreaView>
    );
    scene[val.title] = OptionsTab;
  });

  const renderScene = SceneMap(scene);
  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NaviRouteState }
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles().indicator}
      style={styles().tabbar}
      tabStyle={styles().tab}
      labelStyle={styles().label}
    />
  );

  return (
    <View style={styles().container}>
      <NavigationBar
        title={i18n.t("accountPicker")}
        showBack
        navigation={navigation}
      />
      <View style={styles().container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}
