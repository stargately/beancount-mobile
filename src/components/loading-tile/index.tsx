import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { themeVar } from "@/common/vars";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  light: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dark: {
    backgroundColor: "rgba(194, 67, 67, 0.1)",
  },
  loadingTile: {
    overflow: "hidden",
    borderRadius: 3,
  },
});

export const LoadingTile = (props: { style?: ViewStyle }) => {
  const { style } = props;
  const theme = useReactiveVar(themeVar);

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 300 }),
        withTiming(1, { duration: 300 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.loadingTile,
        theme === "dark" ? styles.dark : styles.light,
        style,
        animatedStyle,
      ]}
    />
  );
};
