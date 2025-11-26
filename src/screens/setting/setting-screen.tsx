import * as React from "react";
import { useTheme } from "@/common/theme";
import { About } from "./about";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePageView } from "@/common/hooks";

export function SettingScreen(): JSX.Element {
  const theme = useTheme().colorTheme;
  usePageView("mine");

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
