// src/components/OrderForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AdditionCheckBox from "./AdditionCheckBox";
import "./OrderForm.css";

const BASE_PRICE = 85.5;
const EXTRA_PRICE = 5;

const INITIAL_FORM = {
  customerName: "",
  size: "",
  crust: "",
  toppings: [],
  notes: "",
  quantity: 1,
};

const INITIAL_ERRORS = {
  customerName: "",
  size: "",
  crust: "",
  toppings: "",
};

const TOPPING_OPTIONS = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Parça",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalapeno",
  "Sarımsak",
  "Ananas",
  "Kabak",
];

function OrderForm({ onOrderSubmit }) {
  const history = useHistory();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [canSubmit, setCanSubmit] = useState(false);
  const [prices, setPrices] = useState({
    extras: 0,
    total: BASE_PRICE,
  });

  useEffect(() => {
    const extrasCost = form.toppings.length * EXTRA_PRICE * form.quantity;
    const totalCost = BASE_PRICE * form.quantity + extrasCost;

    setPrices({
      extras: extrasCost,
      total: totalCost,
    });
  }, [form.toppings, form.quantity]);

  const validate = (values) => {
    const newErrors = { ...INITIAL_ERRORS };

    if (values.customerName.trim().length < 3) {
      newErrors.customerName = "İsim en az 3 karakter olmalı.";
    }

    if (!values.size) {
      newErrors.size = "Lütfen bir pizza boyutu seçin.";
    }

    if (!values.crust) {
      newErrors.crust = "Lütfen hamur kalınlığını seçin.";
    }

    if (values.toppings.length < 4) {
      newErrors.toppings = "En az 4 malzeme seçmelisiniz.";
    } else if (values.toppings.length > 10) {
      newErrors.toppings = "En fazla 10 malzeme seçebilirsiniz.";
    }

    return newErrors;
  };

  const syncValidity = (validationErrors) => {
    const hasError = Object.values(validationErrors).some(
      (msg) => msg && msg.length > 0
    );
    setCanSubmit(!hasError);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextForm = { ...form };

    if (name === "toppings") {
      const exists = form.toppings.includes(value);
      nextForm.toppings = exists
        ? form.toppings.filter((t) => t !== value)
        : [...form.toppings, value];
    } else if (name === "quantity") {
      const parsed = Number(value);
      nextForm.quantity = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    } else {
      nextForm[name] = value;
    }

    const validationErrors = validate(nextForm);
    setForm(nextForm);
    setErrors(validationErrors);
    syncValidity(validationErrors);
  };

  const handleQuantityChange = (delta) => {
    const newQty = Math.max(1, form.quantity + delta);
    const nextForm = { ...form, quantity: newQty };
    const validationErrors = validate(nextForm);

    setForm(nextForm);
    setErrors(validationErrors);
    syncValidity(validationErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    const hasError = Object.values(validationErrors).some(
      (msg) => msg && msg.length > 0
    );

    if (hasError) {
      setCanSubmit(false);
      return;
    }

    try {
      const payload = {
        isim: form.customerName,
        boyut: form.size,
        hamur: form.crust,
        malzemeler: form.toppings,
        notlar: form.notes,
        adet: form.quantity,
      };

      const response = await axios.post(
        "https://reqres.in/api/pizza",
        payload,
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );

      console.log("API yanıtı:", response.data);

      const orderForApp = {
        ...form,
        prices,
        apiResponse: response.data,
      };

      onOrderSubmit(orderForApp);
      history.push("/success");
    } catch (error) {
      console.error("Sipariş gönderilirken hata:", error);
      alert(
        "Şu anda sipariş gönderilirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin."
      );
    }
  };

  return (
    <div className="order-layout">
      {/* Sol: form */}
      <section className="order-form-card">
        <h2 className="order-title">Position Absolute Acı Pizza</h2>
        <div className="order-price">85.50₺</div>
        <p className="order-description">
          Frontend dev olarak hâlâ position-static kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde fırında yüksek sıcaklıklarda pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* İsim */}
          <div className="form-field">
            <label htmlFor="customerName">İsim Soyisim</label>
            <input
              id="customerName"
              name="customerName"
              className="order-input"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Örn: Emre Ciner"
            />
            {errors.customerName && (
              <div className="order-error-text">{errors.customerName}</div>
            )}
          </div>

          {/* Boyut */}
          <div className="form-field">
            <label>Boyut Seç *</label>
            <div className="size-options">
              {["S", "M", "L"].map((size) => {
                const label =
                  size === "S" ? "Küçük" : size === "M" ? "Orta" : "Büyük";
                const selected = form.size === label;
                return (
                  <label
                    key={size}
                    className={`size-pill ${
                      selected ? "size-pill--selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={label}
                      checked={selected}
                      onChange={handleChange}
                    />
                    {size}
                  </label>
                );
              })}
            </div>
            {errors.size && (
              <div className="order-error-text">{errors.size}</div>
            )}
          </div>

          {/* Hamur */}
          <div className="form-field">
            <label>Hamur Seç *</label>
            <div className="crust-options">
              {["Süper İnce", "İnce", "Orta", "Kalın"].map((option) => {
                const selected = form.crust === option;
                return (
                  <label
                    key={option}
                    className={`crust-pill ${
                      selected ? "crust-pill--selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="crust"
                      value={option}
                      checked={selected}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            {errors.crust && (
              <div className="order-error-text">{errors.crust}</div>
            )}
          </div>

          {/* Ek Malzemeler */}
          <div className="form-field">
            <label>Ek Malzemeler (4–10 arası)</label>
            <div className="toppings-grid">
              {TOPPING_OPTIONS.map((item) => (
                <AdditionCheckBox
                  key={item}
                  label={item}
                  value={item}
                  checked={form.toppings.includes(item)}
                  onChange={handleChange}
                />
              ))}
            </div>
            {errors.toppings && (
              <div className="order-error-text">{errors.toppings}</div>
            )}
          </div>

          {/* Notlar */}
          <div className="form-field">
            <label htmlFor="notes">Sipariş Notu</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="order-textarea"
              value={form.notes}
              onChange={handleChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
          </div>

          {/* Adet */}
          <div className="form-field">
            <label>Adet</label>
            <div className="quantity-row">
              <div className="order-quantity-control">
                <button type="button" onClick={() => handleQuantityChange(-1)}>
                  -
                </button>
                <span>{form.quantity}</span>
                <button type="button" onClick={() => handleQuantityChange(1)}>
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="order-submit-button"
            disabled={!canSubmit}
          >
            SİPARİŞ VER
          </button>
        </form>
      </section>

      {/* Sağ: canlı özet */}
      <aside className="order-summary-card">
        <h2 className="order-summary-title">Sipariş Toplamı</h2>
        <p className="order-summary-subtitle">Position Absolute Acı Pizza</p>

        <div className="order-summary-section">
          <p className="order-summary-label">Sipariş Detayları</p>
          <div className="order-summary-line">
            <span>Adet</span>
            <span>{form.quantity}</span>
          </div>
          <div className="order-summary-line">
            <span>Boyut</span>
            <span>{form.size || "-"}</span>
          </div>
          <div className="order-summary-line">
            <span>Hamur</span>
            <span>{form.crust || "-"}</span>
          </div>
        </div>

        <div className="order-summary-section">
          <p className="order-summary-label">Ek Malzemeler</p>
          <div className="order-summary-line">
            <span>Seçimler</span>
            <span>
              {form.toppings.length > 0
                ? form.toppings.join(", ")
                : "Henüz seçilmedi"}
            </span>
          </div>
        </div>

        <div className="order-summary-section order-summary-section--totals">
          <p className="order-summary-label">Tutar</p>
          <div className="order-summary-line">
            <span>Seçimler</span>
            <span>{prices.extras.toFixed(2)}₺</span>
          </div>
          <div className="order-summary-line">
            <span>Toplam</span>
            <span className="order-summary-total-amount">
              {prices.total.toFixed(2)}₺
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default OrderForm;
