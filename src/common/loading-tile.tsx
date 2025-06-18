import { useReactiveVar } from "@apollo/client";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native-animatable";
import { themeVar } from "@/common/vars";

const styles = StyleSheet.create({
  light: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dark: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  loadingTile: {
    overflow: "hidden",
    borderRadius: 3,
  },
});

export const LoadingTile = (props: { style?: ViewStyle }) => {
  const { style } = props;
  const theme = useReactiveVar(themeVar);
  return (
    <View
      animation={{
        from: { opacity: 1 },
        to: { opacity: 0.5 },
      }}
      duration={300}
      direction="alternate"
      iterationCount={Infinity}
      style={[
        styles.loadingTile,
        theme === "dark" ? styles.dark : styles.light,
        style,
      ]}
      useNativeDriver
    />
  );
};
