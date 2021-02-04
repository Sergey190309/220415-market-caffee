import React from 'react'

import ShallowRenderer from "react-test-renderer/shallow";

import NavBar from '../../../src/components/navigation/NavBar'


describe('NavBar component', () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<NavBar />)
  test("Snapshot", () => {
    expect(result).toMatchSnapshot()
  });
});