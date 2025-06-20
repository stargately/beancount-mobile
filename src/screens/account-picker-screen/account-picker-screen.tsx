import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Tabs } from "@ant-design/react-native";
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
import { Ionicons } from "@expo/vector-icons";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    listItem: {
      backgroundColor: theme.white,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.black20,
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
  const styles = getStyles(theme);

  const renderOptionTabs = optionTabs.map((val, index) => {
    return (
      <ScrollView
        key={index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
      >
        {val.options.map((op, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={styles.listItem}
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
              <Ionicons name="chevron-forward" size={24} color={theme.black} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  });

  return (
    <View style={styles.container}>
      <Tabs
        tabs={tabs}
        initialPage={0}
        tabBarPosition="top"
        tabBarBackgroundColor={theme.white}
        tabBarInactiveTextColor={theme.black}
        tabBarActiveTextColor={theme.primary}
        tabBarTextStyle={{ fontSize: 18 }}
        renderUnderline={() => null}
      >
        {renderOptionTabs}
      </Tabs>
    </View>
  );
}
