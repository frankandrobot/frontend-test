import React from "react";
import Stars from "./stars";
import renderer from "react-test-renderer";
import { toArray } from "./stars";

test(`toArray converts 0 rating to [0,0,0,0]`, () => {
  const result = toArray(0, 4);
  expect(result).toEqual([0, 0, 0, 0]);
});

test(`toArray converts 0.5 rating to [0.5,0,0,0]`, () => {
  const result = toArray(0.5, 4);
  expect(result).toEqual([0.5, 0, 0, 0]);
});

test(`toArray converts 1 rating to [1,0,0,0]`, () => {
  const result = toArray(1, 4);
  expect(result).toEqual([1, 0, 0, 0]);
});

test(`toArray converts 1.5 rating to [1,0.5,0,0]`, () => {
  const result = toArray(1.5, 4);
  expect(result).toEqual([1, 0.5, 0, 0]);
});

test(`toArray converts 3 rating to [1,1,1,0]`, () => {
  const result = toArray(3, 4);
  expect(result).toEqual([1, 1, 1, 0]);
});

test(`toArray converts 3.5 rating to [1,1,1,0.5]`, () => {
  const result = toArray(3.5, 4);
  expect(result).toEqual([1, 1, 1, 0.5]);
});

test("Stars renders empty stars correctly", () => {
  const component = renderer.create(<Stars rating={0} max={0} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Stars renders correctly", () => {
  const component = renderer.create(<Stars rating={0} max={5} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
