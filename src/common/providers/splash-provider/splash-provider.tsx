import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, memo } from "react";
import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const SplashProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    "space-mono": require("@/assets/fonts/SpaceMono-Regular.ttf"),
    antoutline: require("../../../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf"),
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
