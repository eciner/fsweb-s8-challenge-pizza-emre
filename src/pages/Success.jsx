// src/pages/Success.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "./Success.css";

function Success({ order }) {
  const hasOrder = Boolean(order);

  return (
    <div className="success-page">
      <Logo className="success-logo" />

      <section className="success-card">
        <h2 className="success-title">Siparişiniz Alındı!</h2>

        {!hasOrder && (
          <p className="success-details">
            Henüz bir sipariş bulunamadı. Yeni bir sipariş oluşturmak için{" "}
            <Link to="/order">form sayfasına</Link> gidebilirsiniz.
          </p>
        )}

        {hasOrder && (
          <>
            <p className="success-details">
              <strong>Position Absolute Acı Pizza</strong> için verdiğiniz
              sipariş başarıyla alındı.
            </p>

            <div className="success-divider" />

            <p className="success-details">
              <strong>Ad Soyad:</strong> {order.customerName}
              <br />
              <strong>Boyut:</strong> {order.size}
              <br />
              <strong>Hamur:</strong> {order.crust}
              <br />
              <strong>Ek Malzemeler:</strong>{" "}
              {order.toppings && order.toppings.length > 0
                ? order.toppings.join(", ")
                : "Seçilmedi"}
              <br />
              <strong>Adet:</strong> {order.quantity}
            </p>

            <div className="success-divider" />

            {order.prices && (
              <p className="success-details">
                <strong>Seçimler:</strong> {order.prices.extras.toFixed(2)}₺
                <br />
                <strong>Toplam:</strong> {order.prices.total.toFixed(2)}₺
              </p>
            )}

            {order.apiResponse && (
              <>
                <div className="success-divider" />
                <p className="success-details">
                  <strong>Sunucu Yanıtı:</strong>
                  <br />
                  <code>
                    id: {order.apiResponse.id} – createdAt:{" "}
                    {order.apiResponse.createdAt}
                  </code>
                </p>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Success;
