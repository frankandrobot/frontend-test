## Overview

### Setup Proxy Server (Prequisites)

- Use your own or run `npm run proxy` (make sure to first `yarn install`).
- Set `<PROJECT_ROOT>/api.url` with the URL of the proxy server. Webpack will
  bake this API URL into the App. Example:
  ```ini
  http://localhost:8010/proxy
  ```
- Set `<PROJECT_ROOT>/api.key` with your Yelp API key. Webpack will back this
  API KEY into the App.

### Running

```bash
yarn install
npm run build:dev
npm run start
```

### Tests

```bash
npm test
```

## Design

### Tooling
- `eslint` checks for syntax errors.
- `babel`
  - is used together with `eslint` to check for JSX syntax errors
  - provides easier React classes (binding class methods to `this` not
    necessary!)
  - currently configured to support latest browsers but can be extended to
    support +IE10 and Edge.
- `prettier` support so that you don't have to worry about formatting.
- `webpack`, which is harder to config than `parceljs` but is more battle
  tested. Currently configured only for a development environment.
- `local-cors-proxy`, which does what it's name says.
- `jest` and `react-test-renderer` provide unit tests.

### CSS

Early on I chose to use `styled-components` instead of SASS. It has several
advantages:
- makes it super easy to style React components.
- addresses the "CSS is a giant global" problem that can make it hard to
  maintain CSS.
- it has tree shaking out of the box (since a styled component is just JS).
- it has server-side rendering support out of the box.

### State Management and AJAX Requests

In the past, I would have used `redux` for state management and `redux-saga` or
`RxJS` for coordinating AJAX calls. However, these solutions can be bulky to use
(boilerplate) and have steep learning curves. Not surprisingly, I've seen teams
struggle using these tools. So for this app, I decided to use React hooks. Hooks
provide mechanisms for both handling state and making side effects, like AJAX
requests.

### App Structure

The app structure is inspired by a recent VueJS article:
  - `components` - are sharable components
     - `ui` - components with no business-logic (pure UI)
  - `pages` - layout 
     - restaurants - the Restaurants page
     - restaurant_details - the RestaurantDetails page

### UX 

- If a user clicks "Load More" and then selects a client-side filter, the
  Restaurant page view resets, showing the first page. This is the simplest
  approach used in the wild (ex: StackOverflow).
- "Placeholder" components are displayed instead of spinners while loading Yelp
  data. 
- The Price and Category dropdowns are unordered-lists under the hood. This is
  because it's not possible to style select/option elements. Unfortunately, this
  also means we need to re-invent the wheel for things like proper Web
  accessability. The current version does *not* have proper accessability
  support.
- In Tile views, categories can take up the entire Tile width (ex: "breakfast &
  brunch"). I took a simple approach that's faithful to the original design:
  Render the category vertically when it takes up too much horizontal space
  ```
  | Really   * Price      Open  |
  | long                        |
  | Category                    |
  ```

## Optimization Opportunities
 - minification - as stated earlier, a production build is *not* provided.
   Minifying the bundle can reduce the bundle size.
 - code splitting - can help reduce the initial load time even further. 
