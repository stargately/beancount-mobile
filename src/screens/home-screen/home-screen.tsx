import Button from "@ant-design/react-native/lib/button";
import * as React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { useLedgerMeta } from "@/screens/add-transaction-screen/hooks/use-ledger-meta";
import { useHomeCharts } from "@/screens/home-screen/hooks/use-home-charts";
import { useAccountHierarchy } from "@/screens/home-screen/hooks/use-account-hierarchy";
import { HeaderText, SmallHeaderText } from "@/common/text-styled";
import { BarChartStyled } from "@/common/bar-chart-styled";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { CommonMargin } from "@/common/common-margin";
import { LoadingTile } from "@/common/loading-tile";
import { AccountsStyled } from "@/screens/home-screen/components/accounts-styled";
import { NetAssetsStyled } from "@/screens/home-screen/components/net-assets-styled";
import { LineChartStyled } from "@/common/line-chart-styled";
import { getCurrencySymbol } from "@/common/currency-util";
import { analytics } from "@/common/analytics";
import { Announcement } from "@/common/announcement";
import { EmailIcon } from "@/screens/home-screen/email-icon";
import { useFeatureFlags } from "@/common/feature-flags/use-feature-flags";
import { ColorTheme } from "@/types/theme-props";
import { AppState } from "@/common/store";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTransactionCallback } from "@/common/globalFnFactory";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: statusBarHeight,
      backgroundColor: theme.white,
      // paddingLeft: 16,
      // paddingRight: 16,
    },
    quickAddLabel: {
      color: theme.white,
      fontSize: 20,
    },
  });

export const HomeScreen = (): JSX.Element => {
  const props = useSelector((state: AppState) => {
    return {
      userId: state.base.userId ?? "",
      theme: state.base.currentTheme ?? "light",
      locale: state.base.locale ?? "en",
    };
  });
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_home", {});
    }
    init();
  }, []);
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const router = useRouter();
  const { currencies, refetch: ledgerMetaRefetch } = useLedgerMeta(
    props.userId,
  );

  const currency = currencies.length > 0 ? currencies[0] : "USD";
  const currencySymbol = getCurrencySymbol(currency);
  const {
    netWorth,
    lastSixProfitData,
    lastSixWorthData,
    loading: netWorthLoading,
    refetch: netWorthRefetch,
    error: netWorthError,
  } = useHomeCharts(props.userId, currency);
  const {
    accounts,
    loading: accountsLoading,
    refetch: accountsRefetch,
    error: accountsError,
  } = useAccountHierarchy(props.userId, currency);
  const [refreshing, setRefreshing] = useState(false);
  const isLoading = netWorthLoading || refreshing;
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        ledgerMetaRefetch(),
        netWorthRefetch(),
        accountsRefetch(),
      ]);
    } finally {
      setRefreshing(false);
    }
  };
  const { spendingReportSubscription } = useFeatureFlags(props.userId);
  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16 }}
          indicatorStyle={props.theme === "dark" ? "white" : "default"}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        >
          <CommonMargin />
          <SmallHeaderText>{i18n.t("netAssets")}</SmallHeaderText>
          <View>
            {accountsLoading || refreshing || accountsError ? (
              <LoadingTile
                style={{ height: 40, width: ScreenWidth - 2 * contentPadding }}
              />
            ) : (
              <NetAssetsStyled
                netAssets={`${netWorth.netAssets} ${currency}`}
              />
            )}
          </View>
          <CommonMargin />

          {spendingReportSubscription && (
            <Announcement
              title="Never miss your financial report - set up now"
              subtitle="Weekly or Monthly Report"
              icon={<EmailIcon />}
            />
          )}

          <HeaderText>{i18n.t("accounts")}</HeaderText>
          <CommonMargin />
          <View>
            {netWorthLoading || refreshing || netWorthError ? (
              <LoadingTile
                style={{ height: 139, width: ScreenWidth - 2 * contentPadding }}
              />
            ) : (
              <AccountsStyled
                assets={`${accounts.assets} ${currency}`}
                liabilities={`${accounts.liabilities} ${currency}`}
              />
            )}
          </View>
          <CommonMargin />
          <Button
            type="primary"
            onPress={async () => {
              analytics.track("tap_quick_add", {});
              AddTransactionCallback.setFn(onRefresh);
              router.navigate({
                pathname: "/add-transaction",
              });
            }}
          >
            <Text style={styles.quickAddLabel}>{i18n.t("quickAdd")}</Text>
          </Button>
          <CommonMargin />
          <HeaderText>{i18n.t("monthlyNetIncome")}</HeaderText>
          <CommonMargin />
          <View>
            {isLoading || netWorthError ? (
              <LoadingTile
                style={{ height: 200, width: ScreenWidth - 2 * contentPadding }}
              />
            ) : (
              <BarChartStyled
                currencySymbol={currencySymbol}
                labels={lastSixProfitData.labels}
                numbers={lastSixProfitData.numbers}
              />
            )}
          </View>
          <CommonMargin />
          <HeaderText>{i18n.t("monthlyNetWorth")}</HeaderText>
          <CommonMargin />
          <View>
            {isLoading || netWorthError ? (
              <LoadingTile
                style={{ height: 200, width: ScreenWidth - 2 * contentPadding }}
              />
            ) : (
              <LineChartStyled
                currencySymbol={currencySymbol}
                labels={lastSixWorthData.labels}
                numbers={lastSixWorthData.numbers}
              />
            )}
          </View>
          <CommonMargin />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
