import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/common/theme";

type ListItemHorizontalProps = {
  onPress?: () => void;
  title: string | React.ReactNode;
  description?: string;
  content?: string | React.ReactNode;
};

export const ListItemHorizontal = ({
  onPress,
  title,
  content,
  description,
}: ListItemHorizontalProps) => {
  const styles = useThemeStyle((theme: ColorTheme) =>
    StyleSheet.create({
      container: {
        backgroundColor: theme.white,
        paddingVertical: 8,
        // paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 44,
      },
      title: {
        fontSize: 16,
        color: theme.black90,
      },
      description: {
        fontSize: 14,
        color: theme.black80,
        marginTop: 4,
      },
    }),
  );
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View>
        {typeof title === "string" ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <View>{title}</View>
        )}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>
      <View>{content}</View>
    </TouchableOpacity>
  );
};

export const ItemDescription = ({ text }: { text: string }) => {
  const theme = useTheme().colorTheme;
  const styles = useThemeStyle((theme: ColorTheme) =>
    StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
      },
      text: {
        fontSize: 16,
        color: theme.black80,
      },
    }),
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Ionicons name="chevron-forward" size={24} color={theme.black80} />
    </View>
  );
};
