// src/pages/Success.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Success.css";

const BASE_PRICE = 85.5;

function Success({ order }) {
  if (!order) {
    return (
      <div className="page success-page">
        <Header />
        <main className="success-main">
          <div className="success-inner">
            <h1 className="success-title">SİPARİŞ BULUNAMADI</h1>
            <p className="success-subtitle">
              Görünüşe göre bu sayfaya doğrudan geldin. Yeni bir pizza siparişi
              vermek için aşağıdaki butonu kullanabilirsin.
            </p>
            <Link to="/order">
              <button
                type="button"
                className="btn-primary"
                data-cy="success-new-order"
              >
                Yeni Sipariş Oluştur
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const size = order.size || "-";
  const crust = order.crust || "-";
  const toppings = Array.isArray(order.toppings) ? order.toppings : [];
  const quantity = order.quantity || 1;
  const total = order.price || BASE_PRICE * quantity;
  const extras = Math.max(0, total - BASE_PRICE * quantity);

  return (
    <div className="page success-page">
      <Header />
      <main className="success-main">
        <div className="success-inner">
          <div className="success-card">
            <div className="success-checkmark">✓</div>
            <p className="success-logo-text">Teknolojik Yemekler</p>

            <div className="success-heading-block">
              <p className="success-tagline">lezzetin yolda</p>
              <h1 className="success-title">SİPARİŞİN ALINDI</h1>
            </div>

            <div className="success-divider" />

            <div className="success-content">
              <h2
                className="success-product-name"
                data-cy="success-product-name"
              >
                Position Absolute Acı Pizza
              </h2>

              <div className="success-details">
                <p>
                  <span className="muted">Boyut</span>
                  <span className="value">{size}</span>
                </p>
                <p>
                  <span className="muted">Hamur</span>
                  <span className="value">{crust}</span>
                </p>
                <p>
                  <span className="muted">Ek Malzemeler</span>
                  <span className="value">
                    {toppings.length ? toppings.join(", ") : "-"}
                  </span>
                </p>
                <p>
                  <span className="muted">Sipariş Notu</span>
                  <span className="value" data-cy="success-notes">
                    {order.notes && order.notes.trim() ? order.notes : "-"}
                  </span>
                </p>
              </div>

              <div className="success-summary-card">
                <div className="summary-row">
                  <span>Seçimler</span>
                  <span>{extras.toFixed(2)}₺</span>
                </div>
                <div className="summary-row summary-row--strong">
                  <span>Toplam</span>
                  <span>{total.toFixed(2)}₺</span>
                </div>
              </div>

              <Link to="/">
                <button
                  type="button"
                  className="success-back-button"
                  data-cy="success-home-btn"
                >
                  Anasayfaya dön
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Success;
