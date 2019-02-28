import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "../components/theme";

import RestaurantPage from "./main/restaurants";

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Route exact path="/" component={RestaurantPage} />
          <Route path={"/:restaurantId"} component={RestaurantPage} />
        </div>
      </ThemeProvider>
    </Router>
  );
}
