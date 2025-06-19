import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { List, Tabs } from "@ant-design/react-native";
import { useTheme } from "@/common/theme";
import { analytics } from "@/common/analytics";
import {
  OptionTab,
  useLedgerMeta,
} from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import { ColorTheme } from "@/types/theme-props";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SelectedAssets, SelectedExpenses } from "@/common/globalFnFactory";
import { useSession } from "@/common/hooks/use-session";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
  });

export function AccountPickerScreen(): JSX.Element {
  const router = useRouter();
  const { userId } = useSession();

  useEffect(() => {
    async function init() {
      await analytics.track("page_view_account_picker", {});
    }
    init();
  }, []);
  const { type } = useLocalSearchParams<{ type: string }>();
  const { assetsOptionTabs, expensesOptionTabs } = useLedgerMeta(userId ?? "");

  const onSelected =
    type === "assets" ? SelectedAssets.getFn() : SelectedExpenses.getFn();

  const optionTabs: OptionTab[] =
    type === "assets" ? assetsOptionTabs : expensesOptionTabs;

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
                    onSelected?.(op);
                    router.back();
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
