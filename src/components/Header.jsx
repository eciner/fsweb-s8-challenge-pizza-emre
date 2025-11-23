// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-header-title">
          Teknolojik Yemekler
        </Link>
      </div>
    </header>
  );
}

export default Header;
