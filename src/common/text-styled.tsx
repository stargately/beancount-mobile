import React from "react";
import { Text } from "react-native";
import { useTheme } from "@/common/theme";
import { ColorTheme } from "@/types/theme-props";

const getStyles = (theme: ColorTheme) => {
  return { fontSize: 20, color: theme.text01 };
};

export function TextStyled({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
}): JSX.Element {
  const theme = useTheme().colorTheme;
  return (
    <Text {...otherProps} style={getStyles(theme)}>
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
  const theme = useTheme().colorTheme;
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
  const theme = useTheme().colorTheme;
  return (
    <Text
      {...otherProps}
      style={[{ fontSize: 18, color: theme.black80, fontWeight: "bold" }]}
    >
      {children}
    </Text>
  );
}
