import * as React from "react";
import { Dimensions, View, StyleSheet, Image } from "react-native";
import { useTranslations } from "@/common/hooks/use-translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { Button } from "@/components";
import { LoginOrSignUp } from "@/screens/welcome/auth-modal";

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
  const { t } = useTranslations();
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
      <View style={styles.buttonContainer}>
        <LoginOrSignUp isSignUp={false} style={styles.flex}>
          <Button type="outline">{t("signIn")}</Button>
        </LoginOrSignUp>
        <LoginOrSignUp isSignUp={true} style={styles.flex}>
          <Button type="primary">{t("signUp")}</Button>
        </LoginOrSignUp>
      </View>
    </View>
  );
}
