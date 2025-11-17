import * as React from "react";
import { View, StyleSheet, Animated } from "react-native";

type Props = {
  progress: number;
};

export const ProgressBar = ({ progress }: Props) => {
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  if (progress >= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 3,
  },
  progressTrack: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1890ff",
  },
});
