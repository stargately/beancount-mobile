import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/common/theme";
import { ColorTheme } from "@/types/theme-props";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    text: {
      fontSize: 28,
      color: theme.text01,
      fontWeight: "bold",
    },
    container: {
      height: 40,
      justifyContent: "center",
    },
  });

export function NetAssetsStyled({
  netAssets,
}: {
  netAssets: string;
}): JSX.Element {
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{netAssets}</Text>
    </View>
  );
}
