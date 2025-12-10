import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeStyle } from "@/common/hooks";
import { ColorTheme } from "@/types/theme-props";
import { useTranslations } from "@/common/hooks/use-translations";
import { getFieldWidth } from "./journal-config";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.white,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.black20,
    },
    dateCell: {
      fontSize: 14,
      fontFamily: "monospace",
      color: theme.black90,
      textAlign: "center",
      fontWeight: "600",
    },
    flagCell: {
      fontSize: 14,
      fontFamily: "monospace",
      color: theme.black90,
      textAlign: "center",
      fontWeight: "600",
    },
    descriptionCell: {
      flex: 1,
      fontSize: 14,
      color: theme.black90,
      marginLeft: 8,
      fontWeight: "600",
    },
  });

/**
 * Component for rendering the journal header with column labels
 * Uses journal-config.ts for width configuration
 */
export const JournalHeader = () => {
  const styles = useThemeStyle(getStyles);
  const { t } = useTranslations();

  const dateWidth = getFieldWidth("date");
  const flagWidth = getFieldWidth("flag");
  const descriptionWidth = getFieldWidth("description");

  return (
    <View style={styles.header}>
      <Text
        style={[
          styles.dateCell,
          typeof dateWidth === "number" ? { width: dateWidth } : {},
        ]}
      >
        {t("date")}
      </Text>
      <Text
        style={[
          styles.flagCell,
          typeof flagWidth === "number" ? { width: flagWidth } : {},
        ]}
      >
        F
      </Text>
      <Text
        style={[
          styles.descriptionCell,
          descriptionWidth === "flex" ? { flex: 1 } : {},
        ]}
      >
        {t("payee")} / {t("narration")}
      </Text>
    </View>
  );
};
