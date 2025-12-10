import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStyle } from "@/common/hooks";
import { ColorTheme } from "@/types/theme-props";
import { JournalItemDate } from "./journal-item-date";
import { JournalItemFlag } from "./journal-item-flag";
import { JournalItemDescription } from "./journal-item-description";
import { JournalDirectiveType } from "../types";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    entryContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.white,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.black10,
    },
  });

interface JournalEntryItemProps {
  entry: JournalDirectiveType;
}

/**
 * Component for rendering a single journal entry row
 */
export const JournalEntryItem: React.FC<JournalEntryItemProps> = ({
  entry,
}) => {
  const styles = useThemeStyle(getStyles);

  return (
    <View style={styles.entryContainer}>
      <JournalItemDate date={entry.date} />
      <JournalItemFlag entry={entry} />
      <JournalItemDescription entry={entry} />
    </View>
  );
};
