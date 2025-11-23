// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  // Sipariş verisini Success sayfasına taşımak için prop-lifting
  const [orderData, setOrderData] = useState(null);

  const handleOrderSubmit = (orderPayloadFromApi) => {
    setOrderData(orderPayloadFromApi);
  };

  return (
    <Router>
      <Switch>
        {/* HOME – hem "/" hem "/home" */}
        <Route exact path={["/", "/home"]}>
          <Home />
        </Route>

        {/* ORDER */}
        <Route path="/order">
          <Order onOrderSubmit={handleOrderSubmit} />
        </Route>

        {/* SUCCESS */}
        <Route path="/success">
          <Success order={orderData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
