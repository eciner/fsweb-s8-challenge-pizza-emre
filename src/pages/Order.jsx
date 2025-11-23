import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderForm from "../components/OrderForm";
import "./Order.css";

function Order({ onOrderSubmit }) {
  return (
    <div className="page order-page">
      <Header />

      <main className="order-main">
        <div className="order-inner">
          <div className="order-banner" />

          <div className="order-copy">
            <h1 className="order-title">Lezzetin Teknolojiyle Buluştuğu Yer</h1>
            <p className="order-text">
              İnce ayarlı malzeme seçimi, esnek hamur seçenekleri ve kusursuz
              bir sipariş deneyimi. Teknolojik Yemekler ile pizzanı kendi
              zevkine göre tasarla.
            </p>
          </div>

          <OrderForm onOrderSubmit={onOrderSubmit} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Order;
