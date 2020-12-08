import * as React from "react";
import { View } from "react-native";
import { statusBarHeight } from "@/common/screen-util";
import { theme } from "@/common/theme";
import { ScreenProps } from "@/types/screen-props";
import { About } from "@/screens/mine-screen/about";
import { NavigationScreenProp } from "react-navigation";
import { analytics } from "@/common/analytics";

type Props = {
  navigation: NavigationScreenProp<string>;
  screenProps: ScreenProps;
};

export function MineScreen(props: Props): JSX.Element {
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_mine", {});
    }
    init();
  }, []);
  const fromAnnouncement = props.navigation.getParam("fromAnnouncement");
  return (
    <View
      style={{
        backgroundColor: theme.white,
        flex: 1,
        marginTop: statusBarHeight,
      }}
    >
      <About
        screenProps={props.screenProps}
        fromAnnouncement={fromAnnouncement}
        navigation={props.navigation}
      />
    </View>
  );
}
