import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import Landing from "../../../src/components/layout/Landing";

describe("Landing component", () => {
  test("snapshot", () => {
    const landing = renderer.create(<Landing />).toJSON();
    expect(landing).toMatchSnapshot();
  });
  afterAll(cleanup);
});
