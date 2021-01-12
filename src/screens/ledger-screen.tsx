/* tslint:disable:no-any */
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { WebView } from "react-native-webview";
import { Button } from "@ant-design/react-native";
import { analytics } from "@/common/analytics";
import { headers } from "@/common/headers";
import { getEndpoint } from "@/common/request";
import { statusBarHeight } from "@/common/screen-util";
import { AppState } from "@/common/store";
import { useTheme } from "@/common/theme";
import { ProgressBar } from "@/common/progress-bar";
import { ColorTheme } from "@/types/theme-props";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    loadingContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
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
  });

type Props = {
  authToken?: string;
};

export const LedgerScreen = connect((state: AppState) => {
  return { authToken: state.base.authToken };
})(function BbsScreenInner(props: Props): JSX.Element {
  let webViewRef: WebView | null;
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function init() {
      await analytics.track("page_view_ledger", {});
    }
    init();
  }, []);

  const onRefresh = async () => {
    await analytics.track("tap_refresh", {});
    if (webViewRef) {
      webViewRef.reload();
    }
  };

  const { authToken } = props;
  const [uri, setUri] = useState(getEndpoint("ledger/editor/"));
  return (
    <View style={styles.container}>
      <View style={{ height: statusBarHeight, backgroundColor: theme.white }} />
      <ProgressBar progress={progress} />
      <WebView
        ref={(webView) => {
          webViewRef = webView;
        }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        source={{
          uri,
          headers: { Authorization: `Bearer ${authToken}`, ...headers },
        }}
        onLoadStart={(navState) => {
          setUri(navState.nativeEvent.url);
        }}
      />
      <Button style={styles.refreshButton} onPress={onRefresh}>
        <Ionicons name="md-refresh" size={24} color={theme.white} />
      </Button>
    </View>
  );
});
