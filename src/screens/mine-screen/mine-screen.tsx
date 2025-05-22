import * as React from "react";
import { View } from "react-native";
// import { statusBarHeight } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { About } from "@/screens/mine-screen/about";
import { analytics } from "@/common/analytics";

type Props = {
  navigation: any;
};

export function MineScreen(props: Props): JSX.Element {
  const theme = useTheme().colorTheme;
  const { navigation } = props;
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_mine", {});
    }
    init();
  }, []);

  return (
    <View
      style={{
        backgroundColor: theme.white,
        flex: 1,
        // paddingTop: statusBarHeight,
      }}
    >
      <About navigation={navigation} />
    </View>
  );
}
