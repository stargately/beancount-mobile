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
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#84CC16",
  ];
  return colors[Math.abs(hash) % colors.length];
};

// Helper function to format currency
const formatAmount = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return "";
  const absAmount = Math.abs(amount);
  const sign = amount >= 0 ? "+" : "-";
  return `${sign}$${absAmount.toFixed(2)}`;
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
    filterContainer: {
      flexDirection: "row",
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.black10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.black20,
    },
    filterButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: theme.black,
      fontWeight: "500",
    },
    filterButtonTextActive: {
      color: theme.white,
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

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  console.log("Journal query variables:", queryVariables);

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

  const journalEntries = useMemo(() => {
    const entries = data?.journalEntries?.data ?? [];
    console.log("Journal entries received:", entries.length, "entries");
    return entries;
  }, [data?.journalEntries?.data]);

  // Note: We use date-based pagination instead of cursor-based

  const loadMoreEntries = useCallback(async () => {
    console.log("loadMoreEntries called", {
      isLoadingMore,
      loading,
      entriesLength: journalEntries.length,
    });

    if (isLoadingMore || loading || !journalEntries.length) {
      console.log("loadMoreEntries blocked:", {
        isLoadingMore,
        loading,
        entriesLength: journalEntries.length,
      });
      return;
    }

    try {
      setIsLoadingMore(true);

      // Get the date of the last entry to use for pagination
      const lastEntry = journalEntries[journalEntries.length - 1];
      const lastEntryDate = lastEntry?.date;

      console.log("Loading more entries before date:", lastEntryDate);

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

          console.log("fetchMore updateQuery:", {
            prevDataLength: prevData.length,
            newDataLength: newData.length,
          });

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

          console.log("After deduplication:", {
            uniqueNewDataLength: uniqueNewData.length,
            totalAfterMerge: prevData.length + uniqueNewData.length,
          });

          return {
            ...prev,
            journalEntries: {
              ...fetchMoreResult.journalEntries,
              data: [...prevData, ...uniqueNewData], // Append new entries to existing ones
            },
          };
        },
      });
    } catch (err) {
      console.error("Error loading more entries:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, loading, journalEntries, fetchMore, searchQuery]);

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

  const renderFilterButton = (label: string, key: string) => {
    const isActive = activeFilter === key;
    return (
      <TouchableOpacity
        key={key}
        style={[styles.filterButton, isActive && styles.filterButtonActive]}
        onPress={() => setActiveFilter(isActive ? null : key)}
      >
        <Text
          style={[
            styles.filterButtonText,
            isActive && styles.filterButtonTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

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
        <TouchableOpacity style={{ marginLeft: 8 }}>
          <Ionicons name="options-outline" size={20} color={theme.black60} />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {renderFilterButton("Views", "views")}
        {renderFilterButton("Methods", "methods")}
        {renderFilterButton("Amount", "amount")}
      </View>
    </View>
  );

  const renderJournalEntry = (entry: JournalEntry) => {
    const displayName = entry.payee || entry.primaryAccount || "Unknown";
    const description = entry.narration || entry.entryType || "Transaction";
    const avatarInitials = getAvatarInitials(displayName);
    const avatarColor = getAvatarColor(displayName);
    const amount = entry.netAmount ?? null;
    const formattedAmount = formatAmount(amount);
    const isPositive = amount !== null && amount !== undefined && amount >= 0;

    return (
      <TouchableOpacity style={styles.entryContainer}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        </View>

        <View style={styles.entryContent}>
          <Text style={styles.entryTitle} numberOfLines={1}>
            {displayName}
          </Text>
          <Text style={styles.entrySubtitle} numberOfLines={1}>
            {description}
          </Text>
        </View>

        {formattedAmount && (
          <Text
            style={[
              styles.entryAmount,
              isPositive
                ? styles.entryAmountPositive
                : styles.entryAmountNegative,
            ]}
          >
            {formattedAmount}
          </Text>
        )}
      </TouchableOpacity>
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
