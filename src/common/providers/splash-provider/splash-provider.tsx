import * as SplashScreen from "expo-splash-screen";
import { useEffect, memo, useState, useCallback } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { loadLocale } from "@/common/vars/locale";
import { loadTheme } from "@/common/vars/theme";
import { loadSession } from "@/common/vars/session";
import { i18n } from "@/translations";

SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  fade: true,
  duration: 1000,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const SplashProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Ionicons.font);
        const [locale] = await Promise.all([
          loadLocale(),
          loadTheme(),
          loadSession(),
        ]);
        if (locale) {
          i18n.locale = locale;
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};

export const SplashProvider = memo(SplashProviderComponent);

SplashProvider.displayName = "SplashProvider";
