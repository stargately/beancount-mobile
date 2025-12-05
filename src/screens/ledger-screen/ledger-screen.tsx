import React, { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { analytics } from "@/common/analytics";
import { headers, getEndpoint } from "@/common/request";
import { statusBarHeight } from "@/common/screen-util";
import { ProgressBar } from "./progress-bar";
import { ColorTheme } from "@/types/theme-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/common/hooks/use-session";
import { useThemeStyle, usePageView } from "@/common/hooks";
import { useTheme } from "@/common/theme";
import { appendLangParam } from '@/common/url-utils'

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      flexDirection: "column",
    },
    refreshButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      position: "absolute",
      top: statusBarHeight,
      right: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    webViewContainer: {
      flex: 1,
    },
  });

export const LedgerScreen = () => {
  let webViewRef: WebView | null;
  const styles = useThemeStyle(getStyles);
  const theme = useTheme().colorTheme;
  const [progress, setProgress] = useState(0);
  usePageView("ledger");

  const onRefresh = async () => {
    await analytics.track("tap_refresh", {});
    if (webViewRef) {
      webViewRef.reload();
    }
  };
  const { authToken } = useSession();
  const uri = appendLangParam(getEndpoint("ledger/editor/"));
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ProgressBar progress={progress} />
      <View style={styles.webViewContainer}>
        <WebView
          ref={(webView) => {
            webViewRef = webView;
          }}
          onLoadProgress={({ nativeEvent }) =>
            setProgress(nativeEvent.progress)
          }
          source={{
            uri,
            headers: { Authorization: `Bearer ${authToken}`, ...headers },
          }}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.refreshButton}
          onPress={onRefresh}
        >
          <Ionicons name="refresh" size={24} color={theme.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
