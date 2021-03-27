import { selectNetProfitArray } from "@/screens/home-screen/selectors/select-net-profit-array";

describe("selectNetProfitArray", () => {
  it("", async () => {
    const data = {
      homeCharts: {
        data: [
          {
            type: "bar",
            label: "Net Profit",
            data: [
              {
                date: "2021-01-01",
                balance: {
                  USD: 391912.04,
                },
                budgets: {},
              },
              {
                date: "2021-02-01",
                balance: {},
                budgets: {},
              },
              {
                date: "2021-03-01",
                balance: {
                  USD: 0.09,
                },
                budgets: {},
              },
            ],
            __typename: "LabeledChartItem",
          },
        ],
        success: true,
        __typename: "HomeChartsResponse",
      },
    };

    const resp = selectNetProfitArray("USD", data);
    expect(resp).toEqual({
      labels: ["01", "02", "03"],
      numbers: [391912.04, 0, 0.09],
    });
  });
});
