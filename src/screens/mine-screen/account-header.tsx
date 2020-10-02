import { Button, Modal, Toast } from "@ant-design/react-native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppState } from "@/common/store";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenWidth } from "@/common/screen-util";
import { LoginWebView } from "@/screens/mine-screen/login-web-view";
import { useStateIfMounted } from "@/common/hooks/use-state-if-mounted";
import { useUserProfile } from "@/screens/mine-screen/hooks/use-user-profile";
import { LoadingTile } from "@/common/loading-tile";
import { analytics } from "@/common/analytics";

const getStyles = () =>
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
  if (loading || error || !email) {
    if (error) {
      Toast.fail(`failed to fetch user: ${error}`, 5);
    }
    return <LoadingTile style={{ height: 24, width: ScreenWidth - 14 * 2 }} />;
  }
  return (
    <View>
      <Text style={getStyles().nameText} numberOfLines={1}>
        {email}
      </Text>
    </View>
  );
};

export const AccountHeader = connect((state: AppState) => ({
  userId: state.base.userId,
  authToken: state.base.authToken,
}))(({ userId, authToken }: { userId: string; authToken: string }) => {
  return (
    <View
      style={[getStyles().titleContainer, { backgroundColor: theme.primary }]}
    >
      {userId && authToken ? (
        <EmailHeader userId={userId} />
      ) : (
        <LoginOrSignUp>
          <Text style={getStyles().loginSignUpText}>{i18n.t("login")}</Text>
        </LoginOrSignUp>
      )}
    </View>
  );
});

const getLoginOrSignUpStyles = () =>
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

  const styles = getLoginOrSignUpStyles();
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
