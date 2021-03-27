import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/common/theme";
import { ColorTheme } from "@/types/theme-props";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { useAsyncStorage } from "@/common/hooks/use-async-storage";

type Props = {
  navigation: any;
  title: string;
  subtitle: string;
  icon: JSX.Element;
};

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      height: 120,
      backgroundColor: theme.white,
      paddingHorizontal: contentPadding,
      flexDirection: "row",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.black40,
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: contentPadding,
    },
    titleContainer: {
      width: (ScreenWidth - 2 * contentPadding) * 0.6,
    },
    iconContainer: {
      width: (ScreenWidth - 2 * contentPadding) * 0.3,
    },
    subtitle: {
      color: theme.black,
      fontSize: 14,
      marginBottom: 10,
    },
    title: {
      color: theme.black,
      fontSize: 20,
      fontWeight: "bold",
      lineHeight: 26,
    },
    closeButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.black60,
      position: "absolute",
      top: 10,
      alignItems: "center",
      justifyContent: "center",
      right: 10,
    },
    closeText: {
      color: theme.white,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export function Announcement(props: Props): JSX.Element {
  const [hide, setHide] = React.useState(true);
  const [hideAnnouncement, setHideAnnouncement, synced] = useAsyncStorage(
    "@HideAnnouncement:key",
    ""
  );
  /* tslint:disable:no-unused-variable */
  const [subFlash, setSubFlash] = useAsyncStorage("@SubscriptionFlash:key", "");

  React.useEffect(() => {
    if (synced) {
      setHide(hideAnnouncement === "true");
    }
  }, [synced]);

  const { title, subtitle, icon, navigation } = props;

  const theme = useTheme();

  const styles = getStyles(theme.colorTheme);

  if (hide) {
    return <View />;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        await setSubFlash("true");
        navigation.navigate("Mine");
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>

      <View>{icon}</View>
      <TouchableOpacity
        style={styles.closeButton}
        activeOpacity={0.9}
        onPress={async () => {
          setHide(true);
          await setHideAnnouncement("true");
        }}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
