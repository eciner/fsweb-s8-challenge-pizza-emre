// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import Logo from "./Logo";

import iconLocation from "../assets/iteration-2-images/footer/icons/icon-1.png";
import iconMail from "../assets/iteration-2-images/footer/icons/icon-2.png";
import iconPhone from "../assets/iteration-2-images/footer/icons/icon-3.png";

import insta0 from "../assets/iteration-2-images/footer/insta/li-0.png";
import insta1 from "../assets/iteration-2-images/footer/insta/li-1.png";
import insta2 from "../assets/iteration-2-images/footer/insta/li-2.png";
import insta3 from "../assets/iteration-2-images/footer/insta/li-3.png";
import insta4 from "../assets/iteration-2-images/footer/insta/li-4.png";
import insta5 from "../assets/iteration-2-images/footer/insta/li-5.png";

const hotMenu = [
  "Terminal Pizza",
  "5 Kişilik Hackathlon Pizza",
  "useEffect Tavuklu Pizza",
  "Beyaz Console Frosty",
  "Tester Geçti Mutlu Burger",
  "Position Absolute Acı Burger",
];

const instaImages = [insta0, insta1, insta2, insta3, insta4, insta5];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-col">
            <Logo className="footer-logo" />
            <div className="footer-contact">
              <div className="footer-contact-row">
                <img src={iconLocation} alt="" />
                <p>341 Londonderry Road, Istanbul Türkiye</p>
              </div>
              <div className="footer-contact-row">
                <img src={iconMail} alt="" />
                <p>aciktim@teknolojikyemekler.com</p>
              </div>
              <div className="footer-contact-row">
                <img src={iconPhone} alt="" />
                <p>+90 216 123 45 67</p>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-section-title">Sıcacık Menüler</h4>
            <ul className="footer-list">
              {hotMenu.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-section-title">Instagram</h4>
            <div className="footer-instagram-grid">
              {instaImages.map((src, index) => (
                <div key={index} className="footer-instagram-item">
                  <img src={src} alt={`Instagram ${index + 1}`} />
                </div>
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
