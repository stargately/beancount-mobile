import * as React from "react";
import { StatusBar } from "react-native";
import * as renderer from "react-test-renderer";
// import { Provider } from "react-redux";
// import { AppLoaderRoot } from "@/app-loading";
// import { store } from "@/common/store";

describe("App snapshot", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("renders the StatusBar", async () => {
    const tree = renderer.create(<StatusBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("renders AppLoaderRoot", async () => {
  //   const tree = renderer
  //     .create(
  //       <Provider store={store}>
  //         <AppLoaderRoot onFinish={() => null} />
  //       </Provider>
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
