import {
  AddTransactionCallback,
  SelectedAssets,
  SelectedExpenses,
  SelectedCurrency,
  SelectedPayee,
  SelectedNarration,
  getGlobalFn,
} from "../globalFnFactory";

describe("globalFnFactory helpers", () => {
  afterEach(() => {
    SelectedAssets.deleteFn();
    AddTransactionCallback.deleteFn();
    SelectedExpenses.deleteFn();
    SelectedCurrency.deleteFn();
    SelectedPayee.deleteFn();
    SelectedNarration.deleteFn();
  });

  it("stores and retrieves callbacks with SelectedAssets", () => {
    const handler = () => 42;
    SelectedAssets.setFn(handler);

    const stored = SelectedAssets.getFn();
    expect(stored).toBe(handler);
    expect(SelectedAssets.hasFn()).toBe(true);

    SelectedAssets.deleteFn();
    expect(SelectedAssets.getFn()).toBe(undefined);
    expect(SelectedAssets.hasFn()).toBe(false);
  });

  it("allows retrieving callbacks via getGlobalFn", async () => {
    const callback = async (): Promise<void> => {
      await Promise.resolve("done");
    };
    AddTransactionCallback.setFn(callback);

    const lookedUp = getGlobalFn<typeof callback>("AddTransactionCallback");
    expect(lookedUp).toBe(callback);
    await lookedUp?.();
  });

  it("returns undefined for non-existent keys with getGlobalFn", () => {
    const result = getGlobalFn("NonExistentKey");
    expect(result).toBe(undefined);
  });

  it("allows multiple separate function stores", () => {
    const assetsHandler = (value: string) => `assets-${value}`;
    const expensesHandler = (value: string) => `expenses-${value}`;

    SelectedAssets.setFn(assetsHandler);
    SelectedExpenses.setFn(expensesHandler);

    expect(SelectedAssets.getFn()).toBe(assetsHandler);
    expect(SelectedExpenses.getFn()).toBe(expensesHandler);
  });

  it("allows overwriting existing functions", () => {
    const handler1 = (value: string) => `first-${value}`;
    const handler2 = (value: string) => `second-${value}`;

    SelectedCurrency.setFn(handler1);
    expect(SelectedCurrency.getFn()).toBe(handler1);

    SelectedCurrency.setFn(handler2);
    expect(SelectedCurrency.getFn()).toBe(handler2);
  });

  it("hasFn returns false when no function is set", () => {
    expect(SelectedPayee.hasFn()).toBe(false);
  });

  it("hasFn returns true after setting a function", () => {
    SelectedPayee.setFn((value: string) => value);
    expect(SelectedPayee.hasFn()).toBe(true);
  });

  it("deleteFn removes the function completely", () => {
    SelectedNarration.setFn((value: string) => value);
    expect(SelectedNarration.hasFn()).toBe(true);

    SelectedNarration.deleteFn();
    expect(SelectedNarration.hasFn()).toBe(false);
    expect(SelectedNarration.getFn()).toBe(undefined);
  });

  it("handles all pre-defined global functions", () => {
    const functions = [
      SelectedAssets,
      SelectedExpenses,
      SelectedCurrency,
      SelectedPayee,
      SelectedNarration,
      AddTransactionCallback,
    ];

    functions.forEach((fn) => {
      expect(typeof fn.setFn).toBe("function");
      expect(typeof fn.getFn).toBe("function");
      expect(typeof fn.deleteFn).toBe("function");
      expect(typeof fn.hasFn).toBe("function");
    });
  });
});
