import React from "react";
import { List } from "@ant-design/react-native";
import { StyleSheet } from "react-native";
import { theme } from "@/common/theme";

const styles = () =>
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
  return (
    <List.Item style={styles().container} arrow="horizontal" onPress={onPress}>
      {children}
    </List.Item>
  );
}
