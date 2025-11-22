// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <div className="home-content">
        <Logo className="home-logo" />

        <h1 className="home-heading">
          <span>KOD ACIKTIRIR</span>
          <span>PİZZA, DOYURUR</span>
        </h1>

        <div className="home-cta">
          <Link to="/order">
            <button type="button" className="home-cta-button">
              ACIKTIM
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
