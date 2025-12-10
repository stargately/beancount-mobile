import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeStyle } from "@/common/hooks";
import { ColorTheme } from "@/types/theme-props";
import { useTranslations } from "@/common/hooks/use-translations";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: theme.black60,
      textAlign: "center",
      lineHeight: 24,
    },
  });

/**
 * Component for rendering the empty state when there are no journal entries
 */
export const JournalEmptyState = () => {
  const styles = useThemeStyle(getStyles);
  const { t } = useTranslations();

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {t("journalWelcomeTitle")}
        {"\n\n"}
        {t("journalWelcomeMessage")}
        {"\n\n"}
        {t("journalWelcomeInstructions")}
        {"\n"}• {t("journalWelcomeInstruction1")}
        {"\n"}• {t("journalWelcomeInstruction2")}
        {"\n"}• {t("journalWelcomeInstruction3")}
        {"\n\n"}
        {t("journalWelcomeInstructionFinal")}
      </Text>
    </View>
  );
};
