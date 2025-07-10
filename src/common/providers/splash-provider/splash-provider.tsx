import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, memo } from "react";
// import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const SplashProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontsLoaded] = useFonts({
    // ...Ionicons.font,
    "space-mono": require("../../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const loaded = fontsLoaded;

  useEffect(() => {
    if (!loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return children;
};

export const SplashProvider = memo(SplashProviderComponent);

SplashProvider.displayName = "SplashProvider";
