const { allDropdownBehavior } = require("./index");

test(`allDropdownBehavior defaults to "all"`, () => {
  let result;
  result = allDropdownBehavior(["any"], []);
  expect(result).toEqual(["all"]);
  result = allDropdownBehavior(["all"], []);
  expect(result).toEqual(["all"]);
});

test(`allDropdownBehavior can uncheck "all"`, () => {
  let result;
  result = allDropdownBehavior(["all"], ["a"]);
  expect(result).toEqual(["a"]);
  result = allDropdownBehavior(["all"], ["a", "b"]);
  expect(result).toEqual(["a", "b"]);
  result = allDropdownBehavior(["all"], ["all", "a", "b"]);
  expect(result).toEqual(["a", "b"]);
});

test(`allDropdownBehavior passes nextFilter when "all" is not involved`, () => {
  let result;
  result = allDropdownBehavior(["o"], ["a"]);
  expect(result).toEqual(["a"]);
  result = allDropdownBehavior(["o"], ["a", "b"]);
  expect(result).toEqual(["a", "b"]);
  result = allDropdownBehavior(["o"], ["x", "a", "b"]);
  expect(result).toEqual(["x", "a", "b"]);
})