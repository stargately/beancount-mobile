import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { AppNavigator } from "@/common/navigation/app-navigator";
import { Providers } from "@/common/providers";
import "@/common/sentry";
import { actionUpdateReduxState } from "@/common/root-reducer";
import { useTheme } from "@/common/theme";
import { Scope, TranslateOptions } from "i18n-js";
import { PreAuthView } from "@/screens/mine-screen/pre-auth-view";
import { useCachedResources } from "@/common/hooks/use-cached-resource";
import { i18n, LocalizationContext } from "@/translations";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    const notificationSubscription = Notifications.addNotificationReceivedListener(
      handleNotification
    );
    return function cleanup() {
      notificationSubscription.remove();
    };
  }, []);

  const [locale, setLocale] = React.useState(i18n.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: Scope, options: TranslateOptions) =>
        i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <Providers>
        <AppContent />
      </Providers>
    </LocalizationContext.Provider>
  );
}

const AppContent = connect(
  (state: {
    base: { authToken: string; currentTheme: string; locale: string };
  }) => ({
    authToken: state.base.authToken,
    currentTheme: state.base.currentTheme,
    locale: state.base.locale,
  }),
  (dispatch) => ({
    updateReduxState(payload: { base: { currentTheme: string } }): void {
      dispatch(actionUpdateReduxState(payload));
    },
  })
)(
  (props: {
    authToken: string;
    currentTheme: "dark" | "light";
    locale: string;
    updateReduxState: (state: { base: { currentTheme: string } }) => void;
  }) => {
    const { locale, currentTheme, updateReduxState } = props;
    const { setLocale } = React.useContext(LocalizationContext);
    const theme = useTheme();
    if (locale && i18n) {
      i18n.locale = locale;
    }

    if (currentTheme !== theme.name) {
      updateReduxState({
        base: { currentTheme },
      });
    }

    React.useEffect(() => {
      setLocale(locale);
    }, []);

    if (!props.authToken) {
      return <PreAuthView />;
    }
    return (
      <View style={styles.container}>
        <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
        <AppNavigator />
      </View>
    );
  }
);
