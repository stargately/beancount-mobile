import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/common/theme";

const getStyles = () =>
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
  return (
    <View style={getStyles().container}>
      <Text style={getStyles().text}>{netAssets}</Text>
    </View>
  );
}
