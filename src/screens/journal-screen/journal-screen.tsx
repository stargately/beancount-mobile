import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { analytics } from "@/common/analytics";
import { useTheme } from "@/common/theme";
import { useThemeStyle, usePageView } from "@/common/hooks";
import { useTranslations } from "@/common/hooks/use-translations";
import { ColorTheme } from "@/types/theme-props";
import {
  useJournalEntriesQuery,
  JournalEntry,
} from "@/generated-graphql/graphql";
import {
  getAvatarInitials,
  getAvatarColor,
  getAccountFlow,
  getTransactionAmount,
  groupEntriesByDate,
} from "./utils/journal-utils";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.white,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.black,
      marginBottom: 12,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.black10,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.black,
      marginLeft: 8,
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
    entryContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.white,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.black10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    avatarText: {
      color: "white",
      fontSize: 14,
      fontWeight: "600",
    },
    entryContent: {
      flex: 1,
      marginRight: 12,
    },
    entryTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.black,
      marginBottom: 2,
    },
    entrySubtitle: {
      fontSize: 14,
      color: theme.black60,
    },
    entryAmount: {
      fontSize: 16,
      fontWeight: "600",
      minWidth: 80,
      textAlign: "right",
    },
    entryAmountPositive: {
      color: "#10B981",
    },
    entryAmountNegative: {
      color: "#EF4444",
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
  });

