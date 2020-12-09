/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { List } from "@ant-design/react-native";
import { NavigationScreenProp } from "react-navigation";
import { TextStyled } from "@/common/text-styled";
import { theme } from "@/common/theme";
import { useLedgerMeta } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import { LoadingTile } from "@/common/loading-tile";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { ListItemStyled } from "@/screens/add-transaction-screen/components/list-item-styled";
import { analytics } from "@/common/analytics";
import { i18n } from "@/translations";

const { Item } = List;
const { Brief } = Item;

const LoadingList = () => (
  <List>
    <ListItemStyled>
      <LoadingTile
        style={{ height: 16, width: ScreenWidth - 2 * contentPadding }}
      />
    </ListItemStyled>
    <ListItemStyled>
      <LoadingTile
        style={{ height: 16, width: ScreenWidth - 2 * contentPadding }}
      />
    </ListItemStyled>
  </List>
);

type Props = {
  userId: string;
  onChange: ({
    asset,
    expense,
    currency,
  }: {
    asset: string;
    expense: string;
    currency: string;
  }) => void;
  navigation: NavigationScreenProp<string>;
};

const styles = () =>
  StyleSheet.create({
    container: {
      minHeight: 80,
      backgroundColor: theme.white,
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

export const QuickAddAccountsSelector = connect(
  (state: { base: { userId: string } }) => ({
    userId: state.base.userId,
  })
)(function AssetsExpensesSelectorInner(props: Props): JSX.Element {
  const { userId, onChange, navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const {
    //assets,
    //expenses,
    assetsOptionTabs,
    expensesOptionTabs,
    currencies,
    error,
    loading,
    refetch,
  } = useLedgerMeta(userId);
  const [selectedAssets, setSelectedAssets] = useState(
    assetsOptionTabs.length > 0 ? assetsOptionTabs[0].options[0] : ""
  );
  const [selectedExpenses, setSelectedExpenses] = useState(
    expensesOptionTabs.length > 0 ? expensesOptionTabs[0].options[0] : ""
  );

  useEffect(() => {
    const currency = currencies.length > 0 ? currencies[0] : "";
    if (onChange) {
      onChange({ asset: selectedAssets, expense: selectedExpenses, currency });
    }
  });

  const isLoading = loading || refreshing;

  if (loading) {
    return (
      <ScrollView
        style={styles().container}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={async () => {
              try {
                setRefreshing(true);
                await refetch();
              } finally {
                setRefreshing(false);
              }
            }}
          />
        }
      >
        <LoadingList />
      </ScrollView>
    );
  }
  if (error) {
    return (
      <View style={[styles().container, styles().center]}>
        <Text
          onPress={async () => {
            await refetch();
          }}
        >
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles().container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={async () => {
            try {
              setRefreshing(true);
              await refetch();
            } finally {
              setRefreshing(false);
            }
          }}
        />
      }
    >
      {isLoading ? (
        <LoadingList />
      ) : (
        <List>
          <ListItemStyled
            onPress={async () => {
              await analytics.track("tap_assets_picker", {
                originalOption: selectedAssets,
              });
              navigation.navigate("AccountPicker", {
                optionTabs: assetsOptionTabs,
                selectedItem: selectedAssets,
                onSelected: (item: string) => {
                  setSelectedAssets(item);
                },
              });
            }}
          >
            <Brief>{i18n.t("from").toUpperCase()}</Brief>
            <TextStyled>{selectedAssets}</TextStyled>
          </ListItemStyled>
          <ListItemStyled
            onPress={async () => {
              await analytics.track("tap_expenses_picker", {
                originalOption: selectedAssets,
              });
              navigation.navigate("AccountPicker", {
                optionTabs: expensesOptionTabs,
                selectedItem: selectedExpenses,
                onSelected: (item: string) => {
                  setSelectedExpenses(item);
                },
              });
            }}
          >
            <Brief>{i18n.t("to").toUpperCase()}</Brief>
            <TextStyled>{selectedExpenses}</TextStyled>
          </ListItemStyled>
        </List>
      )}
    </ScrollView>
  );
});
