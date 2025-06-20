/* tslint:disable:no-any */
import { List, Picker, Toast, Portal, Switch } from "@ant-design/react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useIsFocused } from "@react-navigation/native";
import { analytics } from "@/common/analytics";
import { ListHeader } from "@/common/list-header";
import { useTheme } from "@/common/theme";
import { i18n, setLocale } from "@/translations";
import { useUserProfile } from "./hooks/use-user-profile";
import { useUpdateReportSubscribeToRemote } from "./hooks/use-update-report-subscribe";
import { useFeatureFlags } from "@/common/hooks/use-feature-flags";
import { AccountHeader } from "./account-header";
import { InviteSection } from "@/screens/referral-screen/components/invite-section";
import { ReportStatus } from "@/generated-graphql/graphql";
import { useSession } from "@/common/hooks/use-session";
import { localeVar, themeVar } from "@/common/vars";
import { useReactiveVar } from "@apollo/client";
import { actionLogout } from "./logout";

const { Item } = List;
const { Brief } = Item;

export const About = () => {
  const { authToken, userId } = useSession();

  const locale = useReactiveVar(localeVar);
  const currentTheme = useReactiveVar(themeVar);

  const theme = useTheme().colorTheme;
  const pickerSource = [
    { value: ReportStatus.Weekly, label: i18n.t("weekly") },
    { value: ReportStatus.Monthly, label: i18n.t("monthly") },
    { value: ReportStatus.Off, label: i18n.t("off") },
  ];

  const [reportAnimateCount, setReportAnimateCount] = useState(0);
  const [subscriptionFlash, setSubscriptionFlash] = useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function init() {
      try {
        const value = await AsyncStorage.getItem("@SubscriptionFlash:key");
        if (value !== null) {
          setSubscriptionFlash(value === "true");
        } else {
          setSubscriptionFlash(false);
        }
        await AsyncStorage.setItem("@SubscriptionFlash:key", "false");
      } catch (error) {
        console.error(`failed to get subscription flash value: ${error}`);
      }
    }
    init();
  }, [isFocused]);

  useEffect(() => {
    if (subscriptionFlash) {
      const interval = setInterval(() => {
        if (reportAnimateCount < 5) {
          setReportAnimateCount(reportAnimateCount + 1);
        }
      }, 300);
      return () => clearInterval(interval);
    }
    setReportAnimateCount(0);
    return undefined;
  }, [subscriptionFlash, reportAnimateCount]);

  const { emailReportStatus } = useUserProfile(userId);
  const [reportStatus, setReportStatue] = useState<string>(
    emailReportStatus ? emailReportStatus.toString() : "",
  );

  useEffect(() => {
    setReportStatue(emailReportStatus ? emailReportStatus.toString() : "");
  }, [emailReportStatus]);

  const { error, mutate } = useUpdateReportSubscribeToRemote();

  const getReportStatusLabel = (status: string) => {
    switch (status) {
      case ReportStatus.Off:
        return i18n.t("off");
      case ReportStatus.Weekly:
        return i18n.t("weekly");
      case ReportStatus.Monthly:
        return i18n.t("monthly");
      default:
        return i18n.t("off");
    }
  };

  const getReportStatusEnum = (status: string) => {
    switch (status) {
      case ReportStatus.Off:
        return ReportStatus.Off;
      case ReportStatus.Weekly:
        return ReportStatus.Weekly;
      case ReportStatus.Monthly:
        return ReportStatus.Monthly;
      default:
        return ReportStatus.Off;
    }
  };

  const { spendingReportSubscription } = useFeatureFlags(userId);

  const renderAppSection = () => {
    const backgroundColor = {
      backgroundColor: theme.white,
      color: theme.text01,
    };

    return (
      // @ts-ignore
      <List
        style={backgroundColor}
        renderHeader={<ListHeader>{i18n.t("about")}</ListHeader>}
      >
        <Item
          // disabled
          extra={Platform.OS === "ios" ? "Apple Store" : "Google Play"}
          arrow="horizontal"
          style={backgroundColor}
          onPress={async () => {
            const storeUrl =
              Platform.OS === "ios"
                ? "https://apps.apple.com/us/app/id1527950512"
                : "https://play.google.com/store/apps/details?id=io.beancount.android";
            if (storeUrl) {
              await WebBrowser.openBrowserAsync(storeUrl);
              await analytics.track("tap_review_app", { storeUrl });
            }
          }}
        >
          {i18n.t("reviewApp")}
        </Item>

        {spendingReportSubscription && (
          <Picker
            data={pickerSource}
            cols={1}
            extra={getReportStatusLabel(reportStatus)}
            onChange={async (value) => {
              const newValue = value ? String(value[0]) : "";
              if (newValue === reportStatus) {
                return;
              }
              setReportStatue(newValue);
              const loadingKey = Toast.loading(i18n.t("updating"));
              await mutate({
                variables: { userId, status: getReportStatusEnum(newValue) },
              });
              Portal.remove(loadingKey);
              if (!error) {
                Toast.success(i18n.t("updateSuccess"));
              } else {
                console.error("failed to update report status", error);
                Toast.fail(i18n.t("updateFailed"));
              }
            }}
          >
            <Item
              style={[
                backgroundColor,
                {
                  backgroundColor:
                    reportAnimateCount % 2 === 1 ? theme.warning : theme.white,
                },
              ]}
              arrow="horizontal"
            >
              {i18n.t("subscribe")}
            </Item>
          </Picker>
        )}

        <Item
          // disabled
          style={backgroundColor}
          extra={
            <Switch
              checked={String(locale).startsWith("en")}
              onChange={async (value) => {
                const changeTo = value ? "en" : "zh";
                localeVar(changeTo);
                i18n.locale = changeTo;
                setLocale(changeTo);
                await analytics.track("tap_switch_language", { changeTo });
              }}
            />
          }
        >
          {i18n.t("currentLanguage")}
          <Brief>
            {String(locale).startsWith("en")
              ? i18n.t("english")
              : i18n.t("chinese")}
          </Brief>
        </Item>

        <Item
          style={backgroundColor}
          // disabled
          extra={
            <Switch
              checked={currentTheme === "dark"}
              onChange={async (value) => {
                const mode = value ? "dark" : "light";
                themeVar(mode);
                await analytics.track("tap_switch_theme", { mode });
              }}
            />
          }
        >
          {i18n.t("theme")}
          <Brief>{currentTheme === "dark" ? "Dark" : "Light"}</Brief>
        </Item>
        <Item
          style={backgroundColor}
          disabled
          extra={Constants.nativeAppVersion}
        >
          {i18n.t("currentVersion")}
        </Item>
        {authToken ? (
          <Item
            style={backgroundColor}
            // disabled
            onPress={() => {
              Alert.alert(
                "",
                i18n.t("logoutAlertMsg"),
                [
                  { text: i18n.t("logoutAlertCancel"), style: "cancel" },
                  {
                    text: i18n.t("logoutAlertConfirm"),
                    onPress: () => {
                      actionLogout(authToken);
                    },
                  },
                ],
                { cancelable: false },
              );
            }}
          >
            {i18n.t("logout")}
          </Item>
        ) : (
          <View />
        )}
      </List>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: theme.white }}>
      <AccountHeader />
      <InviteSection />
      {renderAppSection()}
    </ScrollView>
  );
};
