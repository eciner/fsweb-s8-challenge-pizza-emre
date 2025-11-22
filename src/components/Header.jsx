// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Header.css";

function Header() {
  return (
    <header className="order-header">
      <div className="order-header-inner">
        <div className="order-header-logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="order-header-breadcrumb">
          <span>Anasayfa</span> - <strong>Sipariş Oluştur</strong>
        </div>
      </div>
    </header>
  );
}

export default Header;
