import React from "react";
import { List } from "@ant-design/react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "@/common/theme";
import { onePx } from "@/common/screen-util";
import { ColorTheme } from "@/types/theme-props";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
    },
  });

export function ListItemStyled({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}): JSX.Element {
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  return (
    <List.Item
      style={styles.container}
      arrow="horizontal"
      onPress={onPress}
      styles={{ Item: { marginTop: onePx } }}
    >
      {children}
    </List.Item>
  );
}
