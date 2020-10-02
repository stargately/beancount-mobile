import {
  ProgressViewIOS,
  ProgressBarAndroid,
  Platform,
  View,
} from "react-native";
import * as React from "react";
import { theme } from "@/common/theme";

type Props = {
  progress: number;
};

export function ProgressBar(props: Props): JSX.Element {
  const { progress } = props;

  if (progress === 1) {
    return <View />;
  }

  if (Platform.OS === "ios") {
    return (
      <ProgressViewIOS
        style={{ transform: [{ scaleX: 1.0 }, { scaleY: 3 }] }}
        progressTintColor={theme.information}
        progress={progress}
      />
    );
  }
  return (
    <ProgressBarAndroid
      progress={progress}
      color={theme.information}
      styleAttr="Horizontal"
      indeterminate={false}
    />
  );
}
