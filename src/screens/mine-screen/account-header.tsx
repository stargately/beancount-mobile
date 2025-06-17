import { Button, Modal, Toast } from "@ant-design/react-native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppState } from "@/common/store";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenWidth } from "@/common/screen-util";
import { LoginWebView } from "@/screens/mine-screen/login-web-view";
import { useStateIfMounted } from "@/common/hooks/use-state-if-mounted";
import { useUserProfile } from "@/screens/mine-screen/hooks/use-user-profile";
import { LoadingTile } from "@/common/loading-tile";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { SafeAreaView } from "react-native-safe-area-context";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    titleContainer: {
      paddingHorizontal: 14,
      paddingTop: 28,
      paddingBottom: 28,
      flexDirection: "row",
      backgroundColor: theme.primary,
    },
    nameText: {
      color: theme.white,
      fontWeight: "600",
      fontSize: 24,
    },
    loginSignUpText: {
      fontSize: 24,
      color: theme.white,
      fontWeight: "600",
    },
    closeButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      position: "absolute",
      bottom: 10,
      right: 10,
    },
    closeText: {
      color: theme.white,
      fontSize: 24,
    },
  });

export const EmailHeader = ({ userId }: { userId: string }) => {
  const { email, loading, error } = useUserProfile(userId);
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  if (loading || error || !email) {
    if (error) {
      Toast.fail(`failed to fetch user: ${error}`, 5);
    }
    return <LoadingTile style={{ height: 24, width: ScreenWidth - 14 * 2 }} />;
  }
  return (
    <View>
      <Text style={styles.nameText} numberOfLines={1}>
        {email}
      </Text>
    </View>
  );
};

export const AccountHeader = connect((state: AppState) => ({
  userId: state.base.userId,
  authToken: state.base.authToken,
}))(({ userId, authToken }: { userId: string; authToken: string }) => {
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.titleContainer, { backgroundColor: theme.primary }]}
    >
      {userId && authToken ? (
        <EmailHeader userId={userId} />
      ) : (
        <LoginOrSignUp>
          <Text style={styles.loginSignUpText}>{i18n.t("login")}</Text>
        </LoginOrSignUp>
      )}
    </SafeAreaView>
  );
});

const getLoginOrSignUpStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    closeButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      position: "absolute",
      bottom: 10,
      right: 10,
    },
    closeText: {
      color: theme.white,
      fontSize: 24,
    },
  });

type LoginOrSignUpProps = {
  children: JSX.Element;
  isSignUp?: boolean;
};

export function LoginOrSignUp(props: LoginOrSignUpProps): JSX.Element {
  const [shouldDisplayModal, setShouldDisplayModal] = useStateIfMounted(false);

  const onCloseModal = () => {
    setShouldDisplayModal(false);
  };
  const theme = useTheme().colorTheme;
  const styles = getLoginOrSignUpStyles(theme);
  return (
    <View
      onTouchStart={async () => {
        setShouldDisplayModal(true);
        await analytics.track("tap_login_or_signup", {
          isSignUp: props.isSignUp,
        });
      }}
    >
      <Modal
        popup
        transparent={false}
        visible={shouldDisplayModal}
        animationType="slide-up"
        onClose={onCloseModal}
      >
        <LoginWebView
          onClose={onCloseModal}
          isSignUp={Boolean(props.isSignUp)}
        />
        <Button style={styles.closeButton} onPress={onCloseModal}>
          <Text style={styles.closeText}>✕</Text>
        </Button>
      </Modal>

      {props.children}
    </View>
  );
}
