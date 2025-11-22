// src/components/AdditionCheckBox.jsx
import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

function AdditionCheckBox({ label, value, checked, onChange, invalid }) {
  return (
    <FormGroup check inline>
      <Label check>
        <Input
          type="checkbox"
          name="toppings"
          value={value}
          onChange={onChange}
          checked={checked}
          invalid={invalid}
        />{" "}
        {label}
      </Label>
    </FormGroup>
  );
}

export default AdditionCheckBox;
