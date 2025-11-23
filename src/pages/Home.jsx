// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

import kart1 from "../assets/iteration-2-images/cta/kart-1.png";
import kart2 from "../assets/iteration-2-images/cta/kart-2.png";
import kart3 from "../assets/iteration-2-images/cta/kart-3.png";

import food1 from "../assets/iteration-2-images/pictures/food-1.png";
import food2 from "../assets/iteration-2-images/pictures/food-2.png";
import food3 from "../assets/iteration-2-images/pictures/food-3.png";

import icon1 from "../assets/iteration-2-images/icons/1.svg";
import icon2 from "../assets/iteration-2-images/icons/2.svg";
import icon3 from "../assets/iteration-2-images/icons/3.svg";
import icon4 from "../assets/iteration-2-images/icons/4.svg";
import icon5 from "../assets/iteration-2-images/icons/5.svg";
import icon6 from "../assets/iteration-2-images/icons/6.svg";

const categoriesTop = [
  { name: "YENİ! Kore", icon: icon1 },
  { name: "Pizza", icon: icon2 },
  { name: "Burger", icon: icon3 },
  { name: "Kızartmalar", icon: icon4 },
  { name: "Fast food", icon: icon5 },
  { name: "Gazlı İçecek", icon: icon6 },
];

const filterButtons = ["Ramen", "Pizza", "Burger", "French Fries"];

const products = [
  {
    name: "Terminal Pizza",
    price: "60₺",
    rating: "4.9",
    votes: "(200)",
    category: "Pizza",
    image: food1,
  },
  {
    name: "Position Absolute Acı Pizza",
    price: "85₺",
    rating: "4.9",
    votes: "(829)",
    category: "Pizza",
    image: food2,
  },
  {
    name: "useEffect Tavuklu Burger",
    price: "75₺",
    rating: "4.9",
    votes: "(462)",
    category: "Burger",
    image: food3,
  },
];

function Home() {
  const [activeTopCategory, setActiveTopCategory] = useState("Pizza");
  const [activeFilter, setActiveFilter] = useState("Pizza");

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "Pizza") return p.category === "Pizza";
    if (activeFilter === "Burger") return p.category === "Burger";
    if (activeFilter === "Ramen") return p.category === "Ramen";
    if (activeFilter === "French Fries") return p.category === "French Fries";
    return true;
  });

  return (
    <div className="page home-page">
      <Header />

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-heading" data-cy="hero-heading">
            <span>KOD ACIKTIRIR</span>
            <span>PİZZA, DOYURUR</span>
          </h1>
          <div className="home-hero-cta">
            <Link to="/order">
              <button type="button" data-cy="hero-order-btn">
                ACIKTIM
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className="home-main">
        {/* Üst kategori barı */}
        <div className="category-bar">
          {categoriesTop.map((cat) => (
            <button
              key={cat.name}
              type="button"
              className={`category-pill ${
                activeTopCategory === cat.name ? "category-pill--active" : ""
              }`}
              onClick={() => setActiveTopCategory(cat.name)}
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="category-pill-icon"
              />
              <span className="category-pill-label">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Üst 3 CTA kartı */}
        <section className="featured-section">
          <article className="featured-main-card">
            <img src={kart1} alt="Özel Lezzetus" />
            <div className="featured-main-content">
              <h3 className="featured-main-title">Özel Lezzetus</h3>
              <p className="featured-main-text">
                Position Absolute Acı Burger ile kodlara meydan oku.
              </p>
              <Link to="/order" className="featured-link">
                Sipariş Ver
              </Link>
            </div>
          </article>

          <div className="featured-secondary">
            <article className="featured-side-card">
              <img src={kart2} alt="Hackatholn Burger Menü" />
              <div className="featured-side-content">
                <h3 className="featured-side-title">Hackathlon Burger Menü</h3>
                <p className="featured-side-text">
                  Hackathon gecelerine eşlik eden lezzetli burger menü.
                </p>
                <Link to="/order" className="featured-link">
                  Sipariş Ver
                </Link>
              </div>
            </article>

            <article className="featured-side-card featured-side-card--dark">
              <img src={kart3} alt="Çooook hızlı npm gibi kurye" />
              <div className="featured-side-content">
                <h3 className="featured-side-title">
                  Çoooook hızlı npm gibi kurye
                </h3>
                <p className="featured-side-text">
                  Siparişin sıcak sıcak kapında.
                </p>
                <Link
                  to="/order"
                  className="featured-link featured-link--light"
                >
                  Sipariş Ver
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Popüler menüler */}
        <section className="most-section">
          <div className="most-section-title-small">
            en çok paketlenen menüler
          </div>
          <div className="most-section-title-main">
            Acıktıran Kodlara Doyuran Lezzetler
          </div>

          <div className="most-filters">
            {filterButtons.map((btn) => (
              <button
                key={btn}
                type="button"
                className={`filter-pill ${
                  activeFilter === btn ? "filter-pill--active" : ""
                }`}
                onClick={() => setActiveFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </section>

        {/* Ürün kartları */}
        <section className="product-grid">
          {filteredProducts.length === 0 ? (
            <div className="product-grid-empty">
              Bu kategori için henüz ürün eklenmedi.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <article key={p.name} className="product-card">
                <div className="product-card-image-wrap">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="product-card-body">
                  <h4 className="product-card-title">{p.name}</h4>
                  <div className="product-card-meta">
                    <span>
                      {p.rating} {p.votes}
                    </span>
                    <span>{p.price}</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
