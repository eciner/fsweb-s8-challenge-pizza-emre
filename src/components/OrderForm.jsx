// src/components/OrderForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./OrderForm.css";

const BASE_PRICE = 85.5;
const EXTRA_PRICE = 5;

const SIZES = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
];

const CRUSTS = ["Süper İnce", "İnce", "Orta", "Kalın"];

const TOPPINGS = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Parça",
  "Soğan",
  "Mısır",
  "Sucuk",
  "Ananas",
  "Jalapeno",
  "Kabak",
  "Sarımsak",
];

const INITIAL_FORM = {
  customerName: "",
  size: "",
  crust: "",
  toppings: [],
  notes: "",
  quantity: 1,
};

function OrderForm({ onOrderSubmit }) {
  const history = useHistory();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [prices, setPrices] = useState({ extras: 0, total: BASE_PRICE });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Fiyat hesaplama
  useEffect(() => {
    const extrasCost = form.toppings.length * EXTRA_PRICE * form.quantity;
    const totalCost = BASE_PRICE * form.quantity + extrasCost;
    setPrices({
      extras: extrasCost,
      total: totalCost,
    });
  }, [form.toppings.length, form.quantity]);

  const validate = (values) => {
    const newErrors = {};

    if (!values.customerName || values.customerName.trim().length < 3) {
      newErrors.customerName = "İsim en az 3 karakter olmalı.";
    }

    if (!values.size) {
      newErrors.size = "Lütfen pizza boyutunu seçin.";
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

  useEffect(() => {
    setErrors(validate(form));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.customerName, form.size, form.crust, form.toppings.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeSelect = (value) => {
    setForm((prev) => ({ ...prev, size: value }));
  };

  const handleCrustSelect = (value) => {
    setForm((prev) => ({ ...prev, crust: value }));
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;

    setForm((prev) => {
      const current = new Set(prev.toppings);
      if (checked) {
        current.add(value);
      } else {
        current.delete(value);
      }
      return {
        ...prev,
        toppings: Array.from(current),
      };
    });
  };

  // Toggle topping by name (used by pill UI)
  const handleToppingToggle = (topping) => {
    setForm((prev) => {
      const current = new Set(prev.toppings);
      if (current.has(topping)) {
        current.delete(topping);
      } else {
        // enforce max 10
        if (current.size >= 10) return prev;
        current.add(topping);
      }
      return { ...prev, toppings: Array.from(current) };
    });
  };

  const handleQuantityChange = (delta) => {
    setForm((prev) => {
      const next = prev.quantity + delta;
      if (next < 1) return prev;
      return { ...prev, quantity: next };
    });
  };

  const canSubmit =
    Object.keys(errors).length === 0 &&
    form.customerName.trim().length >= 3 &&
    form.size &&
    form.crust &&
    form.toppings.length >= 4 &&
    !isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalErrors = validate(form);
    setErrors(finalErrors);

    if (Object.keys(finalErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      name: form.customerName.trim(),
      size: form.size,
      crust: form.crust,
      toppings: form.toppings,
      notes: form.notes.trim(),
      quantity: form.quantity,
      price: prices.total,
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        payload,
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );

      if (onOrderSubmit) {
        onOrderSubmit(response.data);
      }
      history.push("/success");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Sipariş gönderilirken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="order-form-section">
      <div className="order-form-layout">
        {/* SOL: FORM */}
        <form className="order-form-card" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="customerName">İsim Soyisim</label>
            <input
              id="customerName"
              name="customerName"
              type="text"
              placeholder="Örn: Emre Ciner"
              value={form.customerName}
              onChange={handleChange}
            />
            {errors.customerName && (
              <p className="form-error">{errors.customerName}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <span className="label-with-star">
                Boyut Seç <span>*</span>
              </span>
              <div className="size-pill-group">
                {SIZES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={`size-pill ${
                      form.size === s.value ? "size-pill--active" : ""
                    }`}
                    onClick={() => handleSizeSelect(s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {errors.size && <p className="form-error">{errors.size}</p>}
            </div>

            <div className="form-group">
              <span className="label-with-star">
                Hamur Seç <span>*</span>
              </span>
              <div className="crust-pill-group">
                {CRUSTS.map((crust) => (
                  <button
                    key={crust}
                    type="button"
                    className={`crust-pill ${
                      form.crust === crust ? "crust-pill--active" : ""
                    }`}
                    onClick={() => handleCrustSelect(crust)}
                  >
                    {crust}
                  </button>
                ))}
              </div>
              {errors.crust && <p className="form-error">{errors.crust}</p>}
            </div>
          </div>

          <div className="form-group">
            <span className="label-with-star">
              Ek Malzemeler (4–10 arası) <span>*</span>
            </span>
            <div className="toppings-grid">
              {TOPPINGS.map((topping) => {
                const isSelected = form.toppings.includes(topping);
                const isDisabled = !isSelected && form.toppings.length >= 10;
                return (
                  <label
                    key={topping}
                    className={`topping-pill ${
                      isSelected ? "topping-pill--active" : ""
                    } ${isDisabled ? "topping-pill--disabled" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isDisabled) return;
                      handleToppingToggle(topping);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (isDisabled) return;
                        handleToppingToggle(topping);
                      }
                    }}
                  >
                    {/* hidden input for accessibility / forms */}
                    <input
                      type="checkbox"
                      name="toppings"
                      value={topping}
                      checked={isSelected}
                      readOnly
                      aria-checked={isSelected}
                      tabIndex={-1}
                    />
                    <span className="topping-pill-box" />
                    <span className="topping-pill-label">{topping}</span>
                  </label>
                );
              })}
            </div>
            {errors.toppings && <p className="form-error">{errors.toppings}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="notes">Sipariş Notu</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-footer-row">
            <div className="quantity-control">
              <span>Adet</span>
              <div className="quantity-buttons">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Adeti azalt"
                >
                  -
                </button>
                <span>{form.quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Adeti artır"
                >
                  +
                </button>
              </div>
            </div>

            <div className="submit-area">
              {submitError && (
                <p className="form-error form-error--global">{submitError}</p>
              )}
              <button
                type="submit"
                className="btn-primary order-submit-button"
                disabled={!canSubmit}
              >
                {isSubmitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
              </button>
            </div>
          </div>
        </form>

        {/* SAĞ: SİPARİŞ ÖZETİ */}
        <aside className="order-summary-card">
          <h3>SİPARİŞ TOPLAMI</h3>
          <div className="order-summary-product">
            <span className="order-summary-product-name">
              Position Absolute Acı Pizza
            </span>
          </div>

          <div className="order-summary-details">
            <p className="summary-label">Sipariş Detayları</p>
            <div className="summary-row">
              <span>Adet</span>
              <span>{form.quantity}</span>
            </div>
            <div className="summary-row">
              <span>Boyut</span>
              <span>{form.size || "-"}</span>
            </div>
            <div className="summary-row">
              <span>Hamur</span>
              <span>{form.crust || "-"}</span>
            </div>
            <div className="summary-row">
              <span>Ek Malzemeler</span>
              <span>
                {form.toppings.length === 0
                  ? "Henüz seçilmedi"
                  : form.toppings.join(", ")}
              </span>
            </div>
          </div>

          <div className="order-summary-totals">
            <div className="summary-row">
              <span>Seçimler</span>
              <span>{prices.extras.toFixed(2)}₺</span>
            </div>
            <div className="summary-row summary-row--strong">
              <span>Toplam</span>
              <span>{prices.total.toFixed(2)}₺</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default OrderForm;
