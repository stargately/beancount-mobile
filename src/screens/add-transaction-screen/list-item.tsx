import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/common/theme";
import { Ionicons } from "@expo/vector-icons";
import { ColorTheme } from "@/types/theme-props";
import { useThemeStyle } from "@/common/hooks/use-theme-style";

type ListItemProps = {
  onPress?: () => void;
  title: string;
  content?: string;
};

const ListDivider = () => {
  const styles = useThemeStyle((theme: ColorTheme) =>
    StyleSheet.create({
      divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.black20,
        width: "100%",
      },
    }),
  );
  return <View style={styles.divider} />;
};

export const ListItem = ({ onPress, title, content }: ListItemProps) => {
  const theme = useTheme().colorTheme;
  const styles = useThemeStyle((theme: ColorTheme) =>
    StyleSheet.create({
      container: {
        backgroundColor: theme.white,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      title: {
        fontSize: 14,
        color: theme.black80,
      },
      content: {
        fontSize: 20,
        color: theme.black,
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={theme.black20} />
    </TouchableOpacity>
  );
};

export const List = ({ children }: { children: React.ReactNode }) => {
  const styles = useThemeStyle((theme: ColorTheme) =>
    StyleSheet.create({
      container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.black20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.black20,
      },
    }),
  );

  // Convert children to array and add dividers between ListItem components
  const childrenArray = React.Children.toArray(children);
  const itemsWithDividers: React.ReactNode[] = [];

  childrenArray.forEach((child, index) => {
    // Add the child
    itemsWithDividers.push(child);

    // Add divider after each child except the last one
    if (index < childrenArray.length - 1) {
      itemsWithDividers.push(<ListDivider key={`divider-${index}`} />);
    }
  });

  return <View style={styles.container}>{itemsWithDividers}</View>;
};
