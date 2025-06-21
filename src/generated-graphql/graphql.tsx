import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSONObject: { input: any; output: any; }
  BeanFilename: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  accountHierarchy: AccountHierarchyResponse;
  changed: ChangedResponse;
  charts: ChartsResponse;
  editorData: EditorDataResponse;
  featureFlags: Scalars['JSONObject']['output'];
  fetchCoinPrice: CoinPrice;
  /** is the server healthy? */
  health: Scalars['String']['output'];
  homeCharts: HomeChartsResponse;
  isPaid: IsPaidResponse;
  ledgerMeta: LedgerMetaResponse;
  /** get the ledger of the current user */
  ledgers?: Maybe<Array<Ledger>>;
  listOutboundIntegrations: ListOutboundIntegrationsResponse;
  paymentHistory: Array<Receipt>;
  /** get the user */
  userProfile?: Maybe<UserProfileResponse>;
};


export type QueryAccountHierarchyArgs = {
  userId: Scalars['String']['input'];
};


export type QueryChartsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFeatureFlagsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryHomeChartsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLedgerMetaArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLedgersArgs = {
  file?: InputMaybe<Scalars['BeanFilename']['input']>;
};


export type QueryUserProfileArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type AccountHierarchyResponse = {
  __typename?: 'AccountHierarchyResponse';
  data: Array<LabeledHierarchyItem>;
  success: Scalars['Boolean']['output'];
};

