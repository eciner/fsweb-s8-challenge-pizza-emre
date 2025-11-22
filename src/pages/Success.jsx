// src/pages/Success.jsx
import React from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import "./Success.css";

function Success({ order }) {
  if (!order) {
    // Eğer sayfa doğrudan açılırsa basit bir fallback
    return (
      <div className="success-page">
        <Logo className="success-logo" />
        <div className="success-inner">
          <h2>Geçerli sipariş bulunamadı.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="success-page">
      <Logo className="success-logo" />

      <div className="success-inner">
        <div className="success-subtext">lezzetin yolda</div>
        <h1 className="success-title">SİPARİŞ ALINDI</h1>

        <hr className="success-divider" />

        <div className="success-pizza-name">Position Absolute Acı Pizza</div>

        <div className="success-details">
          <strong>Boyut:</strong> {order.size}
          <br />
          <strong>Hamur:</strong> {order.crust}
          <br />
          <strong>Ek Malzemeler:</strong>{" "}
          {order.toppings && order.toppings.length > 0
            ? order.toppings.join(", ")
            : "Seçilmedi"}
        </div>

        <div className="success-summary-box">
          <div className="success-summary-title">Sipariş Toplamı</div>

          <div className="success-summary-row">
            <span>Seçimler</span>
            <span>{order.prices.extras.toFixed(2)}₺</span>
          </div>

          <div className="success-summary-row">
            <span>Toplam</span>
            <span className="success-summary-total">
              {order.prices.total.toFixed(2)}₺
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Success;
