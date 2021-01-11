import { View } from "react-native";
import React from "react";
import { useTheme } from "@/common/theme";

export function CommonLine(): JSX.Element {
  const theme = useTheme().colorTheme;
  return <View style={{ height: 1, backgroundColor: theme.black40 }} />;
}
