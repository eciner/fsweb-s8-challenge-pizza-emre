import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  // API'den dönen sipariş verisini Success sayfasına taşımak için state
  const [orderData, setOrderData] = useState(null);

  const handleOrderSubmit = (orderPayloadFromApi) => {
    setOrderData(orderPayloadFromApi || null);
  };

  return (
    <Router>
      <Switch>
        {/* HOME */}
        <Route exact path="/">
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
