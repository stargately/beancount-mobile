import { selectNetWorthArray } from "@/screens/home-screen/selectors/select-net-worth-array";

describe("selectNetWorthArray", () => {
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
                  USD: 100.0,
                },
                budgets: null,
                __typename: "ChartItemV2",
              },
              {
                date: "2021-03-01",
                balance: {
                  USD: 200.0,
                },
                budgets: null,
                __typename: "ChartItemV2",
              },
              {
                date: "2021-03-16",
                balance: {
                  USD: 300.0,
                },
                budgets: null,
                __typename: "ChartItemV2",
              },
            ],
            __typename: "LabeledChartItem",
          },
        ],
        success: true,
        __typename: "HomeChartsResponse",
      },
    };

    const resp = selectNetWorthArray("USD", data);
    expect(resp).toEqual({ labels: ["02", "03"], numbers: [0.1, 0.3] });
  });
});
