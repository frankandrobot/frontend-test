const { allDropdownBehavior } = require("./index");

test(`allDropdownBehavior defaults to "All"`, () => {
  let result;
  result = allDropdownBehavior(["any"], []);
  expect(result).toEqual(["All"]);
  result = allDropdownBehavior(["All"], []);
  expect(result).toEqual(["All"]);
});

test(`allDropdownBehavior can uncheck "All"`, () => {
  let result;
  result = allDropdownBehavior(["All"], ["a"]);
  expect(result).toEqual(["a"]);
  result = allDropdownBehavior(["All"], ["a", "b"]);
  expect(result).toEqual(["a", "b"]);
  result = allDropdownBehavior(["All"], ["All", "a", "b"]);
  expect(result).toEqual(["a", "b"]);
});

test(`allDropdownBehavior unchecks others when checking "All`, () => {
  let result;
  result = allDropdownBehavior(["a", "b"], ["All", "a", "b"]);
  expect(result).toEqual(["All"]);
});

test(`allDropdownBehavior passes nextFilter when "All" is not involved`, () => {
  let result;
  result = allDropdownBehavior(["o"], ["a"]);
  expect(result).toEqual(["a"]);
  result = allDropdownBehavior(["o"], ["a", "b"]);
  expect(result).toEqual(["a", "b"]);
  result = allDropdownBehavior(["o"], ["x", "a", "b"]);
  expect(result).toEqual(["x", "a", "b"]);
});
