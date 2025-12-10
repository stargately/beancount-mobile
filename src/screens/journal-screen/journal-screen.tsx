import React, { useMemo, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { analytics } from "@/common/analytics";
import { useTheme } from "@/common/theme";
import { useThemeStyle, usePageView } from "@/common/hooks";
import { useTranslations } from "@/common/hooks/use-translations";
import { ColorTheme } from "@/types/theme-props";
import { NetworkStatus } from "@apollo/client";
import {
  useListLedgersQuery,
  useGetLedgerJournalQuery,
} from "@/generated-graphql/graphql";
import { JournalHeader } from "./journal-header";
import { JournalEntryItem } from "./journal-entry-item";
import { JournalEmptyState } from "./journal-empty-state";
import { JournalDirectiveType } from "./types";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.black,
      marginBottom: 12,
    },
    list: {
      flex: 1,
    },
    dateHeader: {
      backgroundColor: theme.black10,
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    dateHeaderText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.black60,
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
    errorContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      paddingVertical: 40,
    },
    errorText: {
      fontSize: 16,
      color: theme.black60,
      textAlign: "center",
      lineHeight: 24,
    },
    loadingFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
      gap: 8,
    },
    loadingFooterText: {
      fontSize: 14,
      color: theme.black60,
    },
    itemSeparator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.black10,
    },
  });

const JournalList = ({ ledgerId }: { ledgerId: string }) => {
  const styles = useThemeStyle(getStyles);
  const theme = useTheme().colorTheme;
  const { t } = useTranslations();

  usePageView("journal");

  const limit = 20;

  // Use GetLedgerJournal query with Apollo Client's native infinite scroll support
  const { data, loading, error, refetch, fetchMore, networkStatus } =
    useGetLedgerJournalQuery({
      variables: {
        ledgerId: ledgerId!,
        query: {
          offset: 0,
          limit,
        },
      },
      skip: !ledgerId,
      notifyOnNetworkStatusChange: true,
    });

  // Get total count (same as web dashboard)
  const rawTotal = data?.getLedgerJournal.total;
  const total = typeof rawTotal === "number" ? rawTotal : 0;

  // Extract journal entries from Apollo cache (merged by updateQuery)
  const journalEntries = useMemo(
    () =>
      (data?.getLedgerJournal.data || []) as unknown as JournalDirectiveType[],
    [data?.getLedgerJournal.data],
  );

  // Check if we have more data to load
  const hasMore = journalEntries.length < total;
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;

  // Load more entries using Apollo's native fetchMore with updateQuery
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || loading || !ledgerId) {
      return;
    }

    try {
      await fetchMore({
        variables: {
          ledgerId: ledgerId,
          query: {
            offset: journalEntries.length,
            limit,
          },
        },
        // Apollo Client's native way to merge paginated data
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.getLedgerJournal?.data) {
            return prev;
          }

          const prevData = prev.getLedgerJournal.data || [];
          const newData = fetchMoreResult.getLedgerJournal.data || [];

          return {
            ...prev,
            getLedgerJournal: {
              ...prev.getLedgerJournal,
              data: [...prevData, ...newData],
              total: fetchMoreResult.getLedgerJournal.total,
            },
          };
        },
      });
    } catch (err) {
      console.error("Error loading more entries:", err);
    }
  }, [
    isLoadingMore,
    hasMore,
    loading,
    ledgerId,
    journalEntries.length,
    limit,
    fetchMore,
  ]);

  const onRefresh = async () => {
    await analytics.track("tap_refresh", {});
    await refetch();
  };

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        {t("journalLoadError")}
        {error?.message}
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );

  // Determine what to show in the FlatList
  const listData = error
    ? [] // Show error in ListEmptyComponent
    : loading && !journalEntries.length
      ? [] // Show loading in ListEmptyComponent
      : journalEntries;

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* Fixed header with column labels */}
      {/* <JournalHeader /> */}

      {/* Journal entries list */}
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<JournalHeader />}
        style={styles.list}
        data={listData}
        renderItem={({ item }) => <JournalEntryItem entry={item} />}
        keyExtractor={(item, index) =>
          `${item.date}-${item.directive_type}-${index}`
        }
        refreshControl={
          <RefreshControl
            refreshing={loading && journalEntries.length === 0}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        ListEmptyComponent={
          loading && !journalEntries.length
            ? renderLoadingState
            : error
              ? renderErrorState
              : JournalEmptyState
        }
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={
          isLoadingMore || (loading && journalEntries.length > 0) ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator color={theme.primary} />
              <Text style={styles.loadingFooterText}>{t("loadingMore")}</Text>
            </View>
          ) : !hasMore && journalEntries.length > 0 ? (
            <View style={styles.loadingFooter}>
              <Text style={styles.loadingFooterText}>{t("noMoreEntries")}</Text>
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export const JournalScreen = () => {
  const { data: ledgersData, loading: ledgersLoading } = useListLedgersQuery();
  const ledgerId = useMemo(
    () => ledgersData?.listLedgers?.[0]?.id || null,
    [ledgersData?.listLedgers],
  );

  if (ledgersLoading) {
    return <ActivityIndicator size="large" />;
  }

  return <JournalList ledgerId={ledgerId!} />;
};
