import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { theme } from "@/common/theme";
import { contentPadding, ScreenWidth } from "@/common/screen-util";
import { NavigationScreenProp } from "react-navigation";

type Props = {
  navigation: NavigationScreenProp<string>;
  title: string;
  subtitle: string;
  icon: JSX.Element;
};

const styles = () =>
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
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    async function init() {
      try {
        const value = await AsyncStorage.getItem("@HideAnnouncement:key");
        if (value !== null) {
          setHide(value === "true");
        } else {
          setHide(false);
        }
      } catch (error) {
        console.error(`failed to get hide announcement value: ${error}`);
      }
    }
    init();
  }, []);

  const { title, subtitle, icon } = props;

  if (hide) {
    return <View />;
  }

  return (
    <TouchableOpacity
      style={styles().container}
      onPress={() => {
        props.navigation.navigate("Mine", { fromAnnouncement: true });
      }}
    >
      <View style={styles().titleContainer}>
        <Text style={styles().subtitle}>{subtitle}</Text>

        <Text numberOfLines={2} style={styles().title}>
          {title}
        </Text>
      </View>

      <View>{icon}</View>
      <TouchableOpacity
        style={styles().closeButton}
        activeOpacity={0.9}
        onPress={async () => {
          setHide(true);
          try {
            await AsyncStorage.setItem("@HideAnnouncement:key", "true");
          } catch (error) {
            console.error(`failed to set hide announcement value: ${error}`);
          }
        }}
      >
        <Text style={styles().closeText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
