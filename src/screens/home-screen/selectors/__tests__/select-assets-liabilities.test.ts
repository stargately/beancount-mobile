import { getAssetsLiabilities } from "@/screens/home-screen/selectors/select-assets-liabilities";

describe("getAssetsLiabilities", () => {
  it("", async () => {
    const data = {
      accountHierarchy: {
        data: [
          {
            type: "hierarchy",
            label: "Assets",
            data: {
              account: "Assets",
              balance: {},
              balance_children: {
                USD: -375918.79306,
                VACHR: -26,
              },
              children: [],
            },
          },
          {
            type: "hierarchy",
            label: "Liabilities",
            data: {
              account: "Liabilities",
              balance: {},
              balance_children: {
                USD: -2941.56,
              },
              children: [],
            },
          },
        ],
        success: true,
      },
    };

    const resp = getAssetsLiabilities("USD", data);
    expect(resp).toEqual({ assets: "-375918.79", liabilities: "-2941.56" });
  });
});