export const JournalScreen = () => {
  const styles = useThemeStyle(getStyles);
  const theme = useTheme().colorTheme;
  const { t } = useTranslations();
  usePageView("journal");

  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  // State for pagination
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Note: No date restrictions initially - load most recent entries first

  const queryVariables = {
    first: 100, // Load 100 entries initially
    // Don't limit by year initially - just get the most recent 100 entries
    detailed: false, // Basic entry data
    searchQuery: searchQuery.trim() || undefined, // Only send if not empty
    sortBy: "date",
    sortOrder: "desc",
  };

  const { data, loading, error, refetch, fetchMore } = useJournalEntriesQuery({
    variables: queryVariables,
    notifyOnNetworkStatusChange: false, // Reduce flickering by not notifying on network status
  });

  const onRefresh = async () => {
    await analytics.track("tap_refresh", {});
    await refetch();
  };

  const journalEntries = useMemo(
    () => data?.journalEntries?.data ?? [],
    [data?.journalEntries?.data],
  );

  const hasNextPage = data?.journalEntries?.pageInfo?.hasNextPage ?? true;

  // Note: We use date-based pagination instead of cursor-based

  const loadMoreEntries = useCallback(async () => {
    if (isLoadingMore || loading || !journalEntries.length || !hasNextPage) {
      return;
    }

    try {
      setIsLoadingMore(true);

      // Get the date of the last entry to use for pagination
      const lastEntry = journalEntries[journalEntries.length - 1];
      const lastEntryDate = lastEntry?.date;

      if (!lastEntryDate) return;

      // Use date-based pagination: fetch entries older than the last entry's date
      await fetchMore({
        variables: {
          before: lastEntryDate, // Entries before the last entry's date
          // Don't set 'after' constraint for pagination - we want to go back in time
          first: 100, // Load 100 more entries
          searchQuery: searchQuery.trim() || undefined,
          sortBy: "date",
          sortOrder: "desc",
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newData = fetchMoreResult.journalEntries?.data || [];
          const prevData = prev.journalEntries?.data || [];

          // Filter out duplicates based on date + narration + payee
          const existingEntries = new Set(
            prevData.map(
              (entry) => `${entry.date}-${entry.narration}-${entry.payee}`,
            ),
          );

          const uniqueNewData = newData.filter(
            (entry) =>
              !existingEntries.has(
                `${entry.date}-${entry.narration}-${entry.payee}`,
              ),
          );

          // If no new unique data was found, mark hasNextPage as false
          // This handles cases where the server thinks there might be more
          // but subsequent requests return duplicate/empty results
          const fetchMorePageInfo = fetchMoreResult.journalEntries?.pageInfo;
          const hasNoNewData = uniqueNewData.length === 0;

          // Debug logging for pagination issues
          if (hasNoNewData) {
            console.log(
              "Pagination: No new unique data found, setting hasNextPage to false",
              {
                newDataLength: newData.length,
                uniqueNewDataLength: uniqueNewData.length,
                serverHasNextPage: fetchMorePageInfo?.hasNextPage,
              },
            );
          }

          const updatedPageInfo = {
            hasNextPage: hasNoNewData
              ? false
              : (fetchMorePageInfo?.hasNextPage ?? false),
            hasPreviousPage: fetchMorePageInfo?.hasPreviousPage ?? false,
            startCursor: fetchMorePageInfo?.startCursor ?? "",
            endCursor: fetchMorePageInfo?.endCursor ?? "",
            totalCount: fetchMorePageInfo?.totalCount ?? 0,
          };

          return {
            ...prev,
            journalEntries: {
              ...prev.journalEntries,
              data: [...prevData, ...uniqueNewData], // Append new entries to existing ones
              success:
                fetchMoreResult.journalEntries?.success ??
                prev.journalEntries?.success ??
                true, // Preserve success field
              // Use the updated pageInfo that accounts for duplicate filtering
              pageInfo: updatedPageInfo ||
                prev.journalEntries?.pageInfo || {
                  hasNextPage: false,
                  hasPreviousPage: false,
                  startCursor: "",
                  endCursor: "",
                  totalCount: 0,
                },
            },
          };
        },
      });
    } catch (err) {
      console.error("Error loading more entries:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    isLoadingMore,
    loading,
    journalEntries,
    fetchMore,
    searchQuery,
    hasNextPage,
  ]);

  // Group entries by date for display
  const groupedEntries = useMemo(
    () => groupEntriesByDate(journalEntries),
    [journalEntries],
  );

  // Type for flat list items
  type FlatListItem = {
    type: "date" | "entry";
    date?: string;
    entry?: JournalEntry;
  };

  // Flatten grouped entries for FlatList
  const flatListData = useMemo(() => {
    const items: FlatListItem[] = [];
    groupedEntries.forEach(([dateString, entries]) => {
      items.push({ type: "date", date: dateString });
      entries.forEach((entry) => {
        items.push({ type: "entry", entry });
      });
    });
    return items;
  }, [groupedEntries]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{t("transactions")}</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.black60} />
        <TextInput
          style={styles.searchInput}
          placeholder={t("search")}
          placeholderTextColor={theme.black60}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={theme.black60} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderJournalEntry = (entry: JournalEntry) => {
    // Use payee for avatar if available, otherwise use narration or account name
    const avatarSource =
      entry.payee || entry.narration || entry.account || t("unknown");
    const avatarInitials = getAvatarInitials(avatarSource);

    // Always use payee for color consistency, fallback to avatarSource if no payee
    const colorSource = entry.payee || avatarSource;
    const avatarColor = getAvatarColor(colorSource);

    // Format primary line based on entry type
    let primaryLine: string;
    if (entry.type === "Open" || entry.type === "Close") {
      // For Open/Close entries, show the type and account
      primaryLine =
        entry.type === "Open" ? t("openAccount") : t("closeAccount");
    } else if (entry.narration && entry.payee) {
      primaryLine = `${entry.payee} · ${entry.narration}`;
    } else {
      primaryLine =
        entry.narration || entry.payee || entry.type || t("transaction");
    }

    // Get account flow for secondary line
    let accountFlow: string;
    if (entry.account && !entry.postings?.length) {
      // For Open/Close entries without postings, show the account
      accountFlow = entry.account;
    } else {
      accountFlow = getAccountFlow(entry.postings || [], t);
    }

    // Calculate the transaction amount
    const amount = getTransactionAmount(entry.postings || []);

    // Determine if this is likely an expense (positive in expense accounts)
    const isExpense = entry.postings?.some(
      (p) =>
        p.account.startsWith("Expenses") &&
        p.units?.number &&
        p.units.number > 0,
    );

    // Format amount with appropriate sign
    const formattedAmount =
      amount > 0 ? `${isExpense ? "-" : "+"}$${amount.toFixed(2)}` : "";

    return (
      <View style={styles.entryContainer}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        </View>

        <View style={styles.entryContent}>
          <Text style={styles.entryTitle} numberOfLines={1}>
            {primaryLine}
          </Text>
          <Text style={styles.entrySubtitle} numberOfLines={1}>
            {accountFlow}
          </Text>
        </View>

        {formattedAmount && (
          <Text
            style={[
              styles.entryAmount,
              isExpense
                ? styles.entryAmountNegative
                : styles.entryAmountPositive,
            ]}
          >
            {formattedAmount}
          </Text>
        )}
      </View>
    );
  };

  const renderListItem = ({ item }: { item: FlatListItem }) => {
    if (item.type === "date") {
      return (
        <View style={styles.dateHeader}>
          <Text style={styles.dateHeaderText}>{item.date}</Text>
        </View>
      );
    }

    if (item.entry) {
      return renderJournalEntry(item.entry);
    }

    return null;
  };

  const renderEmptyState = () => (
    <ScrollView
      style={styles.list}
      contentContainerStyle={styles.emptyContainer}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={theme.primary}
        />
      }
      showsVerticalScrollIndicator={false}
    >
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
    </ScrollView>
  );

  const renderErrorState = () => (
    <ScrollView
      style={styles.list}
      contentContainerStyle={styles.errorContainer}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor={theme.primary}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.errorText}>
        {t("journalLoadError")}
        {error?.message}
      </Text>
    </ScrollView>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {renderHeader()}

      {loading && !journalEntries.length ? (
        renderLoadingState()
      ) : error ? (
        renderErrorState()
      ) : flatListData.length > 0 ? (
        <FlatList
          style={styles.list}
          data={flatListData}
          renderItem={renderListItem}
          keyExtractor={(item, index) =>
            item.type === "date" ? `date-${item.date}` : `entry-${index}`
          }
          refreshControl={
            <RefreshControl
              refreshing={
                loading && !isLoadingMore && journalEntries.length === 0
              }
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
          onEndReached={loadMoreEntries}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={10}
          ListFooterComponent={
            isLoadingMore && journalEntries.length > 0 ? (
              <View style={styles.loadingFooter}>
                <ActivityIndicator color={theme.primary} />
                <Text style={styles.loadingFooterText}>{t("loadingMore")}</Text>
              </View>
            ) : !hasNextPage && journalEntries.length > 0 ? (
              <View style={styles.loadingFooter}>
                <Text style={styles.loadingFooterText}>
                  {t("noMoreEntries")}
                </Text>
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};
