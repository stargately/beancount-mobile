import * as React from "react";
import { useTheme } from "@/common/theme";
import { About } from "@/screens/mine-screen/about";
import { analytics } from "@/common/analytics";
import { SafeAreaView } from "react-native-safe-area-context";

export function MineScreen(): JSX.Element {
  const theme = useTheme().colorTheme;
  React.useEffect(() => {
    async function init() {
      await analytics.track("page_view_mine", {});
    }
    init();
  }, []);

  return (
    <SafeAreaView
      edges={[]}
      style={{
        backgroundColor: theme.white,
        flex: 1,
      }}
    >
      <About />
    </SafeAreaView>
  );
}
