// src/components/OrderForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
} from "reactstrap";

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
  "Mantar",
  "Mısır",
  "Sucuk",
  "Soğan",
  "Zeytin",
  "Biber",
  "Domates",
  "Jalapeno",
  "Ananas",
  "Mozzarella",
];

function OrderForm({ onOrderComplete }) {
  const history = useHistory();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [canSubmit, setCanSubmit] = useState(false);
  const [prices, setPrices] = useState({
    extras: 0,
    total: BASE_PRICE,
  });

  // Fiyatı hesapla (toppings + quantity)
  useEffect(() => {
    const extrasCost = form.toppings.length * EXTRA_PRICE * form.quantity;
    const totalCost = BASE_PRICE * form.quantity + extrasCost;

    setPrices({
      extras: extrasCost,
      total: totalCost,
    });
  }, [form.toppings, form.quantity]);

  // Formu kontrol eden fonksiyon
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

  // Her değişimde formu güncelle + validasyon yap
  const handleChange = (event) => {
    const { name, value, type } = event.target;

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

    // Hatasız ise submit açılabilir
    const hasError = Object.values(validationErrors).some(
      (msg) => msg && msg.length > 0
    );
    setCanSubmit(!hasError);
  };

  const handleQuantityChange = (delta) => {
    const newQty = Math.max(1, form.quantity + delta);
    const nextForm = { ...form, quantity: newQty };
    const validationErrors = validate(nextForm);
    setForm(nextForm);
    setErrors(validationErrors);
    const hasError = Object.values(validationErrors).some(
      (msg) => msg && msg.length > 0
    );
    setCanSubmit(!hasError);
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

      // App seviyesinde saklayacağımız veri
      const orderForApp = {
        ...form,
        prices,
        apiResponse: response.data,
      };

      onOrderComplete(orderForApp);

      history.push("/success");
    } catch (error) {
      console.error("Sipariş gönderilirken hata:", error);
      alert(
        "Şu anda sipariş gönderilirken bir sorun oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div className="order-form-wrapper">
      {/* Sol: form */}
      <section className="order-form-card">
        <Form onSubmit={handleSubmit} noValidate>
          {/* İsim */}
          <FormGroup>
            <Label for="customerName">İsim Soyisim</Label>
            <Input
              id="customerName"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Örn: Emre Ciner"
              invalid={Boolean(errors.customerName)}
            />
            {errors.customerName && (
              <div className="order-error-text">{errors.customerName}</div>
            )}
          </FormGroup>

          {/* Boyut */}
          <FormGroup tag="fieldset">
            <Label>Boyut Seçimi</Label>
            <Row>
              {["Küçük", "Orta", "Büyük"].map((size) => (
                <Col xs={4} key={size}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="size"
                        value={size}
                        checked={form.size === size}
                        onChange={handleChange}
                        invalid={Boolean(errors.size)}
                      />{" "}
                      {size}
                    </Label>
                  </FormGroup>
                </Col>
              ))}
            </Row>
            {errors.size && (
              <div className="order-error-text">{errors.size}</div>
            )}
          </FormGroup>

          {/* Hamur */}
          <FormGroup tag="fieldset">
            <Label>Hamur Kalınlığı</Label>
            {["İnce", "Orta", "Kalın"].map((option) => (
              <FormGroup check key={option}>
                <Label check>
                  <Input
                    type="radio"
                    name="crust"
                    value={option}
                    checked={form.crust === option}
                    onChange={handleChange}
                    invalid={Boolean(errors.crust)}
                  />{" "}
                  {option}
                </Label>
              </FormGroup>
            ))}
            {errors.crust && (
              <div className="order-error-text">{errors.crust}</div>
            )}
          </FormGroup>

          {/* Ek malzemeler */}
          <FormGroup>
            <Label>Ek Malzemeler (4–10 arası)</Label>
            <div>
              {TOPPING_OPTIONS.map((item) => (
                <AdditionCheckBox
                  key={item}
                  label={item}
                  value={item}
                  checked={form.toppings.includes(item)}
                  invalid={Boolean(errors.toppings)}
                  onChange={handleChange}
                />
              ))}
            </div>
            {errors.toppings && (
              <div className="order-error-text">{errors.toppings}</div>
            )}
          </FormGroup>

          {/* Notlar */}
          <FormGroup>
            <Label for="notes">Notlar</Label>
            <Input
              id="notes"
              type="textarea"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Eklemek istediğiniz bir not var mı?"
            />
          </FormGroup>

          {/* Adet */}
          <FormGroup>
            <Label>Adet</Label>
            <InputGroup>
              <div className="order-quantity-control">
                <button type="button" onClick={() => handleQuantityChange(-1)}>
                  -
                </button>
                <span>{form.quantity}</span>
                <button type="button" onClick={() => handleQuantityChange(1)}>
                  +
                </button>
              </div>
            </InputGroup>
          </FormGroup>

          <button
            type="submit"
            className="order-submit-button"
            disabled={!canSubmit}
          >
            SİPARİŞ VER
          </button>
        </Form>
      </section>

      {/* Sağ: özet + fiyat */}
      <aside className="order-summary-card">
        <h2 className="order-summary-title">Sipariş Özeti</h2>

        <div className="order-summary-line">
          <span>Pizza Adı</span>
          <span>Position Absolute Acı Pizza</span>
        </div>

        <div className="order-summary-line">
          <span>Adet</span>
          <span>{form.quantity}</span>
        </div>

        <div className="order-summary-line">
          <span>Ek Malzemeler</span>
          <span>
            {form.toppings.length > 0 ? form.toppings.join(", ") : "Seçilmedi"}
          </span>
        </div>

        <div className="order-summary-line">
          <span>Seçimler</span>
          <span>{prices.extras.toFixed(2)}₺</span>
        </div>

        <div className="order-summary-total">
          <div className="order-summary-line">
            <span>Toplam</span>
            <span>{prices.total.toFixed(2)}₺</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default OrderForm;
