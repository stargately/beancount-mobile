import { Button, Modal } from "@ant-design/react-native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginWebView } from "@/screens/welcome/login-web-view";
import { useStateIfMounted } from "@/common/hooks/use-state-if-mounted";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "@/common/hooks/use-theme-style";

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
  const styles = useThemeStyle(getLoginOrSignUpStyles);
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
