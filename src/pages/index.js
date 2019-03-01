import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import theme from "../components/theme";

import RestaurantPage from "./main/restaurants";

const Container = styled.div`
  min-width: ${props => props.theme.bodyWidthPx + "px"};
`;

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Route exact path="/" component={RestaurantPage} />
          <Route path={"/:restaurantId"} component={RestaurantPage} />
        </Container>
      </ThemeProvider>
    </Router>
  );
}
