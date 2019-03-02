import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import theme from "../components/theme";

import RestaurantPage from "./main/restaurants";

const Container = styled.div`
  min-width: ${props => props.theme.bodyWidthPx + "px"};
`;

function Restaurants({ match }) {
  return (
    <div>
      <Route path={`${match.path}/:id`} component={RestaurantPage} />
      <Route exact path={match.path} component={RestaurantPage} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <Route exact path="/" component={Restaurants} />
          <Route path="/restaurants" component={Restaurants} />
        </Container>
      </ThemeProvider>
    </Router>
  );
}
