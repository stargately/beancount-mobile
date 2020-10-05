import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { contentPadding } from "@/common/screen-util";
import { theme } from "@/common/theme";

type ContactRowProps = {
  name: string;
  emailOrNumber: string;
  onPress: () => void;
  selected: boolean;
};

const styles = () =>
  StyleSheet.create({
    rowContainer: {
      paddingHorizontal: contentPadding,
      paddingVertical: contentPadding * 0.5,
      flexDirection: "row",
      alignItems: "center",
    },
    name: { color: theme.text01, fontSize: 16, fontWeight: "500" },
    emailOrNum: { marginTop: 4, color: theme.black80, fontSize: 14 },
  });

export function ContactRow({
  onPress,
  name,
  emailOrNumber,
  selected,
}: ContactRowProps): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles().rowContainer}>
        <Text style={{ marginRight: contentPadding }}>
          {selected ? "✅" : "⭕️"}
        </Text>
        <View style={{ flex: 1 }}>
          <Text style={styles().name}>{name || emailOrNumber}</Text>
          {name.length > 0 && (
            <Text style={styles().emailOrNum}> {emailOrNumber} </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
