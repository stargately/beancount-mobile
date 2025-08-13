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
  /** Get account balance tree */
  accountBalances: AccountBalancesResponse;
  accountHierarchy: AccountHierarchyResponse;
  changed: ChangedResponse;
  charts: ChartsResponse;
  /** Get context for a specific entry */
  context: ContextResponse;
  editorData: EditorDataResponse;
  /** Extract entries using the ingest framework */
  extract: ExtractResponse;
  /** Check if the Fava service is healthy */
  favaHealth: HealthResponse;
  featureFlags: Scalars['JSONObject']['output'];
  /** is the server healthy? */
  health: Scalars['String']['output'];
  homeCharts: HomeChartsResponse;
  isPaid: IsPaidResponse;
  ledgerMeta: LedgerMetaResponse;
  /** get the ledger of the current user */
  ledgers?: Maybe<Array<Ledger>>;
  listOutboundIntegrations: ListOutboundIntegrationsResponse;
  /** Get ranked accounts for a given payee */
  payeeAccounts: PayeeAccountsResponse;
  /** Get the last transaction for a given payee */
  payeeTransaction: PayeeTransactionResponse;
  paymentHistory: Array<Receipt>;
  /** Execute a Beancount query and get results */
  queryResult: QueryResultResponse;
  subscriptionStatus: CustomerSubscriptionStatus;
  /** get the user */
  userProfile?: Maybe<UserProfileResponse>;
};


export type QueryAccountHierarchyArgs = {
  userId: Scalars['String']['input'];
};


export type QueryChartsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryContextArgs = {
  entryHash: Scalars['String']['input'];
};


