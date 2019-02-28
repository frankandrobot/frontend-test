import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RestaurantPage from "./main/restaurants";

export default function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={RestaurantPage} />
        <Route path={"/:topicId"} component={RestaurantPage} />
      </div>
    </Router>
  );
}
