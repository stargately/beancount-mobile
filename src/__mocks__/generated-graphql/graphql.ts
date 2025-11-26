// Mock for generated GraphQL types and hooks
export type LedgerMeta = {
  accounts: string[];
  currencies: string[];
  errors: number;
  options: {
    name_assets: string;
    name_expenses: string;
    name_income: string;
    name_liabilities: string;
    name_equity: string;
    operating_currency: string[];
  };
};

// Balance type represents a currency-keyed object of amounts
export type Balance = Record<string, number>;

// ChartItemV2 type for chart data points
export type ChartItemV2 = {
  __typename?: "ChartItemV2";
  date: string;
  balance: Balance;
  budgets?: Balance | null;
};

// LabeledChartItem type for labeled chart data
export type LabeledChartItem = {
  __typename?: "LabeledChartItem";
  type: string;
  label: string;
  data: ChartItemV2[];
};

// HomeChartsResponse type for the home charts response
export type HomeChartsResponse = {
  __typename?: "HomeChartsResponse";
  success: boolean;
  data: LabeledChartItem[];
};

// HomeChartsQuery type - the full query response
export type HomeChartsQuery = {
  __typename?: "Query";
  homeCharts: HomeChartsResponse;
};

// AccountBalance type for account hierarchy data
export type AccountBalance = {
  __typename?: "AccountBalance";
  account: string;
  balance: Balance;
  balance_children: Balance;
  children: AccountBalance[];
};

// LabeledHierarchyItem type for labeled hierarchy data
export type LabeledHierarchyItem = {
  __typename?: "LabeledHierarchyItem";
  type: string;
  label: string;
  data: AccountBalance;
};

// AccountHierarchyResponse type for the account hierarchy response
export type AccountHierarchyResponse = {
  __typename?: "AccountHierarchyResponse";
  success: boolean;
  data: LabeledHierarchyItem[];
};

// AccountHierarchyQuery type - the full query response
export type AccountHierarchyQuery = {
  __typename?: "Query";
  accountHierarchy: AccountHierarchyResponse;
};

export const useLedgerMetaQuery = () => ({});
export const useHomeChartsQuery = () => ({});
export const useAccountHierarchyQuery = () => ({});
export const useAddEntriesMutation = () => [() => {}, {}];
export const useUpdateReportSubscribeMutation = () => [() => {}, {}];
export const useUserProfileQuery = () => ({});
