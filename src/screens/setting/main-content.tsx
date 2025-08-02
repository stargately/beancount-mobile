import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List as List2 } from "@/components";

import { useIsFocused } from "@react-navigation/native";
import { analytics } from "@/common/analytics";
import { i18n, setLocale } from "@/translations";
import { useUserProfile } from "./hooks/use-user-profile";
import { useUpdateReportSubscribeToRemote } from "./hooks/use-update-report-subscribe";
import { useFeatureFlags } from "@/common/hooks/use-feature-flags";
import { ReportStatus } from "@/generated-graphql/graphql";
import { useSession } from "@/common/hooks/use-session";
import { localeVar, themeVar } from "@/common/vars";
import { useReactiveVar } from "@apollo/client";
import { actionLogout } from "./logout";
import { useToast } from "@/common/hooks";
import { Picker } from "@/components/picker";
import { ListItemHorizontal, ItemDescription } from "./list-item";
import { Theme } from "@/common/vars/theme";
import { useTheme } from "@/common/theme";
import { Ionicons } from "@expo/vector-icons";

export const MainContent = () => {
  const { authToken, userId } = useSession();
  const toast = useToast();
  const locale = useReactiveVar(localeVar);
  const currentTheme = useReactiveVar(themeVar);
  const theme = useTheme().colorTheme;
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [subscribeModalVisible, setSubscribeModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const LANGUAGES = {
    en: "English",
    zh: "中文",
    bg: "Български",
    ca: "Català",
    de: "Deutsch",
    es: "Español",
    fa: "فارسی",
    fr: "Français",
    nl: "Nederlands",
    pt: "Português",
    ru: "Русский",
    sk: "Slovenčina",
    uk: "Українська",
  };

  const THEMES = {
    light: i18n.t("themeLight"),
    dark: i18n.t("themeDark"),
    system: i18n.t("themeSystem"),
  };

  const languageSource = Object.entries(LANGUAGES).map(([value, label]) => ({
    value,
    label,
  }));

  const themeSource = Object.entries(THEMES).map(([value, label]) => ({
    value,
    label,
  }));
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
  const [reportStatus, setReportStatus] = useState<string>(
    emailReportStatus ? emailReportStatus.toString() : "",
  );

  useEffect(() => {
    setReportStatus(emailReportStatus ? emailReportStatus.toString() : "");
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

  const getLanguageLabel = (lng: string) => {
    return LANGUAGES[lng as keyof typeof LANGUAGES] || LANGUAGES.en;
  };

  const getThemeLabel = (theme: Theme) => {
    return THEMES[theme] || THEMES.light;
  };

  const { spendingReportSubscription } = useFeatureFlags(userId);

  return (
    <>
      <List2>
        <ListItemHorizontal
          title={i18n.t("reviewApp")}
          content={
            <ItemDescription
              text={Platform.OS === "ios" ? "Apple Store" : "Google Play"}
            />
          }
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
        />
        {spendingReportSubscription && (
          <ListItemHorizontal
            title={i18n.t("subscribe")}
            content={
              <ItemDescription text={getReportStatusLabel(reportStatus)} />
            }
            onPress={() => {
              setSubscribeModalVisible(true);
            }}
          />
        )}
        <ListItemHorizontal
          title={<Ionicons name="language" size={20} color={theme.black90} />}
          content={<ItemDescription text={getLanguageLabel(String(locale))} />}
          onPress={() => {
            setLanguageModalVisible(true);
          }}
        />
        <ListItemHorizontal
          title={i18n.t("theme")}
          content={<ItemDescription text={getThemeLabel(currentTheme)} />}
          onPress={() => {
            setThemeModalVisible(true);
          }}
        />
        <ListItemHorizontal
          title={i18n.t("currentVersion")}
          content={
            <Text style={{ fontSize: 16, color: theme.black80 }}>
              {Constants.expoConfig?.version || "Unknown"}
            </Text>
          }
        />

        {authToken ? (
          <ListItemHorizontal
            title={i18n.t("logout")}
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
          />
        ) : null}
      </List2>
      <Picker
        visible={languageModalVisible}
        items={languageSource}
        onSelect={async (item) => {
          const changeTo = item.value ? String(item.value) : "en";
          if (changeTo === locale) {
            return;
          }
          localeVar(changeTo);
          i18n.locale = changeTo;
          setLocale(changeTo);
          await analytics.track("tap_switch_language", { changeTo });
          setLanguageModalVisible(false);
        }}
        onCancel={() => {
          setLanguageModalVisible(false);
        }}
        selectedValue={locale}
        confirmButtonText={i18n.t("confirm")}
        cancelButtonText={i18n.t("cancel")}
      />
      <Picker
        visible={subscribeModalVisible}
        items={pickerSource}
        onSelect={async (item) => {
          const newValue = item.value ? String(item.value) : "";
          if (newValue === reportStatus) {
            return;
          }
          setReportStatus(newValue);
          const cancel = toast.showToast({
            message: i18n.t("updating"),
            type: "loading",
          });
          await mutate({
            variables: { userId, status: getReportStatusEnum(newValue) },
          });
          cancel();
          if (!error) {
            toast.showToast({
              message: i18n.t("updateSuccess"),
              type: "success",
            });
          } else {
            console.error("failed to update report status", error);
            toast.showToast({
              message: i18n.t("updateFailed"),
              type: "error",
            });
          }
          setSubscribeModalVisible(false);
        }}
        onCancel={() => {
          setSubscribeModalVisible(false);
        }}
        selectedValue={reportStatus}
        confirmButtonText={i18n.t("confirm")}
        cancelButtonText={i18n.t("cancel")}
      />
      <Picker
        visible={themeModalVisible}
        items={themeSource}
        onSelect={async (item) => {
          const newTheme = item.value as Theme;
          if (newTheme === currentTheme) {
            return;
          }
          themeVar(newTheme);
          await analytics.track("tap_switch_theme", { mode: newTheme });
          setThemeModalVisible(false);
        }}
        onCancel={() => {
          setThemeModalVisible(false);
        }}
        selectedValue={currentTheme}
        confirmButtonText={i18n.t("confirm")}
        cancelButtonText={i18n.t("cancel")}
      />
    </>
  );
};
