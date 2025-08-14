import React, { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { analytics } from "@/common/analytics";
import { useTheme } from "@/common/theme";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { ColorTheme } from "@/types/theme-props";
import { useQueryResultQuery } from "@/generated-graphql/graphql";

const JOURNAL_QUERY =
  "select date, payee, narration, account, position from entries order by date desc limit 100";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    text: {
      color: theme.black,
      fontFamily: "monospace",
      padding: 16,
    },
  });

export const JournalScreen = () => {
  const styles = useThemeStyle(getStyles);
  const theme = useTheme().colorTheme;
  const { data, loading, error, refetch } = useQueryResultQuery({
    variables: { queryString: JOURNAL_QUERY },
  });

  useEffect(() => {
    analytics.track("page_view_journal", {});
  }, []);

  const onRefresh = async () => {
    await analytics.track("tap_refresh", {});
    await refetch();
  };

  const journalText = data?.queryResult?.data?.table ?? "";

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        {loading && !journalText ? (
          <ActivityIndicator style={{ marginTop: 20 }} color={theme.primary} />
        ) : error ? (
          <Text style={styles.text}>Failed to load journal</Text>
        ) : (
          <Text style={styles.text}>{journalText}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
