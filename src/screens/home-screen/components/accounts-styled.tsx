import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/common/theme";
import { contentPadding } from "@/common/screen-util";
import { CommonLine } from "@/common/common-line";
import { i18n } from "@/translations";

const getStyles = () =>
  StyleSheet.create({
    text: {
      fontSize: 20,
      color: theme.text01,
    },
    rowContainer: {
      flexDirection: "row",
      height: 50,
      alignItems: "center",
      paddingHorizontal: contentPadding,
    },
    circle: {
      height: 14,
      width: 14,
      borderRadius: 7,
      marginRight: contentPadding,
    },
  });

export function AccountsRow({
  title,
  value,
  circleColor,
}: {
  title: string;
  value: string;
  circleColor: string;
}): JSX.Element {
  return (
    <View style={getStyles().rowContainer}>
      <View style={[getStyles().circle, { backgroundColor: circleColor }]} />
      <Text style={getStyles().text}>{title}</Text>
      <View style={{ flex: 1 }} />
      <Text style={getStyles().text}>{value}</Text>
    </View>
  );
}

export function AccountsStyled({
  assets,
  liabilities,
}: {
  assets: string;
  liabilities: string;
}): JSX.Element {
  return (
    <View>
      <CommonLine />
      <AccountsRow
        title={i18n.t("assets")}
        value={assets}
        circleColor="#07A35A"
      />
      <CommonLine />
      <AccountsRow
        title={i18n.t("liabilities")}
        value={liabilities}
        circleColor="#5AAAFA"
      />
      <CommonLine />
    </View>
  );
}
