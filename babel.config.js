const presets = [
  [
    "@babel/preset-env",
    {
      // when this is used, you don't need to explicitly import
      // @babel/polyfill
      useBuiltIns: "usage",
      targets:
        "last 3 chrome version and " +
        "last 3 safari version and " +
        "last 3 firefox version and " +
        "ie 11 and " +
        "edge >= 1",
    },
  ],
  "@babel/preset-react",
];

const plugins = [
  // this needs to always come first
  [
    "babel-plugin-styled-components",
    {
      pure: true,
    },
  ],
  // let [a, b, ...rest] = arr;
  "@babel/plugin-transform-destructuring",
  // makes writing classes simpler
  "@babel/plugin-proposal-class-properties",
];

module.exports = {
  presets,
  plugins,
};
