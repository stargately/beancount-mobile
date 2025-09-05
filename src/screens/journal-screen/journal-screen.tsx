import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { ColorTheme } from "@/types/theme-props";
import {
  useJournalEntriesQuery,
  JournalEntry,
} from "@/generated-graphql/graphql";

// Helper function to generate avatar from name
const getAvatarInitials = (name: string): string => {
  if (!name) return "?";
  const words = name.split(" ");
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

// Helper function to get deterministic color from string
const getAvatarColor = (name: string): string => {
  if (!name) return "#6B7280";

  // Normalize the name to ensure consistent hashing (lowercase, trimmed)
  const normalizedName = name.toLowerCase().trim();

  // Create a more robust hash function
  let hash = 0;
  for (let i = 0; i < normalizedName.length; i++) {
    const char = normalizedName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Expanded color palette for better variety
  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#14B8A6", // Teal
    "#A855F7", // Purple
  ];

  return colors[Math.abs(hash) % colors.length];
};

// Helper function to get account flow for transactions
const getAccountFlow = (postings: any[]): string => {
  if (!postings || postings.length === 0) return "";

  // Separate positive (debit) and negative (credit) postings
  const debits = postings.filter((p) => p.units?.number && p.units.number > 0);
  const credits = postings.filter((p) => p.units?.number && p.units.number < 0);

  // Format account names as TopLevel/LastSegment for brevity
  const formatAccount = (account: string) => {
    const parts = account.split(":");
    if (parts.length === 1) {
      return parts[0];
    } else if (parts.length === 2) {
      return parts.join("/");
    } else {
      // Show first part (Assets, Expenses, etc.) and last part
      return `${parts[0]}/${parts[parts.length - 1]}`;
    }
  };

  // Handle different cases
  if (debits.length === 1 && credits.length === 1) {
    // Simple transfer
    return `${formatAccount(debits[0].account)} ← ${formatAccount(credits[0].account)}`;
  } else if (debits.length > 1 && credits.length === 1) {
    // Split from one source
    if (debits.length === 2) {
      return `${debits.map((d) => formatAccount(d.account)).join(", ")} ← ${formatAccount(credits[0].account)}`;
    } else {
      return `${debits.length} accounts ← ${formatAccount(credits[0].account)}`;
    }
  } else if (debits.length === 1 && credits.length > 1) {
    // Multiple sources to one destination
    if (credits.length === 2) {
      return `${formatAccount(debits[0].account)} ← ${credits.map((c) => formatAccount(c.account)).join(", ")}`;
    } else {
      return `${formatAccount(debits[0].account)} ← ${credits.length} accounts`;
    }
  } else if (debits.length > 0 && credits.length > 0) {
    // Complex multi-leg transaction
    return `${debits.length} → ${credits.length} accounts`;
  } else {
    // Fallback
    return postings[0] ? formatAccount(postings[0].account) : "";
  }
};

// Helper function to calculate transaction amount
const getTransactionAmount = (postings: any[]): number => {
  if (!postings || postings.length === 0) return 0;

  // Sum all positive amounts (debits)
  const positiveSum = postings
    .filter((p) => p.units?.number && p.units.number > 0)
    .reduce((sum, p) => sum + (p.units?.number || 0), 0);

  // Sum all negative amounts (credits) - make it positive for display
  const negativeSum = Math.abs(
    postings
      .filter((p) => p.units?.number && p.units.number < 0)
      .reduce((sum, p) => sum + (p.units?.number || 0), 0),
  );

  // Return the non-zero sum (typically they should be equal in a balanced transaction)
  return positiveSum || negativeSum;
};

// Helper function to group entries by date
const groupEntriesByDate = (entries: JournalEntry[]) => {
  const groups: { [key: string]: JournalEntry[] } = {};
  entries.forEach((entry) => {
    const date = new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(entry);
  });
  return Object.entries(groups).sort(
    (a, b) =>
      new Date(b[1][0].date).getTime() - new Date(a[1][0].date).getTime(),
  );
};

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: theme.white,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.black,
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.black10,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 16,
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
      paddingHorizontal: 16,
      paddingVertical: 12,
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

  useEffect(() => {
    analytics.track("page_view_journal", {});
  }, []);

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

  // Flatten grouped entries for FlatList
  const flatListData = useMemo(() => {
    const items: Array<{
      type: "date" | "entry";
      date?: string;
      entry?: JournalEntry;
    }> = [];
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
      <Text style={styles.headerTitle}>Transactions</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.black60} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
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
      entry.payee || entry.narration || entry.account || "Unknown";
    const avatarInitials = getAvatarInitials(avatarSource);

    // Always use payee for color consistency, fallback to avatarSource if no payee
    const colorSource = entry.payee || avatarSource;
    const avatarColor = getAvatarColor(colorSource);

    // Format primary line based on entry type
    let primaryLine: string;
    if (entry.type === "Open" || entry.type === "Close") {
      // For Open/Close entries, show the type and account
      primaryLine = `${entry.type} Account`;
    } else if (entry.narration && entry.payee) {
      primaryLine = `${entry.payee} · ${entry.narration}`;
    } else {
      primaryLine =
        entry.narration || entry.payee || entry.type || "Transaction";
    }

    // Get account flow for secondary line
    let accountFlow: string;
    if (entry.account && !entry.postings?.length) {
      // For Open/Close entries without postings, show the account
      accountFlow = entry.account;
    } else {
      accountFlow = getAccountFlow(entry.postings || []);
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

  const renderListItem = ({ item }: { item: any }) => {
    if (item.type === "date") {
      return (
        <View style={styles.dateHeader}>
          <Text style={styles.dateHeaderText}>{item.date}</Text>
        </View>
      );
    }

    return renderJournalEntry(item.entry);
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
        Welcome to your Journal! 📔{"\n\n"}
        You don&apos;t have any journal entries yet.{"\n\n"}
        To get started:{"\n"}• Use the &quot;Add Transaction&quot; button to
        create entries{"\n"}• Upload beancount files through the web interface
        {"\n"}• Import existing accounting data{"\n\n"}
        Once you add some transactions, they&apos;ll appear here.
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
        Failed to load journal: {error?.message}
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
                <Text style={styles.loadingFooterText}>Loading more...</Text>
              </View>
            ) : !hasNextPage && journalEntries.length > 0 ? (
              <View style={styles.loadingFooter}>
                <Text style={styles.loadingFooterText}>No more entries</Text>
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
