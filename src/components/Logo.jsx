// src/components/Logo.jsx
import React from "react";
import footerLogo from "../assets/iteration-2-images/footer/logo-footer.svg";

function Logo({ className = "" }) {
  return (
    <img
      src={footerLogo}
      alt="Teknolojik Yemekler"
      className={`logo ${className}`}
    />
  );
}

export default Logo;
