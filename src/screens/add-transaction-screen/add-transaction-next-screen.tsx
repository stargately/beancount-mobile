import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  AsyncStorage,
} from "react-native";
import { Portal, Toast, List, DatePicker } from "@ant-design/react-native";
import { connect } from "react-redux";
import { NavigationBar } from "@/common/navigation-bar";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { getFormatDate } from "@/common/time-util";
import { useLedgerMeta } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import { useAddEntriesToRemote } from "@/screens/add-transaction-screen/hooks/use-add-entries-to-remote";
import { ListItemStyled } from "@/screens/add-transaction-screen/components/list-item-styled";
import { TextStyled } from "@/common/text-styled";
import { getCurrencySymbol } from "@/common/currency-util";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";

const { Item } = List;
const { Brief } = Item;

type Props = {
  navigation: any;
  userId: string;
  route: any;
};

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
  });

export const AddTransactionNextScreen = connect(
  (state: { base: { userId: string } }) => ({
    userId: state.base.userId,
  })
)(function AddTransactionNextScreenInner(props: Props): JSX.Element {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_add_transaction_next", {});
    }
    init();
  }, []);
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const { assetsOptionTabs, expensesOptionTabs } = useLedgerMeta(props.userId);
  const {
    currentAsset,
    currentExpense,
    currentMoney,
    currentCurrency,
    onRefresh,
  } = props.route.params;
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

      Portal.remove(loadingKey);

      if (!error) {
        Toast.success(i18n.t("saveSuccess"), 2, async () => {
          try {
            await AsyncStorage.setItem("@LastSelectedAssets:key", assets);
            await AsyncStorage.setItem("@LastSelectedExpenses:key", expenses);
          } catch (aserror) {
            console.error(
              `failed to set last selected assets or expenses value: ${aserror}`
            );
          }
          props.navigation.pop();
          if (onRefresh) {
            onRefresh();
          }
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

  return (
    <View style={styles.container}>
      <NavigationBar
        title={i18n.t("addTransaction")}
        showBack
        navigation={props.navigation}
        rightText={i18n.t("done")}
        onRightClick={addEntries}
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
          <ListItemStyled
            onPress={async () => {
              await analytics.track("tap_assets_picker", {
                originalOption: assets,
              });
              props.navigation.navigate("AccountPicker", {
                optionTabs: assetsOptionTabs,
                selectedItem: assets,
                onSelected: (item: string) => {
                  setAssets(item);
                },
              });
            }}
          >
            <Brief>{i18n.t("from").toUpperCase()}</Brief>
            <TextStyled>{assets}</TextStyled>
          </ListItemStyled>
          <ListItemStyled
            onPress={async () => {
              await analytics.track("tap_expenses_picker", {
                originalOption: expenses,
              });
              props.navigation.navigate("AccountPicker", {
                optionTabs: expensesOptionTabs,
                selectedItem: expenses,
                onSelected: (item: string) => {
                  setExpenses(item);
                },
              });
            }}
          >
            <Brief>{i18n.t("to").toUpperCase()}</Brief>
            <TextStyled>{expenses}</TextStyled>
          </ListItemStyled>
          <DatePicker
            value={new Date(date)}
            mode="date"
            defaultDate={new Date()}
            onChange={async (d) => {
              const selectedDate = getFormatDate(new Date(d));
              setDate(selectedDate);
              await analytics.track("tap_date_picker_confirm", {
                selectedDate,
              });
            }}
            format="YYYY-MM-DD"
          >
            <ListItemStyled>
              <Brief>{i18n.t("date").toUpperCase()}</Brief>
              <TextStyled>{date}</TextStyled>
            </ListItemStyled>
          </DatePicker>
          <ListItemStyled
            onPress={() => {
              props.navigation.navigate("PayeeInput", {
                payee,
                onSaved: (txt: string) => {
                  setPayee(txt);
                },
              });
            }}
          >
            <Brief>{i18n.t("payee").toUpperCase()}</Brief>
            <TextStyled>{payee}</TextStyled>
          </ListItemStyled>
          <ListItemStyled
            onPress={() => {
              props.navigation.navigate("NarrationInput", {
                narration,
                onSaved: (txt: string) => {
                  setNarration(txt);
                },
              });
            }}
          >
            <Brief>{i18n.t("narration").toUpperCase()}</Brief>
            <TextStyled>{narration}</TextStyled>
          </ListItemStyled>
        </List>
      </ScrollView>
    </View>
  );
});
