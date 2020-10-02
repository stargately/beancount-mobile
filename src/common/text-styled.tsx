import React from "react";
import { Text } from "react-native";
import { theme } from "@/common/theme";

const getStyles = () => {
  return { fontSize: 20, color: theme.text01 };
};

export function TextStyled({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Text {...otherProps} style={getStyles()}>
      {children}
    </Text>
  );
}

export function HeaderText({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Text
      {...otherProps}
      style={[{ fontSize: 24, color: theme.text01, fontWeight: "bold" }]}
    >
      {children}
    </Text>
  );
}

export function SmallHeaderText({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Text
      {...otherProps}
      style={[{ fontSize: 18, color: theme.black80, fontWeight: "bold" }]}
    >
      {children}
    </Text>
  );
}
