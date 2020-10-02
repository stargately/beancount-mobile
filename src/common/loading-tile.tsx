import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native-animatable";
import { connect } from "react-redux";

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

export const LoadingTile = connect(
  (state: { base: { currentTheme: string } }) => ({
    theme: state.base.currentTheme,
  })
)(({ style, theme }: { style?: ViewStyle; theme: string }) => {
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
});
