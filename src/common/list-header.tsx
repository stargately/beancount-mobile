import React from "react";
import { Text } from "react-native";
import { theme } from "@/common/theme";

export function ListHeader({ children }: { children: string }): JSX.Element {
  return (
    <Text
      style={{
        backgroundColor: theme.white,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 8,
        color: theme.text01,
      }}
    >
      {children}
    </Text>
  );
}
