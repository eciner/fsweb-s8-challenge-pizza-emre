// src/components/AdditionCheckBox.jsx
import React from "react";
import "./OrderForm.css"; // custom checkbox stilleri burada

function AdditionCheckBox({ label, value, checked, onChange }) {
  const id = `topping-${value}`;

  return (
    <label className="topping-checkbox" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        name="toppings"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="topping-custom-box" />
      <span className="topping-label-text">{label}</span>
    </label>
  );
}

export default AdditionCheckBox;
