// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Header.css";

function Header({ showBreadcrumb = false }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      {showBreadcrumb && (
        <div className="order-breadcrumb">
          Anasayfa &nbsp; &gt; &nbsp; Seçenekler &nbsp; &gt;{" "}
          <strong>Sipariş Oluştur</strong>
        </div>
      )}
    </header>
  );
}

export default Header;
