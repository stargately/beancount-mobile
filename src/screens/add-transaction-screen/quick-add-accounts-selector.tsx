import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { List } from "@ant-design/react-native";
import { TextStyled } from "@/common/text-styled";
import { useTheme } from "@/common/theme";
import { useLedgerMeta } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import { LoadingTile } from "@/common/loading-tile";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { ListItemStyled } from "@/screens/add-transaction-screen/components/list-item-styled";
import { analytics } from "@/common/analytics";
import { i18n } from "@/translations";
import { ColorTheme } from "@/types/theme-props";
import { useRouter } from "expo-router";
import { SelectedAssets, SelectedExpenses } from "@/common/globalFnFactory";
import { useSession } from "@/common/hooks/use-session";

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
  onChange: ({
    asset,
    expense,
    currency,
  }: {
    asset: string;
    expense: string;
    currency: string;
  }) => void;
};

const getStyles = (theme: ColorTheme) =>
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

export const QuickAddAccountsSelector = (props: Props) => {
  const router = useRouter();
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const { userId } = useSession();
  const { onChange } = props;
  const [refreshing, setRefreshing] = useState(false);
  const {
    assetsOptionTabs,
    expensesOptionTabs,
    currencies,
    error,
    loading,
    refetch,
  } = useLedgerMeta(userId);
  const [selectedAssets, setSelectedAssets] = useState<string>(
    assetsOptionTabs.length > 0 ? assetsOptionTabs[0].options[0] : "",
  );
  const [selectedExpenses, setSelectedExpenses] = useState<string>(
    expensesOptionTabs.length > 0 ? expensesOptionTabs[0].options[0] : "",
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
        style={styles.container}
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
      <View style={[styles.container, styles.center]}>
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
      style={styles.container}
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
              analytics.track("tap_assets_picker", {
                originalOption: selectedAssets,
              });
              SelectedAssets.setFn((value: string) => {
                setSelectedAssets(value);
              });
              router.push({
                pathname: "/(app)/account-picker",
                params: {
                  type: "assets",
                  selectedItem: selectedAssets,
                },
              });
              // router.navigate("/(app)/account-picker", {
              //   optionTabs: assetsOptionTabs,
              //   selectedItem: selectedAssets,
              //   onSelected: (item: string) => {
              //     setSelectedAssets(item);
              //   },
              // });
            }}
          >
            <Brief>{i18n.t("from").toUpperCase()}</Brief>
            <TextStyled>{selectedAssets}</TextStyled>
          </ListItemStyled>
          <ListItemStyled
            onPress={async () => {
              analytics.track("tap_expenses_picker", {
                originalOption: selectedExpenses,
              });
              SelectedExpenses.setFn((value: string) => {
                setSelectedExpenses(value);
              });
              router.push({
                pathname: "/(app)/account-picker",
                params: {
                  type: "expenses",
                  selectedItem: selectedExpenses,
                },
              });
              // router.navigate("/(app)/account-picker", {
              //   optionTabs: expensesOptionTabs,
              //   selectedItem: selectedExpenses,
              //   onSelected: (item: string) => {
              //     setSelectedExpenses(item);
              //   },
              // });
            }}
          >
            <Brief>{i18n.t("to").toUpperCase()}</Brief>
            <TextStyled>{selectedExpenses}</TextStyled>
          </ListItemStyled>
        </List>
      )}
    </ScrollView>
  );
};
