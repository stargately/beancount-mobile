import { StyleSheet, View } from "react-native";
import React from "react";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "./hooks/use-theme-style";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    line: {
      height: 1,
      backgroundColor: theme.black40,
    },
  });

export function CommonLine(): JSX.Element {
  const styles = useThemeStyle(getStyles);
  return <View style={styles.line} />;
}
