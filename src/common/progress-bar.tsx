import { View } from "react-native";
// import { ProgressView } from "@react-native-community/progress-view";
import * as React from "react";
import { Progress } from "@ant-design/react-native";
// import { useTheme } from "@/common/theme";

type Props = {
  progress: number;
};

export function ProgressBar(props: Props): JSX.Element {
  const { progress } = props;
  // const theme = useTheme().colorTheme;
  if (progress === 1) {
    return <View />;
  }

  return (
    <View style={{ height: 3 }}>
      <Progress percent={progress * 100} />
    </View>
  );
}
