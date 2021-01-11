import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { List, Tabs } from "@ant-design/react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { OptionTab } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import { ColorTheme } from "@/types/theme-props";

type Props = {
  navigation: any;
  route: any;
};

const getStyles = (theme: ColorTheme) =>
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

  const { navigation, route } = pickerProps;

  const {
    onSelected,
    optionTabs,
  }: {
    onSelected: (item: string) => void;
    optionTabs: Array<OptionTab>;
  } = route.params;

  const tabs = optionTabs.map((opt) => {
    return { title: opt.title };
  });
  const theme = useTheme().colorTheme;

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

  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <NavigationBar
        title={i18n.t("accountPicker")}
        showBack
        navigation={navigation}
      />
      <View style={styles.container}>
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
