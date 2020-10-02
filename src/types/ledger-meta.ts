/* eslint-disable camelcase */
export interface Options {
  name_assets: string;
  name_equity: string;
  name_expenses: string;
  name_income: string;
  name_liabilities: string;
}

export interface LedgerMeta {
  accounts: Array<string>;
  currencies: Array<string>;
  errors: number;
  options: Options;
}

export interface LedgerMetaResponse {
  data: LedgerMeta;
  success: boolean;
}
