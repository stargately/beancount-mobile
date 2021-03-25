import { getNetWorth } from "@/screens/home-screen/selectors/select-net-worth";

describe("getNetWorth", () => {
  it("", async () => {
    const data = {
      homeCharts: {
        data: [
          {
            type: "balances",
            label: "Net Worth",
            data: [
              {
                date: "2021-02-01",
                balance: {
                  USD: -378860.26306,
                  VACHR: -26,
                },
                budgets: null,
              },
              {
                date: "2021-03-01",
                balance: {
                  USD: -378860.26306,
                  VACHR: -26,
                },
                budgets: null,
              },
              {
                date: "2021-03-23",
                balance: {
                  USD: -378860.35306,
                  VACHR: -26,
                },
                budgets: null,
              },
            ],
            __typename: "LabeledChartItem",
          },
        ],
        success: true,
        __typename: "HomeChartsResponse",
      },
    };

    const resp = getNetWorth("USD", data);
    expect(resp).toEqual({ netAssets: "-378860.35" });
  });
});
