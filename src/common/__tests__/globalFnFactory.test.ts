import {
  AddTransactionCallback,
  SelectedAssets,
  getGlobalFn,
} from "../globalFnFactory";

describe("globalFnFactory helpers", () => {
  afterEach(() => {
    SelectedAssets.deleteFn();
    AddTransactionCallback.deleteFn();
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
    const callback = async () => "done";
    AddTransactionCallback.setFn(callback);

    const lookedUp = getGlobalFn<typeof callback>("AddTransactionCallback");
    expect(lookedUp).toBe(callback);
    expect(await lookedUp?.()).toBe("done");
  });
});
