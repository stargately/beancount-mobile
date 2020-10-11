import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Clipboard,
  Share,
  Platform,
} from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { CommonMargin } from "@/common/common-margin";
import { ReferralGiftIcon } from "@/screens/referral-screen/components/referral-gift-icon";
import { NavigationScreenProp } from "react-navigation";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { Button, Toast } from "@ant-design/react-native";
import { connect } from "react-redux";
import { analytics } from "@/common/analytics";

type Props = {
  navigation: NavigationScreenProp<string>;
  userId: string;
};

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      flex: 1,
    },
    body: {
      margin: contentPadding,
      flex: 1,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text01,
    },
    summary: {
      fontSize: 16,
      lineHeight: 26,
      textAlign: "center",
      color: theme.black80,
    },
    shareLinkContainer: {
      height: 48,
      width: ScreenWidth - 2 * contentPadding,
      borderColor: theme.black40,
      borderRadius: 8,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    shareLink: {
      marginHorizontal: contentPadding,
      fontSize: 16,
      color: theme.text01,
      flex: 1,
    },
    copyBtn: {
      height: 48,
      paddingHorizontal: contentPadding,
      justifyContent: "center",
      alignItems: "center",
    },
    copy: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primary,
    },
    inviteBtn: {
      backgroundColor: theme.primary,
      width: ScreenWidth - 2 * contentPadding,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.primary,
    },
    invite: {
      fontWeight: "bold",
      color: "white",
      fontSize: 16,
    },
    shareBtn: {
      backgroundColor: theme.white,
      width: ScreenWidth - 2 * contentPadding,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.primary,
    },
    share: {
      fontWeight: "bold",
      color: theme.primary,
      fontSize: 16,
    },
  });

export const ReferralScreen = connect(
  (state: { base: { userId: string } }) => ({ userId: state.base.userId })
)(function ReferralScreen(props: Props): JSX.Element {
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_referral", {});
    }
    init();
  }, []);

  const { userId } = props;
  const shareLink = `beancount.io/sign-up/?src=${Platform.OS}&by=${userId}`;

  return (
    <View style={styles().container}>
      <NavigationBar
        title={i18n.t("referral")}
        showBack
        navigation={props.navigation}
      />
      <View style={styles().body}>
        <CommonMargin />
        <CommonMargin />
        <ReferralGiftIcon />
        <CommonMargin />
        <Text style={styles().title}>{i18n.t("rewardSummary")}</Text>
        <CommonMargin />
        <Text style={styles().summary}>{i18n.t("rewardDetail")}</Text>
        <CommonMargin />
        <CommonMargin />
        <View style={styles().shareLinkContainer}>
          <Text numberOfLines={1} style={styles().shareLink}>
            {shareLink}
          </Text>
          <TouchableOpacity
            style={styles().copyBtn}
            onPress={async () => {
              Clipboard.setString(shareLink);
              Toast.show(i18n.t("copied"), 1);
              await analytics.track("tap_share_link_copy", { shareLink });
            }}
          >
            <Text style={styles().copy}>{i18n.t("copy")}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}></View>
        <Button
          style={styles().inviteBtn}
          onPress={async () => {
            await analytics.track("tap_navigate_to_invite", { shareLink });
            props.navigation.navigate("Invite", { shareLink });
          }}
        >
          <Text style={styles().invite}>{i18n.t("inviteFromContacts")}</Text>
        </Button>
        <CommonMargin />
        <Button
          style={styles().shareBtn}
          onPress={async () => {
            await analytics.track("tap_share_link_share", { shareLink });
            Share.share({
              message: `${i18n.t("recommend")} ${shareLink}`,
            })
              .then((result) => {
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              })
              .catch((_) => {
                Toast.fail(i18n.t("shareError"));
              });
          }}
        >
          <Text style={styles().share}>{i18n.t("share")}</Text>
        </Button>
        <CommonMargin />
      </View>
    </View>
  );
});
