import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from "react-native";
import { Portal, Toast } from "@ant-design/react-native";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { getFormatDate } from "@/common/time-util";
import { useAddEntriesToRemote } from "@/screens/add-transaction-screen/hooks/use-add-entries-to-remote";
import { getCurrencySymbol } from "@/common/currency-util";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListItem, List } from "@/screens/add-transaction-screen/list-item";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  SelectedAssets,
  SelectedExpenses,
  SelectedNarration,
  SelectedPayee,
  AddTransactionCallback,
} from "@/common/globalFnFactory";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    topContainer: {
      height: 260,
      justifyContent: "center",
      alignItems: "center",
    },
    txtMoney: {
      fontSize: 60,
      color: theme.black,
    },
    txtSmallMoney: {
      fontSize: 25,
      color: theme.black,
      fontWeight: "bold",
      marginTop: Platform.OS === "ios" ? 10 : 15,
      letterSpacing: 1,
      marginLeft: 1,
    },
    moneyContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    payee: {
      fontSize: 25,
      color: theme.black,
    },
    date: {
      fontSize: 25,
      color: theme.black80,
    },
    doneButton: {
      fontWeight: "bold",
      color: theme.primary,
      fontSize: 16,
    },
  });

export const AddTransactionNextScreen = () => {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_add_transaction_next", {});
    }
    init();
  }, []);
  const theme = useTheme().colorTheme;
  const { currentMoney, currentAsset, currentExpense, currentCurrency } =
    useLocalSearchParams<{
      currentMoney: string;
      currentAsset: string;
      currentExpense: string;
      currentCurrency: string;
    }>();
  const styles = getStyles(theme);
  const router = useRouter();
  const [assets, setAssets] = useState<string>(currentAsset);
  const [expenses, setExpenses] = useState<string>(currentExpense);
  const [payee, setPayee] = useState<string>("");
  const [date, setDate] = useState<string>(getFormatDate(new Date()));
  const [narration, setNarration] = useState<string>("");
  const { mutate, error } = useAddEntriesToRemote();

  const currencySymbol = getCurrencySymbol(currentCurrency);

  const addEntries = async () => {
    await analytics.track("tap_add_transaction_done", {});
    try {
      const loadingKey = Toast.loading(i18n.t("saving"));
      const params = [
        {
          date,
          flag: "*",
          narration,
          payee,
          type: "Transaction",
          meta: {},
          postings: [
            {
              amount: `-${currentMoney} ${currentCurrency}`,
              account: assets,
            },
            {
              amount: `${currentMoney} ${currentCurrency}`,
              account: expenses,
            },
          ],
        },
      ];

      await mutate({ variables: { entriesInput: params } });
      // await new Promise(resolve => setTimeout(resolve, 1000));

      Portal.remove(loadingKey);

      if (!error) {
        Toast.success(i18n.t("saveSuccess"), 2, async () => {
          const callback = AddTransactionCallback.getFn();
          if (callback) {
            await callback();
            AddTransactionCallback.deleteFn();
          }
          router.back();
        });
      } else {
        console.error("failed to add transaction", error);
        Toast.fail(i18n.t("saveFailed"));
      }
    } catch (e) {
      Toast.fail(i18n.t("saveFailed"));
      // tslint:disable-next-line
      console.error(`failed to create target profile: ${e}`);
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(getFormatDate(date));
    hideDatePicker();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: i18n.t("addTransaction"),
          headerRight: () => (
            <Pressable onPress={addEntries} hitSlop={10}>
              <Text style={styles.doneButton}>Done</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.moneyContainer}>
            <Text style={styles.txtMoney}>
              {`${currencySymbol}${currentMoney.split(".")[0]}`}
            </Text>
            <Text style={styles.txtSmallMoney}>
              {`${currentMoney.split(".")[1]}`}
            </Text>
          </View>
          <Text style={styles.payee}>{payee}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <List>
          <ListItem
            title={i18n.t("from").toUpperCase()}
            content={assets}
            onPress={async () => {
              await analytics.track("tap_assets_picker", {
                originalOption: assets,
              });
              SelectedAssets.setFn((value: string) => {
                setAssets(value);
              });
              router.push({
                pathname: "/(app)/account-picker",
                params: {
                  type: "assets",
                  selectedItem: assets,
                },
              });
            }}
          />
          <ListItem
            title={i18n.t("to").toUpperCase()}
            content={expenses}
            onPress={async () => {
              analytics.track("tap_expenses_picker", {
                originalOption: expenses,
              });
              SelectedExpenses.setFn((value: string) => {
                setExpenses(value);
              });
              router.push({
                pathname: "/(app)/account-picker",
                params: {
                  type: "expenses",
                  selectedItem: expenses,
                },
              });
            }}
          />
          <ListItem
            title={i18n.t("date").toUpperCase()}
            content={date}
            onPress={showDatePicker}
          />
          <ListItem
            title={i18n.t("payee").toUpperCase()}
            content={payee}
            onPress={() => {
              SelectedPayee.setFn((value: string) => {
                setPayee(value);
              });
              router.navigate({
                pathname: "/(app)/payee-input",
                params: {
                  payee,
                },
              });
            }}
          />
          <ListItem
            title={i18n.t("narration").toUpperCase()}
            content={narration}
            onPress={() => {
              SelectedNarration.setFn((value: string) => {
                setNarration(value);
              });
              router.navigate({
                pathname: "/(app)/narration-input",
                params: {
                  narration,
                },
              });
            }}
          />
        </List>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date(date)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
