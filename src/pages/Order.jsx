// src/pages/Order.jsx
import React from "react";
import Header from "../components/Header";
import OrderForm from "../components/OrderForm";
import "./Order.css";

function Order({ onOrderComplete }) {
  return (
    <div className="order-page">
      <Header />
      <main className="order-main">
        <OrderForm onOrderComplete={onOrderComplete} />
      </main>
    </div>
  );
}

export default Order;