export type LabeledHierarchyItem = {
  __typename?: 'LabeledHierarchyItem';
  data: AccountBalance;
  label: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type AccountBalance = {
  __typename?: 'AccountBalance';
  account: Scalars['String']['output'];
  balance: Scalars['JSONObject']['output'];
  balance_children: Scalars['JSONObject']['output'];
  children: Array<AccountBalance>;
};

export type ChangedResponse = {
  __typename?: 'ChangedResponse';
  data: Scalars['Boolean']['output'];
  success: Scalars['Boolean']['output'];
};

export type ChartsResponse = {
  __typename?: 'ChartsResponse';
  data: Array<ChartItem>;
  success: Scalars['Boolean']['output'];
};

export type ChartItem = {
  __typename?: 'ChartItem';
  balance: Balance;
  budgets?: Maybe<Scalars['JSONObject']['output']>;
  date: Scalars['String']['output'];
};

export type Balance = {
  __typename?: 'Balance';
  USD?: Maybe<Scalars['Float']['output']>;
};

export type EditorDataResponse = {
  __typename?: 'EditorDataResponse';
  data: EditorData;
  success: Scalars['Boolean']['output'];
};

export type EditorData = {
  __typename?: 'EditorData';
  file_path: Scalars['String']['output'];
  sha256sum: Scalars['String']['output'];
  source: Scalars['String']['output'];
  sources: Array<Scalars['String']['output']>;
};

/** IOTX price information from coinmarketcap */
export type CoinPrice = {
  __typename?: 'CoinPrice';
  marketCapUsd: Scalars['String']['output'];
  priceUsd: Scalars['String']['output'];
};

export type HomeChartsResponse = {
  __typename?: 'HomeChartsResponse';
  data: Array<LabeledChartItem>;
  success: Scalars['Boolean']['output'];
};

export type LabeledChartItem = {
  __typename?: 'LabeledChartItem';
  data: Array<ChartItemV2>;
  label: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ChartItemV2 = {
  __typename?: 'ChartItemV2';
  balance: Scalars['JSONObject']['output'];
  budgets?: Maybe<Scalars['JSONObject']['output']>;
  date: Scalars['String']['output'];
};

export type IsPaidResponse = {
  __typename?: 'IsPaidResponse';
  isForcedToPay?: Maybe<Scalars['Boolean']['output']>;
  isPaid?: Maybe<Scalars['Boolean']['output']>;
};

export type LedgerMetaResponse = {
  __typename?: 'LedgerMetaResponse';
  data: LedgerMeta;
  success: Scalars['Boolean']['output'];
};

export type LedgerMeta = {
  __typename?: 'LedgerMeta';
  accounts: Array<Scalars['String']['output']>;
  currencies: Array<Scalars['String']['output']>;
  errors: Scalars['Float']['output'];
  options: Options;
};

export type Options = {
  __typename?: 'Options';
  name_assets: Scalars['String']['output'];
  name_equity: Scalars['String']['output'];
  name_expenses: Scalars['String']['output'];
  name_income: Scalars['String']['output'];
  name_liabilities: Scalars['String']['output'];
  operating_currency: Array<Scalars['String']['output']>;
};

export type Ledger = {
  __typename?: 'Ledger';
  file: Scalars['BeanFilename']['output'];
  ledgerId: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ListOutboundIntegrationsResponse = {
  __typename?: 'ListOutboundIntegrationsResponse';
  integrations?: Maybe<Array<OutboundIntegration>>;
};

export type OutboundIntegration = {
  __typename?: 'OutboundIntegration';
  id: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
};

export type Receipt = {
  __typename?: 'Receipt';
  _id?: Maybe<Scalars['String']['output']>;
  amount: Scalars['String']['output'];
  chargeId?: Maybe<Scalars['String']['output']>;
  createAt?: Maybe<Scalars['DateTime']['output']>;
  currency: Scalars['String']['output'];
  estimatedIotx?: Maybe<Scalars['Float']['output']>;
  fulfilledHash?: Maybe<Scalars['String']['output']>;
  paymentEmail: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserProfileResponse = {
  __typename?: 'UserProfileResponse';
  email: Scalars['String']['output'];
  emailReportStatus?: Maybe<ReportStatus>;
  id: Scalars['String']['output'];
  locale: Scalars['String']['output'];
};

/** The email report status */
export enum ReportStatus {
  Monthly = 'MONTHLY',
  Off = 'OFF',
  Weekly = 'WEEKLY'
}

export type Mutation = {
  __typename?: 'Mutation';
  addEntries: AddEntryResponse;
  addPushToken: Scalars['Boolean']['output'];
  createOutboundIntegration: CreateOutboundIntegrationResponse;
  /** delete file that belongs to the user. */
  deleteFile?: Maybe<DeleteFileResponse>;
  deleteOutboundIntegration: DeleteOutboundIntegrationResponse;
  /** rename file that belongs to the user. returns null if no file found. */
  renameFile?: Maybe<Ledger>;
  sendPushNotification: Scalars['Boolean']['output'];
  /** update or insert user report subscribe status */
  updateReportSubscribe?: Maybe<UpdateReportSubscribeResponse>;
  /** update or insert a ledger text */
  upsertLedger?: Maybe<Ledger>;
};


export type MutationAddEntriesArgs = {
  entriesInput: Array<EntryInput>;
};


export type MutationAddPushTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateOutboundIntegrationArgs = {
  byAuthorizationCode?: InputMaybe<ByAuthorizationCode>;
};


export type MutationDeleteFileArgs = {
  deleteFileRequest: DeleteFileRequest;
};


export type MutationDeleteOutboundIntegrationArgs = {
  byIntegration?: InputMaybe<DeleteOutboundIntegrationByIntegration>;
};


export type MutationRenameFileArgs = {
  renameFileRequest: RenameFileRequest;
};


export type MutationSendPushNotificationArgs = {
  data: Scalars['JSONObject']['input'];
  message: Scalars['String']['input'];
  pushToken: Scalars['String']['input'];
};


export type MutationUpdateReportSubscribeArgs = {
  status: ReportStatus;
  userId: Scalars['String']['input'];
};


export type MutationUpsertLedgerArgs = {
  file: Scalars['BeanFilename']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type EntryInput = {
  date: Scalars['String']['input'];
  flag: Scalars['String']['input'];
  meta: Scalars['JSONObject']['input'];
  narration: Scalars['String']['input'];
  payee: Scalars['String']['input'];
  postings: Array<PostingInput>;
  type: Scalars['String']['input'];
};

export type PostingInput = {
  account: Scalars['String']['input'];
  amount: Scalars['String']['input'];
};

export type AddEntryResponse = {
  __typename?: 'AddEntryResponse';
  data?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ByAuthorizationCode = {
  code: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
};

export type CreateOutboundIntegrationResponse = {
  __typename?: 'CreateOutboundIntegrationResponse';
  _: Scalars['Boolean']['output'];
};

export type DeleteFileRequest = {
  file: Scalars['BeanFilename']['input'];
  ledgerId: Scalars['String']['input'];
};

export type DeleteFileResponse = {
  __typename?: 'DeleteFileResponse';
  _id?: Maybe<Scalars['ID']['output']>;
};

export type DeleteOutboundIntegrationByIntegration = {
  integrationId: Scalars['String']['input'];
};

export type DeleteOutboundIntegrationResponse = {
  __typename?: 'DeleteOutboundIntegrationResponse';
  _: Scalars['Boolean']['output'];
};

export type RenameFileRequest = {
  from: Scalars['String']['input'];
  ledgerId: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type UpdateReportSubscribeResponse = {
  __typename?: 'UpdateReportSubscribeResponse';
  success: Scalars['Boolean']['output'];
};

export type AccountHierarchyQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type AccountHierarchyQuery = { __typename?: 'Query', accountHierarchy: { __typename?: 'AccountHierarchyResponse', success: boolean, data: Array<{ __typename?: 'LabeledHierarchyItem', type: string, label: string, data: { __typename?: 'AccountBalance', account: string, balance: any, balance_children: any, children: Array<{ __typename?: 'AccountBalance', account: string, balance: any, balance_children: any }> } }> } };

export type AddEntriesMutationVariables = Exact<{
  entriesInput: Array<EntryInput> | EntryInput;
}>;


export type AddEntriesMutation = { __typename?: 'Mutation', addEntries: { __typename?: 'AddEntryResponse', data?: string | null, success: boolean } };

export type AddPushTokenMutationVariables = Exact<{
  pushToken: Scalars['String']['input'];
}>;


export type AddPushTokenMutation = { __typename?: 'Mutation', addPushToken: boolean };

export type FeatureFlagsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FeatureFlagsQuery = { __typename?: 'Query', featureFlags: any };

export type HomeChartsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type HomeChartsQuery = { __typename?: 'Query', homeCharts: { __typename?: 'HomeChartsResponse', success: boolean, data: Array<{ __typename?: 'LabeledChartItem', type: string, label: string, data: Array<{ __typename?: 'ChartItemV2', date: string, balance: any, budgets?: any | null }> }> } };

export type LedgerMetaQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type LedgerMetaQuery = { __typename?: 'Query', ledgerMeta: { __typename?: 'LedgerMetaResponse', success: boolean, data: { __typename?: 'LedgerMeta', accounts: Array<string>, currencies: Array<string>, errors: number, options: { __typename?: 'Options', name_assets: string, name_equity: string, name_expenses: string, name_income: string, name_liabilities: string, operating_currency: Array<string> } } } };

export type UpdateReportSubscribeMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  status: ReportStatus;
}>;


export type UpdateReportSubscribeMutation = { __typename?: 'Mutation', updateReportSubscribe?: { __typename?: 'UpdateReportSubscribeResponse', success: boolean } | null };

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile?: { __typename?: 'UserProfileResponse', email: string, emailReportStatus?: ReportStatus | null } | null };


export const AccountHierarchyDocument = gql`
    query AccountHierarchy($userId: String!) {
  accountHierarchy(userId: $userId) {
    data {
      type
      label
      data {
        account
        balance
        balance_children
        children {
          account
          balance
          balance_children
        }
      }
    }
    success
  }
}
    `;

/**
 * __useAccountHierarchyQuery__
 *
 * To run a query within a React component, call `useAccountHierarchyQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountHierarchyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountHierarchyQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAccountHierarchyQuery(baseOptions: Apollo.QueryHookOptions<AccountHierarchyQuery, AccountHierarchyQueryVariables> & ({ variables: AccountHierarchyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountHierarchyQuery, AccountHierarchyQueryVariables>(AccountHierarchyDocument, options);
      }
export function useAccountHierarchyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountHierarchyQuery, AccountHierarchyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountHierarchyQuery, AccountHierarchyQueryVariables>(AccountHierarchyDocument, options);
        }
export function useAccountHierarchySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccountHierarchyQuery, AccountHierarchyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountHierarchyQuery, AccountHierarchyQueryVariables>(AccountHierarchyDocument, options);
        }
export type AccountHierarchyQueryHookResult = ReturnType<typeof useAccountHierarchyQuery>;
export type AccountHierarchyLazyQueryHookResult = ReturnType<typeof useAccountHierarchyLazyQuery>;
export type AccountHierarchySuspenseQueryHookResult = ReturnType<typeof useAccountHierarchySuspenseQuery>;
export type AccountHierarchyQueryResult = Apollo.QueryResult<AccountHierarchyQuery, AccountHierarchyQueryVariables>;
export const AddEntriesDocument = gql`
    mutation addEntries($entriesInput: [EntryInput!]!) {
  addEntries(entriesInput: $entriesInput) {
    data
    success
  }
}
    `;
export type AddEntriesMutationFn = Apollo.MutationFunction<AddEntriesMutation, AddEntriesMutationVariables>;

/**
 * __useAddEntriesMutation__
 *
 * To run a mutation, you first call `useAddEntriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEntriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEntriesMutation, { data, loading, error }] = useAddEntriesMutation({
 *   variables: {
 *      entriesInput: // value for 'entriesInput'
 *   },
 * });
 */
export function useAddEntriesMutation(baseOptions?: Apollo.MutationHookOptions<AddEntriesMutation, AddEntriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEntriesMutation, AddEntriesMutationVariables>(AddEntriesDocument, options);
      }
export type AddEntriesMutationHookResult = ReturnType<typeof useAddEntriesMutation>;
export type AddEntriesMutationResult = Apollo.MutationResult<AddEntriesMutation>;
export type AddEntriesMutationOptions = Apollo.BaseMutationOptions<AddEntriesMutation, AddEntriesMutationVariables>;
export const AddPushTokenDocument = gql`
    mutation addPushToken($pushToken: String!) {
  addPushToken(token: $pushToken)
}
    `;
export type AddPushTokenMutationFn = Apollo.MutationFunction<AddPushTokenMutation, AddPushTokenMutationVariables>;

/**
 * __useAddPushTokenMutation__
 *
 * To run a mutation, you first call `useAddPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPushTokenMutation, { data, loading, error }] = useAddPushTokenMutation({
 *   variables: {
 *      pushToken: // value for 'pushToken'
 *   },
 * });
 */
export function useAddPushTokenMutation(baseOptions?: Apollo.MutationHookOptions<AddPushTokenMutation, AddPushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPushTokenMutation, AddPushTokenMutationVariables>(AddPushTokenDocument, options);
      }
export type AddPushTokenMutationHookResult = ReturnType<typeof useAddPushTokenMutation>;
export type AddPushTokenMutationResult = Apollo.MutationResult<AddPushTokenMutation>;
export type AddPushTokenMutationOptions = Apollo.BaseMutationOptions<AddPushTokenMutation, AddPushTokenMutationVariables>;
export const FeatureFlagsDocument = gql`
    query FeatureFlags($userId: String!) {
  featureFlags(userId: $userId)
}
    `;

/**
 * __useFeatureFlagsQuery__
 *
 * To run a query within a React component, call `useFeatureFlagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeatureFlagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeatureFlagsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFeatureFlagsQuery(baseOptions: Apollo.QueryHookOptions<FeatureFlagsQuery, FeatureFlagsQueryVariables> & ({ variables: FeatureFlagsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeatureFlagsQuery, FeatureFlagsQueryVariables>(FeatureFlagsDocument, options);
      }
export function useFeatureFlagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeatureFlagsQuery, FeatureFlagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeatureFlagsQuery, FeatureFlagsQueryVariables>(FeatureFlagsDocument, options);
        }
export function useFeatureFlagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FeatureFlagsQuery, FeatureFlagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FeatureFlagsQuery, FeatureFlagsQueryVariables>(FeatureFlagsDocument, options);
        }
export type FeatureFlagsQueryHookResult = ReturnType<typeof useFeatureFlagsQuery>;
export type FeatureFlagsLazyQueryHookResult = ReturnType<typeof useFeatureFlagsLazyQuery>;
export type FeatureFlagsSuspenseQueryHookResult = ReturnType<typeof useFeatureFlagsSuspenseQuery>;
export type FeatureFlagsQueryResult = Apollo.QueryResult<FeatureFlagsQuery, FeatureFlagsQueryVariables>;
export const HomeChartsDocument = gql`
    query HomeCharts($userId: String!) {
  homeCharts(userId: $userId) {
    data {
      type
      label
      data {
        date
        balance
        budgets
      }
    }
    success
  }
}
    `;

/**
 * __useHomeChartsQuery__
 *
 * To run a query within a React component, call `useHomeChartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeChartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeChartsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHomeChartsQuery(baseOptions: Apollo.QueryHookOptions<HomeChartsQuery, HomeChartsQueryVariables> & ({ variables: HomeChartsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeChartsQuery, HomeChartsQueryVariables>(HomeChartsDocument, options);
      }
export function useHomeChartsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeChartsQuery, HomeChartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeChartsQuery, HomeChartsQueryVariables>(HomeChartsDocument, options);
        }
export function useHomeChartsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HomeChartsQuery, HomeChartsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HomeChartsQuery, HomeChartsQueryVariables>(HomeChartsDocument, options);
        }
export type HomeChartsQueryHookResult = ReturnType<typeof useHomeChartsQuery>;
export type HomeChartsLazyQueryHookResult = ReturnType<typeof useHomeChartsLazyQuery>;
export type HomeChartsSuspenseQueryHookResult = ReturnType<typeof useHomeChartsSuspenseQuery>;
export type HomeChartsQueryResult = Apollo.QueryResult<HomeChartsQuery, HomeChartsQueryVariables>;
export const LedgerMetaDocument = gql`
    query ledgerMeta($userId: String!) {
  ledgerMeta(userId: $userId) {
    data {
      accounts
      currencies
      errors
      options {
        name_assets
        name_equity
        name_expenses
        name_income
        name_liabilities
        operating_currency
      }
    }
    success
  }
}
    `;

/**
 * __useLedgerMetaQuery__
 *
 * To run a query within a React component, call `useLedgerMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useLedgerMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgerMetaQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLedgerMetaQuery(baseOptions: Apollo.QueryHookOptions<LedgerMetaQuery, LedgerMetaQueryVariables> & ({ variables: LedgerMetaQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LedgerMetaQuery, LedgerMetaQueryVariables>(LedgerMetaDocument, options);
      }
export function useLedgerMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LedgerMetaQuery, LedgerMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LedgerMetaQuery, LedgerMetaQueryVariables>(LedgerMetaDocument, options);
        }
export function useLedgerMetaSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LedgerMetaQuery, LedgerMetaQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LedgerMetaQuery, LedgerMetaQueryVariables>(LedgerMetaDocument, options);
        }
export type LedgerMetaQueryHookResult = ReturnType<typeof useLedgerMetaQuery>;
export type LedgerMetaLazyQueryHookResult = ReturnType<typeof useLedgerMetaLazyQuery>;
export type LedgerMetaSuspenseQueryHookResult = ReturnType<typeof useLedgerMetaSuspenseQuery>;
export type LedgerMetaQueryResult = Apollo.QueryResult<LedgerMetaQuery, LedgerMetaQueryVariables>;
export const UpdateReportSubscribeDocument = gql`
    mutation updateReportSubscribe($userId: String!, $status: ReportStatus!) {
  updateReportSubscribe(userId: $userId, status: $status) {
    success
  }
}
    `;
export type UpdateReportSubscribeMutationFn = Apollo.MutationFunction<UpdateReportSubscribeMutation, UpdateReportSubscribeMutationVariables>;

/**
 * __useUpdateReportSubscribeMutation__
 *
 * To run a mutation, you first call `useUpdateReportSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReportSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReportSubscribeMutation, { data, loading, error }] = useUpdateReportSubscribeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateReportSubscribeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReportSubscribeMutation, UpdateReportSubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReportSubscribeMutation, UpdateReportSubscribeMutationVariables>(UpdateReportSubscribeDocument, options);
      }
export type UpdateReportSubscribeMutationHookResult = ReturnType<typeof useUpdateReportSubscribeMutation>;
export type UpdateReportSubscribeMutationResult = Apollo.MutationResult<UpdateReportSubscribeMutation>;
export type UpdateReportSubscribeMutationOptions = Apollo.BaseMutationOptions<UpdateReportSubscribeMutation, UpdateReportSubscribeMutationVariables>;
export const UserProfileDocument = gql`
    query UserProfile($userId: String!) {
  userProfile(userId: $userId) {
    email
    emailReportStatus
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables> & ({ variables: UserProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export function useUserProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileSuspenseQueryHookResult = ReturnType<typeof useUserProfileSuspenseQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
