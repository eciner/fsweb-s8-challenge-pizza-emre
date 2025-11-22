// src/pages/Order.jsx
import React from "react";
import Header from "../components/Header";
import OrderForm from "../components/OrderForm";
import Footer from "../components/Footer";
import "./Order.css";

function Order({ onOrderSubmit }) {
  return (
    <div className="order-page">
      <Header showBreadcrumb />
      <div className="order-hero" />

      <main className="order-main">
        <OrderForm onOrderSubmit={onOrderSubmit} />
      </main>

      <Footer />
    </div>
  );
}

export default Order;
