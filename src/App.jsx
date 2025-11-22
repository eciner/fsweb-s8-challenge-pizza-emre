// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  // Tüm sipariş verisini App seviyesinde saklıyoruz (prop-lifting için)
  const [lastOrder, setLastOrder] = useState(null);

  // Order sayfasına göndereceğimiz callback
  const handleOrderPlaced = (orderPayload) => {
    setLastOrder(orderPayload);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/order">
          <Order onOrderComplete={handleOrderPlaced} />
        </Route>

        <Route path="/success">
          <Success order={lastOrder} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
