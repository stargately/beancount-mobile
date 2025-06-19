import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Progress } from "@/components";
import { useEffect, useState } from "react";

type Props = {
  progress: number;
};

const styles = StyleSheet.create({
  container: {
    height: 3,
  },
});

export function ProgressBar(props: Props): JSX.Element {
  const { progress } = props;
  const [debouncedProgress, setDebouncedProgress] = useState(progress);

  useEffect(() => {
    if (progress !== 1) {
      setDebouncedProgress(progress);
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedProgress(progress);
    }, 500);

    return () => clearTimeout(timer);
  }, [progress]);

  // const theme = useTheme().colorTheme;
  if (debouncedProgress === 1) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Progress percent={progress * 100} duration={500} />
    </View>
  );
}
