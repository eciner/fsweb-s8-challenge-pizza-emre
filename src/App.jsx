// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// Sayfalar
import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  // Sipariş verilerinin Success sayfasına taşınması için
  const [orderData, setOrderData] = useState(null);

  // OrderForm’dan gelen siparişi kaydediyoruz
  const handleOrderSubmit = (orderPayload) => {
    setOrderData(orderPayload);
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
