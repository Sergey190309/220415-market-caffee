import React from "react";
// import { render } from "@testing-library/react";
import ShallowRenderer from "react-test-renderer/shallow";

import SideBar from '../../../src/components/navigation/SideBar'

describe("Layout compnent", () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<SideBar />)
  test("Snapshot", () => {
    expect(result).toMatchSnapshot()
  });
});
