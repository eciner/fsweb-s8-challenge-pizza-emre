// src/components/AdditionCheckBox.jsx
import React from "react";
import "./OrderForm.css";

/**
 * Tek ek malzeme (topping) checkbox bileşeni.
 * Gerçek bir <input type="checkbox" /> içerir ama görünümünü
 * kendi kutumuzla özelleştiriyoruz.
 */
function AdditionCheckBox({ label, value, checked, onChange, onToggle }) {
  // Accept either `onChange` (used by OrderForm) or `onToggle` (older name)
  const handleChange = onChange || onToggle || (() => {});
  const activeClass = checked ? "topping-checkbox--active" : "";

  return (
    <label className={`topping-checkbox ${activeClass}`}>
      <input
        type="checkbox"
        name="toppings"
        value={value || label}
        checked={checked}
        onChange={handleChange}
        aria-checked={checked}
      />
      <span className="topping-custom-box" aria-hidden />
      <span className="topping-label-text">{label}</span>
    </label>
  );
}

export default AdditionCheckBox;
