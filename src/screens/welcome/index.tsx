import * as React from "react";
import { Dimensions, View, StyleSheet, Image } from "react-native";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { router } from "expo-router";
import { Button } from "@/components";

const { height } = Dimensions.get("window");

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      height,
      backgroundColor: theme.white,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      height: 144,
      width: 144,
    },
    buttonContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 80,
      height: 44,
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: 20,
      gap: 10,
    },
    flex: {
      flex: 1,
    },
  });

export function WelcomeScreen(): JSX.Element {
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_pre_auth", {});
    }
    init();
  }, []);
  const styles = useThemeStyle(getStyles);
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.flex}
          type="outline"
          onPress={() => router.push("/auth/sign-in")}
        >
          {i18n.t("signIn")}
        </Button>
        <Button
          style={styles.flex}
          type="primary"
          onPress={() => router.push("/auth/sign-up")}
        >
          {i18n.t("signUp")}
        </Button>
      </View>
    </View>
  );
}
