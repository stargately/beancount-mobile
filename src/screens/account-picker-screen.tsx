import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { List, Tabs } from "@ant-design/react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { OptionTab } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";

type Props = {
  navigation: NavigationScreenProp<string>;
};

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
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
  const tabs = optionTabs.map((opt) => {
    return { title: opt.title };
  });

  const renderOptionTabs = optionTabs.map((val, index) => {
    return (
      <SafeAreaView style={{ flex: 1 }} key={index}>
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
                      fontSize: 18,
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
  });

  return (
    <View style={styles().container}>
      <NavigationBar
        title={i18n.t("accountPicker")}
        showBack
        navigation={navigation}
      />
      <View style={styles().container}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarPosition="top"
          tabBarBackgroundColor={theme.white}
          tabBarInactiveTextColor={theme.black}
          tabBarActiveTextColor={theme.primary}
          tabBarTextStyle={{ fontSize: 18 }}
        >
          {renderOptionTabs}
        </Tabs>
      </View>
    </View>
  );
}