export type QueryExtractArgs = {
  filename: Scalars['String']['input'];
  importer: Scalars['String']['input'];
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


export type QueryPayeeAccountsArgs = {
  payee: Scalars['String']['input'];
};


export type QueryPayeeTransactionArgs = {
  payee: Scalars['String']['input'];
};


export type QueryQueryResultArgs = {
  queryString: Scalars['String']['input'];
};


export type QueryUserProfileArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type AccountBalancesResponse = {
  __typename?: 'AccountBalancesResponse';
  data: TreeNode;
  success: Scalars['Boolean']['output'];
};

export type TreeNode = {
  __typename?: 'TreeNode';
  account: Scalars['String']['output'];
  balance: Scalars['JSONObject']['output'];
  balance_children: Scalars['JSONObject']['output'];
  children: Array<TreeNode>;
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

export type ContextResponse = {
  __typename?: 'ContextResponse';
  data: Context;
  success: Scalars['Boolean']['output'];
};

export type Context = {
  __typename?: 'Context';
  content: Scalars['String']['output'];
  sha256sum: Scalars['String']['output'];
  slice: Array<Scalars['Int']['output']>;
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

export type ExtractResponse = {
  __typename?: 'ExtractResponse';
  data: Array<Scalars['JSONObject']['output']>;
  success: Scalars['Boolean']['output'];
};

export type HealthResponse = {
  __typename?: 'HealthResponse';
  data: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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

export type PayeeAccountsResponse = {
  __typename?: 'PayeeAccountsResponse';
  data: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type PayeeTransactionResponse = {
  __typename?: 'PayeeTransactionResponse';
  data: Scalars['JSONObject']['output'];
  success: Scalars['Boolean']['output'];
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

export type QueryResultResponse = {
  __typename?: 'QueryResultResponse';
  data: QueryResult;
  success: Scalars['Boolean']['output'];
};

export type QueryResult = {
  __typename?: 'QueryResult';
  chart?: Maybe<Scalars['JSONObject']['output']>;
  table: Scalars['String']['output'];
};

export type CustomerSubscriptionStatus = {
  __typename?: 'CustomerSubscriptionStatus';
  hasActiveSubscription: Scalars['Boolean']['output'];
  subscriptions: Array<Subscription>;
};

export type Subscription = {
  __typename?: 'Subscription';
  cancelAt?: Maybe<Scalars['DateTime']['output']>;
  cancelAtPeriodEnd: Scalars['Boolean']['output'];
  canceledAt?: Maybe<Scalars['DateTime']['output']>;
  clientId: Scalars['String']['output'];
  currentPeriodEnd: Scalars['DateTime']['output'];
  currentPeriodStart: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<SubscriptionItem>;
  status: Scalars['String']['output'];
};

export type SubscriptionItem = {
  __typename?: 'SubscriptionItem';
  id: Scalars['ID']['output'];
  price: SubscriptionPrice;
  product?: Maybe<SubscriptionProduct>;
  quantity: Scalars['Float']['output'];
};

export type SubscriptionPrice = {
  __typename?: 'SubscriptionPrice';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  interval: Scalars['String']['output'];
  intervalCount?: Maybe<Scalars['Float']['output']>;
  trialPeriodDays?: Maybe<Scalars['Float']['output']>;
};

export type SubscriptionProduct = {
  __typename?: 'SubscriptionProduct';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
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
  /** Attach a document to an entry */
  attachDocument: DocumentOperationResponse;
  cancelSubscription: SubscriptionActionResult;
  /** Create or rename a file */
  createOrRenameFile: FileOperationResponse;
  createOutboundIntegration: CreateOutboundIntegrationResponse;
  createSubscriptionSession: SubscriptionSessionResult;
  /** Delete a document */
  deleteDocument: DocumentOperationResponse;
  /** Delete a Fava file */
  deleteFavaFile: FileOperationResponse;
  /** delete file that belongs to the user. */
  deleteFile?: Maybe<DeleteFileResponse>;
  deleteOutboundIntegration: DeleteOutboundIntegrationResponse;
  /** Format beancount source code */
  formatSource: SourceUpdateResponse;
  /** Move a document file to a different account */
  moveDocument: MoveResponse;
  /** rename file that belongs to the user. returns null if no file found. */
  renameFile?: Maybe<Ledger>;
  sendPushNotification: Scalars['Boolean']['output'];
  /** update or insert user report subscribe status */
  updateReportSubscribe?: Maybe<UpdateReportSubscribeResponse>;
  /** Update source file content */
  updateSource: SourceUpdateResponse;
  /** Update entry source slice */
  updateSourceSlice: SourceUpdateResponse;
  /** update or insert a ledger text */
  upsertLedger?: Maybe<Ledger>;
};


export type MutationAddEntriesArgs = {
  entriesInput: Array<EntryInput>;
};


export type MutationAddPushTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationAttachDocumentArgs = {
  attachInput: AttachDocumentInput;
};


export type MutationCancelSubscriptionArgs = {
  clientId: Scalars['String']['input'];
  subscriptionId: Scalars['String']['input'];
};


export type MutationCreateOrRenameFileArgs = {
  fileInput: CreateOrRenameFileInput;
};


export type MutationCreateOutboundIntegrationArgs = {
  byAuthorizationCode?: InputMaybe<ByAuthorizationCode>;
};


export type MutationCreateSubscriptionSessionArgs = {
  clientId: Scalars['String']['input'];
  priceId: Scalars['String']['input'];
};


export type MutationDeleteDocumentArgs = {
  filename: Scalars['String']['input'];
};


export type MutationDeleteFavaFileArgs = {
  deleteInput: DeleteFavaFileInput;
};


export type MutationDeleteFileArgs = {
  deleteFileRequest: DeleteFileRequest;
};


export type MutationDeleteOutboundIntegrationArgs = {
  byIntegration?: InputMaybe<DeleteOutboundIntegrationByIntegration>;
};


export type MutationFormatSourceArgs = {
  source: Scalars['String']['input'];
};


export type MutationMoveDocumentArgs = {
  moveInput: MoveDocumentInput;
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


export type MutationUpdateSourceArgs = {
  sourceInput: SourceInput;
};


export type MutationUpdateSourceSliceArgs = {
  sourceSliceInput: SourceSliceInput;
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

export type AttachDocumentInput = {
  entry_hash: Scalars['String']['input'];
  filename: Scalars['String']['input'];
};

export type DocumentOperationResponse = {
  __typename?: 'DocumentOperationResponse';
  data: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SubscriptionActionResult = {
  __typename?: 'SubscriptionActionResult';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateOrRenameFileInput = {
  ledger_id: Scalars['String']['input'];
  new_file: Scalars['String']['input'];
  old_file?: InputMaybe<Scalars['String']['input']>;
};

export type FileOperationResponse = {
  __typename?: 'FileOperationResponse';
  data: Scalars['String']['output'];
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

export type SubscriptionSessionResult = {
  __typename?: 'SubscriptionSessionResult';
  message?: Maybe<Scalars['String']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  sessionUrl?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteFavaFileInput = {
  filename: Scalars['String']['input'];
  ledger_id: Scalars['String']['input'];
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

export type SourceUpdateResponse = {
  __typename?: 'SourceUpdateResponse';
  data: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type MoveDocumentInput = {
  account: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  newName: Scalars['String']['input'];
};

export type MoveResponse = {
  __typename?: 'MoveResponse';
  data: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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

export type SourceInput = {
  file_path: Scalars['String']['input'];
  sha256sum: Scalars['String']['input'];
  source: Scalars['String']['input'];
};

export type SourceSliceInput = {
  entry_hash: Scalars['String']['input'];
  sha256sum: Scalars['String']['input'];
  source: Scalars['String']['input'];
};

export type AccountBalancesQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountBalancesQuery = { __typename?: 'Query', accountBalances: { __typename?: 'AccountBalancesResponse', success: boolean, data: { __typename?: 'TreeNode', account: string, balance: any, balance_children: any, children: Array<{ __typename?: 'TreeNode', account: string, balance: any, balance_children: any, children: Array<{ __typename?: 'TreeNode', account: string, balance: any, balance_children: any }> }> } } };

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

export type CancelSubscriptionMutationVariables = Exact<{
  clientId: Scalars['String']['input'];
  subscriptionId: Scalars['String']['input'];
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: { __typename?: 'SubscriptionActionResult', success: boolean, message?: string | null } };

export type ChartsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ChartsQuery = { __typename?: 'Query', charts: { __typename?: 'ChartsResponse', success: boolean, data: Array<{ __typename?: 'ChartItem', budgets?: any | null, date: string, balance: { __typename?: 'Balance', USD?: number | null } }> } };

export type CreateSubscriptionSessionMutationVariables = Exact<{
  clientId: Scalars['String']['input'];
  priceId: Scalars['String']['input'];
}>;


export type CreateSubscriptionSessionMutation = { __typename?: 'Mutation', createSubscriptionSession: { __typename?: 'SubscriptionSessionResult', success: boolean, sessionId?: string | null, sessionUrl?: string | null, message?: string | null } };

export type DeleteFileMutationVariables = Exact<{
  deleteFileRequest: DeleteFileRequest;
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile?: { __typename?: 'DeleteFileResponse', _id?: string | null } | null };

export type FeatureFlagsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FeatureFlagsQuery = { __typename?: 'Query', featureFlags: any };

export type FormatSourceMutationVariables = Exact<{
  source: Scalars['String']['input'];
}>;


export type FormatSourceMutation = { __typename?: 'Mutation', formatSource: { __typename?: 'SourceUpdateResponse', data: string, success: boolean } };

export type HomeChartsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type HomeChartsQuery = { __typename?: 'Query', homeCharts: { __typename?: 'HomeChartsResponse', success: boolean, data: Array<{ __typename?: 'LabeledChartItem', type: string, label: string, data: Array<{ __typename?: 'ChartItemV2', date: string, balance: any, budgets?: any | null }> }> } };

export type IsPaidQueryVariables = Exact<{ [key: string]: never; }>;


export type IsPaidQuery = { __typename?: 'Query', isPaid: { __typename?: 'IsPaidResponse', isPaid?: boolean | null, isForcedToPay?: boolean | null } };

export type LedgerMetaQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type LedgerMetaQuery = { __typename?: 'Query', ledgerMeta: { __typename?: 'LedgerMetaResponse', success: boolean, data: { __typename?: 'LedgerMeta', accounts: Array<string>, currencies: Array<string>, errors: number, options: { __typename?: 'Options', name_assets: string, name_equity: string, name_expenses: string, name_income: string, name_liabilities: string, operating_currency: Array<string> } } } };

export type LedgersQueryVariables = Exact<{
  file?: InputMaybe<Scalars['BeanFilename']['input']>;
}>;


export type LedgersQuery = { __typename?: 'Query', ledgers?: Array<{ __typename?: 'Ledger', file: any, ledgerId: string, text: string }> | null };

export type PayeeAccountsQueryVariables = Exact<{
  payee: Scalars['String']['input'];
}>;


export type PayeeAccountsQuery = { __typename?: 'Query', payeeAccounts: { __typename?: 'PayeeAccountsResponse', data: Array<string>, success: boolean } };

export type PayeeTransactionQueryVariables = Exact<{
  payee: Scalars['String']['input'];
}>;


export type PayeeTransactionQuery = { __typename?: 'Query', payeeTransaction: { __typename?: 'PayeeTransactionResponse', data: any, success: boolean } };

export type PaymentHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentHistoryQuery = { __typename?: 'Query', paymentHistory: Array<{ __typename?: 'Receipt', _id?: string | null, amount: string, currency: string, paymentEmail: string, userId: string, createAt?: any | null, chargeId?: string | null, estimatedIotx?: number | null, fulfilledHash?: string | null }> };

export type QueryResultQueryVariables = Exact<{
  queryString: Scalars['String']['input'];
}>;


export type QueryResultQuery = { __typename?: 'Query', queryResult: { __typename?: 'QueryResultResponse', success: boolean, data: { __typename?: 'QueryResult', table: string, chart?: any | null } } };

export type RenameFileMutationVariables = Exact<{
  renameFileRequest: RenameFileRequest;
}>;


export type RenameFileMutation = { __typename?: 'Mutation', renameFile?: { __typename?: 'Ledger', file: any, ledgerId: string, text: string } | null };

export type SubscriptionStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionStatusQuery = { __typename?: 'Query', subscriptionStatus: { __typename?: 'CustomerSubscriptionStatus', hasActiveSubscription: boolean, subscriptions: Array<{ __typename?: 'Subscription', id: string, status: string, cancelAt?: any | null, cancelAtPeriodEnd: boolean, canceledAt?: any | null, clientId: string, currentPeriodEnd: any, currentPeriodStart: any, items: Array<{ __typename?: 'SubscriptionItem', id: string, quantity: number, price: { __typename?: 'SubscriptionPrice', id: string, amount: number, currency: string, interval: string, intervalCount?: number | null, trialPeriodDays?: number | null }, product?: { __typename?: 'SubscriptionProduct', id: string, name: string, description?: string | null, images?: Array<string> | null } | null }> }> } };

export type UpdateReportSubscribeMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  status: ReportStatus;
}>;


export type UpdateReportSubscribeMutation = { __typename?: 'Mutation', updateReportSubscribe?: { __typename?: 'UpdateReportSubscribeResponse', success: boolean } | null };

export type UpdateSourceMutationVariables = Exact<{
  sourceInput: SourceInput;
}>;


export type UpdateSourceMutation = { __typename?: 'Mutation', updateSource: { __typename?: 'SourceUpdateResponse', data: string, success: boolean } };

export type UpsertLedgerMutationVariables = Exact<{
  file: Scalars['BeanFilename']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpsertLedgerMutation = { __typename?: 'Mutation', upsertLedger?: { __typename?: 'Ledger', file: any, ledgerId: string, text: string } | null };

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile?: { __typename?: 'UserProfileResponse', email: string, emailReportStatus?: ReportStatus | null } | null };


export const AccountBalancesDocument = gql`
    query AccountBalances {
  accountBalances {
    data {
      account
      balance
      balance_children
      children {
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
 * __useAccountBalancesQuery__
 *
 * To run a query within a React component, call `useAccountBalancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountBalancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountBalancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountBalancesQuery(baseOptions?: Apollo.QueryHookOptions<AccountBalancesQuery, AccountBalancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountBalancesQuery, AccountBalancesQueryVariables>(AccountBalancesDocument, options);
      }
export function useAccountBalancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountBalancesQuery, AccountBalancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountBalancesQuery, AccountBalancesQueryVariables>(AccountBalancesDocument, options);
        }
export function useAccountBalancesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccountBalancesQuery, AccountBalancesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountBalancesQuery, AccountBalancesQueryVariables>(AccountBalancesDocument, options);
        }
export type AccountBalancesQueryHookResult = ReturnType<typeof useAccountBalancesQuery>;
export type AccountBalancesLazyQueryHookResult = ReturnType<typeof useAccountBalancesLazyQuery>;
export type AccountBalancesSuspenseQueryHookResult = ReturnType<typeof useAccountBalancesSuspenseQuery>;
export type AccountBalancesQueryResult = Apollo.QueryResult<AccountBalancesQuery, AccountBalancesQueryVariables>;
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
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription($clientId: String!, $subscriptionId: String!) {
  cancelSubscription(clientId: $clientId, subscriptionId: $subscriptionId) {
    success
    message
  }
}
    `;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      subscriptionId: // value for 'subscriptionId'
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const ChartsDocument = gql`
    query Charts($userId: String!) {
  charts(userId: $userId) {
    data {
      balance {
        USD
      }
      budgets
      date
    }
    success
  }
}
    `;

/**
 * __useChartsQuery__
 *
 * To run a query within a React component, call `useChartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChartsQuery(baseOptions: Apollo.QueryHookOptions<ChartsQuery, ChartsQueryVariables> & ({ variables: ChartsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChartsQuery, ChartsQueryVariables>(ChartsDocument, options);
      }
export function useChartsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChartsQuery, ChartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChartsQuery, ChartsQueryVariables>(ChartsDocument, options);
        }
export function useChartsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChartsQuery, ChartsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChartsQuery, ChartsQueryVariables>(ChartsDocument, options);
        }
export type ChartsQueryHookResult = ReturnType<typeof useChartsQuery>;
export type ChartsLazyQueryHookResult = ReturnType<typeof useChartsLazyQuery>;
export type ChartsSuspenseQueryHookResult = ReturnType<typeof useChartsSuspenseQuery>;
export type ChartsQueryResult = Apollo.QueryResult<ChartsQuery, ChartsQueryVariables>;
export const CreateSubscriptionSessionDocument = gql`
    mutation CreateSubscriptionSession($clientId: String!, $priceId: String!) {
  createSubscriptionSession(clientId: $clientId, priceId: $priceId) {
    success
    sessionId
    sessionUrl
    message
  }
}
    `;
export type CreateSubscriptionSessionMutationFn = Apollo.MutationFunction<CreateSubscriptionSessionMutation, CreateSubscriptionSessionMutationVariables>;

/**
 * __useCreateSubscriptionSessionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionSessionMutation, { data, loading, error }] = useCreateSubscriptionSessionMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      priceId: // value for 'priceId'
 *   },
 * });
 */
export function useCreateSubscriptionSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionSessionMutation, CreateSubscriptionSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionSessionMutation, CreateSubscriptionSessionMutationVariables>(CreateSubscriptionSessionDocument, options);
      }
export type CreateSubscriptionSessionMutationHookResult = ReturnType<typeof useCreateSubscriptionSessionMutation>;
export type CreateSubscriptionSessionMutationResult = Apollo.MutationResult<CreateSubscriptionSessionMutation>;
export type CreateSubscriptionSessionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionSessionMutation, CreateSubscriptionSessionMutationVariables>;
export const DeleteFileDocument = gql`
    mutation DeleteFile($deleteFileRequest: DeleteFileRequest!) {
  deleteFile(deleteFileRequest: $deleteFileRequest) {
    _id
  }
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      deleteFileRequest: // value for 'deleteFileRequest'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
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
export const FormatSourceDocument = gql`
    mutation FormatSource($source: String!) {
  formatSource(source: $source) {
    data
    success
  }
}
    `;
export type FormatSourceMutationFn = Apollo.MutationFunction<FormatSourceMutation, FormatSourceMutationVariables>;

/**
 * __useFormatSourceMutation__
 *
 * To run a mutation, you first call `useFormatSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFormatSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [formatSourceMutation, { data, loading, error }] = useFormatSourceMutation({
 *   variables: {
 *      source: // value for 'source'
 *   },
 * });
 */
export function useFormatSourceMutation(baseOptions?: Apollo.MutationHookOptions<FormatSourceMutation, FormatSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FormatSourceMutation, FormatSourceMutationVariables>(FormatSourceDocument, options);
      }
export type FormatSourceMutationHookResult = ReturnType<typeof useFormatSourceMutation>;
export type FormatSourceMutationResult = Apollo.MutationResult<FormatSourceMutation>;
export type FormatSourceMutationOptions = Apollo.BaseMutationOptions<FormatSourceMutation, FormatSourceMutationVariables>;
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
export const IsPaidDocument = gql`
    query IsPaid {
  isPaid {
    isPaid
    isForcedToPay
  }
}
    `;

/**
 * __useIsPaidQuery__
 *
 * To run a query within a React component, call `useIsPaidQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsPaidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsPaidQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsPaidQuery(baseOptions?: Apollo.QueryHookOptions<IsPaidQuery, IsPaidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsPaidQuery, IsPaidQueryVariables>(IsPaidDocument, options);
      }
export function useIsPaidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsPaidQuery, IsPaidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsPaidQuery, IsPaidQueryVariables>(IsPaidDocument, options);
        }
export function useIsPaidSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IsPaidQuery, IsPaidQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsPaidQuery, IsPaidQueryVariables>(IsPaidDocument, options);
        }
export type IsPaidQueryHookResult = ReturnType<typeof useIsPaidQuery>;
export type IsPaidLazyQueryHookResult = ReturnType<typeof useIsPaidLazyQuery>;
export type IsPaidSuspenseQueryHookResult = ReturnType<typeof useIsPaidSuspenseQuery>;
export type IsPaidQueryResult = Apollo.QueryResult<IsPaidQuery, IsPaidQueryVariables>;
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
export const LedgersDocument = gql`
    query Ledgers($file: BeanFilename) {
  ledgers(file: $file) {
    file
    ledgerId
    text
  }
}
    `;

/**
 * __useLedgersQuery__
 *
 * To run a query within a React component, call `useLedgersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLedgersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLedgersQuery({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useLedgersQuery(baseOptions?: Apollo.QueryHookOptions<LedgersQuery, LedgersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LedgersQuery, LedgersQueryVariables>(LedgersDocument, options);
      }
export function useLedgersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LedgersQuery, LedgersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LedgersQuery, LedgersQueryVariables>(LedgersDocument, options);
        }
export function useLedgersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LedgersQuery, LedgersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LedgersQuery, LedgersQueryVariables>(LedgersDocument, options);
        }
export type LedgersQueryHookResult = ReturnType<typeof useLedgersQuery>;
export type LedgersLazyQueryHookResult = ReturnType<typeof useLedgersLazyQuery>;
export type LedgersSuspenseQueryHookResult = ReturnType<typeof useLedgersSuspenseQuery>;
export type LedgersQueryResult = Apollo.QueryResult<LedgersQuery, LedgersQueryVariables>;
export const PayeeAccountsDocument = gql`
    query PayeeAccounts($payee: String!) {
  payeeAccounts(payee: $payee) {
    data
    success
  }
}
    `;

/**
 * __usePayeeAccountsQuery__
 *
 * To run a query within a React component, call `usePayeeAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayeeAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayeeAccountsQuery({
 *   variables: {
 *      payee: // value for 'payee'
 *   },
 * });
 */
export function usePayeeAccountsQuery(baseOptions: Apollo.QueryHookOptions<PayeeAccountsQuery, PayeeAccountsQueryVariables> & ({ variables: PayeeAccountsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayeeAccountsQuery, PayeeAccountsQueryVariables>(PayeeAccountsDocument, options);
      }
export function usePayeeAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayeeAccountsQuery, PayeeAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayeeAccountsQuery, PayeeAccountsQueryVariables>(PayeeAccountsDocument, options);
        }
export function usePayeeAccountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PayeeAccountsQuery, PayeeAccountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PayeeAccountsQuery, PayeeAccountsQueryVariables>(PayeeAccountsDocument, options);
        }
export type PayeeAccountsQueryHookResult = ReturnType<typeof usePayeeAccountsQuery>;
export type PayeeAccountsLazyQueryHookResult = ReturnType<typeof usePayeeAccountsLazyQuery>;
export type PayeeAccountsSuspenseQueryHookResult = ReturnType<typeof usePayeeAccountsSuspenseQuery>;
export type PayeeAccountsQueryResult = Apollo.QueryResult<PayeeAccountsQuery, PayeeAccountsQueryVariables>;
export const PayeeTransactionDocument = gql`
    query PayeeTransaction($payee: String!) {
  payeeTransaction(payee: $payee) {
    data
    success
  }
}
    `;

/**
 * __usePayeeTransactionQuery__
 *
 * To run a query within a React component, call `usePayeeTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayeeTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayeeTransactionQuery({
 *   variables: {
 *      payee: // value for 'payee'
 *   },
 * });
 */
export function usePayeeTransactionQuery(baseOptions: Apollo.QueryHookOptions<PayeeTransactionQuery, PayeeTransactionQueryVariables> & ({ variables: PayeeTransactionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayeeTransactionQuery, PayeeTransactionQueryVariables>(PayeeTransactionDocument, options);
      }
export function usePayeeTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayeeTransactionQuery, PayeeTransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayeeTransactionQuery, PayeeTransactionQueryVariables>(PayeeTransactionDocument, options);
        }
export function usePayeeTransactionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PayeeTransactionQuery, PayeeTransactionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PayeeTransactionQuery, PayeeTransactionQueryVariables>(PayeeTransactionDocument, options);
        }
export type PayeeTransactionQueryHookResult = ReturnType<typeof usePayeeTransactionQuery>;
export type PayeeTransactionLazyQueryHookResult = ReturnType<typeof usePayeeTransactionLazyQuery>;
export type PayeeTransactionSuspenseQueryHookResult = ReturnType<typeof usePayeeTransactionSuspenseQuery>;
export type PayeeTransactionQueryResult = Apollo.QueryResult<PayeeTransactionQuery, PayeeTransactionQueryVariables>;
export const PaymentHistoryDocument = gql`
    query PaymentHistory {
  paymentHistory {
    _id
    amount
    currency
    paymentEmail
    userId
    createAt
    chargeId
    estimatedIotx
    fulfilledHash
  }
}
    `;

/**
 * __usePaymentHistoryQuery__
 *
 * To run a query within a React component, call `usePaymentHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentHistoryQuery(baseOptions?: Apollo.QueryHookOptions<PaymentHistoryQuery, PaymentHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentHistoryQuery, PaymentHistoryQueryVariables>(PaymentHistoryDocument, options);
      }
export function usePaymentHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentHistoryQuery, PaymentHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentHistoryQuery, PaymentHistoryQueryVariables>(PaymentHistoryDocument, options);
        }
export function usePaymentHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PaymentHistoryQuery, PaymentHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaymentHistoryQuery, PaymentHistoryQueryVariables>(PaymentHistoryDocument, options);
        }
export type PaymentHistoryQueryHookResult = ReturnType<typeof usePaymentHistoryQuery>;
export type PaymentHistoryLazyQueryHookResult = ReturnType<typeof usePaymentHistoryLazyQuery>;
export type PaymentHistorySuspenseQueryHookResult = ReturnType<typeof usePaymentHistorySuspenseQuery>;
export type PaymentHistoryQueryResult = Apollo.QueryResult<PaymentHistoryQuery, PaymentHistoryQueryVariables>;
export const QueryResultDocument = gql`
    query QueryResult($queryString: String!) {
  queryResult(queryString: $queryString) {
    data {
      table
      chart
    }
    success
  }
}
    `;

/**
 * __useQueryResultQuery__
 *
 * To run a query within a React component, call `useQueryResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryResultQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useQueryResultQuery(baseOptions: Apollo.QueryHookOptions<QueryResultQuery, QueryResultQueryVariables> & ({ variables: QueryResultQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryResultQuery, QueryResultQueryVariables>(QueryResultDocument, options);
      }
export function useQueryResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryResultQuery, QueryResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryResultQuery, QueryResultQueryVariables>(QueryResultDocument, options);
        }
export function useQueryResultSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryResultQuery, QueryResultQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryResultQuery, QueryResultQueryVariables>(QueryResultDocument, options);
        }
export type QueryResultQueryHookResult = ReturnType<typeof useQueryResultQuery>;
export type QueryResultLazyQueryHookResult = ReturnType<typeof useQueryResultLazyQuery>;
export type QueryResultSuspenseQueryHookResult = ReturnType<typeof useQueryResultSuspenseQuery>;
export type QueryResultQueryResult = Apollo.QueryResult<QueryResultQuery, QueryResultQueryVariables>;
export const RenameFileDocument = gql`
    mutation RenameFile($renameFileRequest: RenameFileRequest!) {
  renameFile(renameFileRequest: $renameFileRequest) {
    file
    ledgerId
    text
  }
}
    `;
export type RenameFileMutationFn = Apollo.MutationFunction<RenameFileMutation, RenameFileMutationVariables>;

/**
 * __useRenameFileMutation__
 *
 * To run a mutation, you first call `useRenameFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameFileMutation, { data, loading, error }] = useRenameFileMutation({
 *   variables: {
 *      renameFileRequest: // value for 'renameFileRequest'
 *   },
 * });
 */
export function useRenameFileMutation(baseOptions?: Apollo.MutationHookOptions<RenameFileMutation, RenameFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameFileMutation, RenameFileMutationVariables>(RenameFileDocument, options);
      }
export type RenameFileMutationHookResult = ReturnType<typeof useRenameFileMutation>;
export type RenameFileMutationResult = Apollo.MutationResult<RenameFileMutation>;
export type RenameFileMutationOptions = Apollo.BaseMutationOptions<RenameFileMutation, RenameFileMutationVariables>;
export const SubscriptionStatusDocument = gql`
    query SubscriptionStatus {
  subscriptionStatus {
    hasActiveSubscription
    subscriptions {
      id
      status
      cancelAt
      cancelAtPeriodEnd
      canceledAt
      clientId
      currentPeriodEnd
      currentPeriodStart
      items {
        id
        quantity
        price {
          id
          amount
          currency
          interval
          intervalCount
          trialPeriodDays
        }
        product {
          id
          name
          description
          images
        }
      }
    }
  }
}
    `;

/**
 * __useSubscriptionStatusQuery__
 *
 * To run a query within a React component, call `useSubscriptionStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionStatusQuery(baseOptions?: Apollo.QueryHookOptions<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>(SubscriptionStatusDocument, options);
      }
export function useSubscriptionStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>(SubscriptionStatusDocument, options);
        }
export function useSubscriptionStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>(SubscriptionStatusDocument, options);
        }
export type SubscriptionStatusQueryHookResult = ReturnType<typeof useSubscriptionStatusQuery>;
export type SubscriptionStatusLazyQueryHookResult = ReturnType<typeof useSubscriptionStatusLazyQuery>;
export type SubscriptionStatusSuspenseQueryHookResult = ReturnType<typeof useSubscriptionStatusSuspenseQuery>;
export type SubscriptionStatusQueryResult = Apollo.QueryResult<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>;
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
export const UpdateSourceDocument = gql`
    mutation UpdateSource($sourceInput: SourceInput!) {
  updateSource(sourceInput: $sourceInput) {
    data
    success
  }
}
    `;
export type UpdateSourceMutationFn = Apollo.MutationFunction<UpdateSourceMutation, UpdateSourceMutationVariables>;

/**
 * __useUpdateSourceMutation__
 *
 * To run a mutation, you first call `useUpdateSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSourceMutation, { data, loading, error }] = useUpdateSourceMutation({
 *   variables: {
 *      sourceInput: // value for 'sourceInput'
 *   },
 * });
 */
export function useUpdateSourceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSourceMutation, UpdateSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSourceMutation, UpdateSourceMutationVariables>(UpdateSourceDocument, options);
      }
export type UpdateSourceMutationHookResult = ReturnType<typeof useUpdateSourceMutation>;
export type UpdateSourceMutationResult = Apollo.MutationResult<UpdateSourceMutation>;
export type UpdateSourceMutationOptions = Apollo.BaseMutationOptions<UpdateSourceMutation, UpdateSourceMutationVariables>;
export const UpsertLedgerDocument = gql`
    mutation UpsertLedger($file: BeanFilename!, $text: String) {
  upsertLedger(file: $file, text: $text) {
    file
    ledgerId
    text
  }
}
    `;
export type UpsertLedgerMutationFn = Apollo.MutationFunction<UpsertLedgerMutation, UpsertLedgerMutationVariables>;

/**
 * __useUpsertLedgerMutation__
 *
 * To run a mutation, you first call `useUpsertLedgerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertLedgerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertLedgerMutation, { data, loading, error }] = useUpsertLedgerMutation({
 *   variables: {
 *      file: // value for 'file'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpsertLedgerMutation(baseOptions?: Apollo.MutationHookOptions<UpsertLedgerMutation, UpsertLedgerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertLedgerMutation, UpsertLedgerMutationVariables>(UpsertLedgerDocument, options);
      }
export type UpsertLedgerMutationHookResult = ReturnType<typeof useUpsertLedgerMutation>;
export type UpsertLedgerMutationResult = Apollo.MutationResult<UpsertLedgerMutation>;
export type UpsertLedgerMutationOptions = Apollo.BaseMutationOptions<UpsertLedgerMutation, UpsertLedgerMutationVariables>;
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