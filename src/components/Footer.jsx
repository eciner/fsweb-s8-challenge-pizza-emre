// src/components/Footer.jsx
import React from "react";
import Logo from "./Logo";
import "./Footer.css";

const hotMenu = [
  "Terminal Pizza",
  "5 Kişilik Hackathlon Pizza",
  "useEffect Tavuklu Pizza",
  "Beyaz Console Frosty",
  "Tester Geçti Mutlu Burger",
  "Position Absolute Acı Burger",
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div>
            <Logo className="footer-logo" />
            <div className="footer-contact">
              <p>341 Londonderry Road,</p>
              <p>Istanbul Türkiye</p>
              <p>aciktim@teknolojikyemekler.com</p>
              <p>+90 216 123 45 67</p>
            </div>
          </div>

          <div>
            <h4 className="footer-section-title">Sıcacık Menüler</h4>
            <ul className="footer-list">
              {hotMenu.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-section-title">Instagram</h4>
            <div className="footer-instagram-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="footer-instagram-item" />
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">© 2025 Teknolojik Yemekler.</div>
      </div>
    </footer>
  );
}

export default Footer;
