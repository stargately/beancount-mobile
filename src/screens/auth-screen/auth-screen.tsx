import * as React from "react";
import { Dimensions, View, StyleSheet, Image, Text } from "react-native";
import { Button } from "@ant-design/react-native";
import { i18n } from "@/translations";
import { LoginOrSignUp } from "./auth-modal";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "@/common/hooks/use-theme-style";

const { width, height } = Dimensions.get("window");
const buttonWidth = (width - 20 * 3) / 2;

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
    },
    button: {
      height: 44,
      width: buttonWidth,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderColor: theme.black60,
      borderWidth: 1,
      backgroundColor: theme.white,
    },
    btnTitle: {
      fontSize: 20,
      color: theme.text01,
    },
    primaryButton: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    primaryButtonText: {
      color: theme.white,
    },
  });

export function AuthScreen(): JSX.Element {
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
        <LoginOrSignUp isSignUp={false}>
          <Button style={styles.button}>
            <Text style={styles.btnTitle}>{i18n.t("signIn")}</Text>
          </Button>
        </LoginOrSignUp>
        <LoginOrSignUp isSignUp={true}>
          <Button style={[styles.button, styles.primaryButton]}>
            <Text style={[styles.btnTitle, styles.primaryButtonText]}>
              {i18n.t("signUp")}
            </Text>
          </Button>
        </LoginOrSignUp>
      </View>
    </View>
  );
}
