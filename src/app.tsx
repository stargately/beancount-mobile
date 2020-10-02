import { Notifications } from "expo";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { AppNavigatorContainer } from "@/common/navigation/app-navigator-container";
import { Providers } from "@/common/providers";
import "@/common/sentry";
import { theme, setTheme } from "@/common/theme";
import { withTheme } from "@/common/with-theme";
import { PreAuthView } from "@/screens/mine-screen/pre-auth-view";
import { useCachedResources } from "@/common/hooks/use-cached-resource";
import { i18n } from "@/translations";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
});

export function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    // tslint:disable-next-line
    function handleNotification(notification: any) {
      // tslint:disable-next-line
      console.log(notification, "notification");
    }
    const notificationSubscription = Notifications.addListener(
      handleNotification
    );
    return function cleanup() {
      notificationSubscription.remove();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}

const AppContent = withTheme(
  connect(
    (state: {
      base: { authToken: string; currentTheme: string; locale: string };
    }) => ({
      authToken: state.base.authToken,
      currentTheme: state.base.currentTheme,
      locale: state.base.locale,
    })
  )(
    (props: {
      authToken: string;
      currentTheme: "dark" | "light";
      locale: string;
    }) => {
      const { locale, currentTheme } = props;

      if (locale && i18n) {
        i18n.locale = locale;
      }

      if (currentTheme !== theme.name) {
        setTheme(currentTheme);
      }

      if (!props.authToken) {
        return <PreAuthView />;
      }
      return (
        <View style={styles.container}>
          <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
          <AppNavigatorContainer />
        </View>
      );
    }
  )
);
