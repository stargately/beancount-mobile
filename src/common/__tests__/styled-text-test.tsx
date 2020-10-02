import * as React from "react";
import * as renderer from "react-test-renderer";
import { MonoText } from "@/common/styled-text";

it("renders correctly", () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
