// src/pages/Order.jsx
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

          <div className="order-header-area">
            <div className="order-breadcrumb">
              Anasayfa &gt; Seçenekler &gt; <span>Sipariş Oluştur</span>
            </div>

            <h1 className="order-title">Position Absolute Acı Pizza</h1>

            <div className="order-price-row">
              <span className="order-price">85.50₺</span>
              <span className="order-rating">
                <strong>4.9</strong> <span>(200)</span>
              </span>
            </div>

            <p className="order-description">
              Frontend dev olarak hala position:absolute kullanıyorsan bu çok
              acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
              İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen
              pizzetta denir.
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
