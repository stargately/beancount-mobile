import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Share,
} from "react-native";
import { Button, Toast } from "@ant-design/react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { contentPadding } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { CommonMargin } from "@/common/common-margin";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";

type Props = {
  navigation: any;
  route: any;
};

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    bodyContainer: {
      flex: 1,
      padding: contentPadding,
    },
    infoText: {
      color: theme.text01,
      fontSize: 16,
      marginBottom: 20,
      textAlign: "center",
    },
    shareButton: {
      height: 44,
      backgroundColor: theme.primary,
      marginTop: 20,
    },
    buttonText: {
      fontWeight: "500",
      fontSize: 16,
      color: "white",
    },
    inputContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.black60,
      borderRadius: 4,
      padding: 10,
      color: theme.text01,
      backgroundColor: theme.white,
    },
    shareInfoText: {
      color: theme.black80,
      fontSize: 14,
      marginTop: 10,
      textAlign: "center",
    },
  });

export function InviteScreen(props: Props) {
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_invite", {});
    }
    init();
  }, []);

  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const [customMessage, setCustomMessage] = React.useState("");

  const shareLink = "https://beancount.io/";

  const onSharePress = async () => {
    try {
      const message = customMessage || i18n.t("inviteMessage");
      const result = await Share.share({
        message: `${message}
${shareLink}`,
        url: shareLink,
        title: "Beancount",
      });

      if (result.action === Share.sharedAction) {
        Toast.show(i18n.t("thanksShare"));
        await analytics.track("tap_invite", { shareLink });
      }
    } catch (error) {
      Toast.fail(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={i18n.t("inviteFriends")}
        showBack
        navigation={props.navigation}
      />

      <View style={styles.bodyContainer}>
        <Text style={styles.infoText}>
          {i18n.t("inviteDescription") ||
            "Invite your friends to try Beancount!"}
        </Text>

        <View style={styles.inputContainer}>
          <Text>{i18n.t("customMessage") || "Custom message (optional):"}</Text>
          <TextInput
            style={styles.input}
            value={customMessage}
            onChangeText={setCustomMessage}
            placeholder={
              i18n.t("enterCustomMessage") || "Enter a custom message..."
            }
            multiline
            numberOfLines={3}
          />
        </View>

        <Button style={styles.shareButton} onPress={onSharePress}>
          <Text style={styles.buttonText}>
            {i18n.t("shareInvite") || "Share Invite"}
          </Text>
        </Button>

        <Text style={styles.shareInfoText}>
          {i18n.t("shareInfo") ||
            "Share with your friends using your favorite apps"}
        </Text>
      </View>
    </View>
  );
}
