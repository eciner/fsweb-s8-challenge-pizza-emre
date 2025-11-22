// src/components/Logo.jsx
import React from "react";
import logoSrc from "../assets/logo.svg";

function Logo({ className = "" }) {
  return (
    <img
      src={logoSrc}
      alt="Teknolojik Yemekler"
      className={`logo ${className}`}
    />
  );
}

export default Logo;
