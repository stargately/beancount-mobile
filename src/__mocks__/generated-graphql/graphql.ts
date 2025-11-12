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

export type HomeChartsQuery = any;
export type AccountHierarchyQuery = any;
export const useLedgerMetaQuery = () => ({});
export const useHomeChartsQuery = () => ({});
export const useAccountHierarchyQuery = () => ({});
export const useAddEntriesMutation = () => [() => {}, {}];
export const useUpdateReportSubscribeMutation = () => [() => {}, {}];
export const useUserProfileQuery = () => ({});
