import React from "react";
import "./OrderForm.css";

/**
 * Tek ek malzeme (topping) checkbox bileşeni.
 * Gerçek bir <input type="checkbox" /> içerir,
 * pill görünümü label üzerinde CSS ile verilir.
 */
function AdditionCheckBox({ label, value, checked, onChange }) {
  const finalValue = value || label;
  const id = `topping-${finalValue.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="topping-item">
      <input
        id={id}
        type="checkbox"
        name="toppings"
        value={finalValue}
        checked={checked}
        onChange={onChange}
        className="topping-input-visually-hidden"
      />

      <label
        htmlFor={id}
        className={`topping-pill ${checked ? "topping-pill--checked" : ""}`}
        role="checkbox"
        aria-checked={checked}
      >
        <span className="topping-pill-label">{label}</span>
      </label>
    </div>
  );
}

export default AdditionCheckBox;
