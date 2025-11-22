// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

const categoriesTop = [
  "YENİ! Kore",
  "Pizza",
  "Burger",
  "Kızartmalar",
  "Fast food",
  "Gazlı İçecek",
];

const filterButtons = ["Ramen", "Pizza", "Burger", "French Fries"];

const products = [
  {
    name: "Terminal Pizza",
    price: "60₺",
    rating: "4.9",
    votes: "(200)",
    category: "Pizza",
  },
  {
    name: "Position Absolute Acı Pizza",
    price: "85₺",
    rating: "4.9",
    votes: "(829)",
    category: "Pizza",
  },
  {
    name: "useEffect Tavuklu Burger",
    price: "75₺",
    rating: "4.9",
    votes: "(462)",
    category: "Burger",
  },
];

function Home() {
  // Üst kategori barı için (sadece görsel highlight)
  const [activeTopCategory, setActiveTopCategory] = useState("Pizza");

  // Ramen / Pizza / Burger / French Fries filtreleri
  const [activeFilter, setActiveFilter] = useState("Pizza");

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "Pizza") return p.category === "Pizza";
    if (activeFilter === "Burger") return p.category === "Burger";
    // Ramen & French Fries için şu an ürün yok, liste boş kalsın
    if (activeFilter === "Ramen") return p.category === "Ramen";
    if (activeFilter === "French Fries") return p.category === "French Fries";
    return true;
  });

  return (
    <div className="home-page">
      <Header />

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-heading">
            <span>KOD ACIKTIRIR</span>
            <span>PİZZA, DOYURUR</span>
          </h1>
          <div className="home-hero-cta">
            <Link to="/order">
              <button type="button">ACIKTIM</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ana içerik */}
      <main className="home-main">
        {/* Kategori bar */}
        <div className="category-bar">
          {categoriesTop.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${
                activeTopCategory === cat ? "category-pill--active" : ""
              }`}
              onClick={() => setActiveTopCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured kartlar alanı – sade placeholder */}
        <section className="featured-section">
          <article className="featured-main-card">
            <h3 className="featured-main-title">Özel Lezzetus</h3>
            <p className="featured-main-text">
              Position Absolute Acı Burger ile kodlara meydan oku.
            </p>
            <Link to="/order" className="featured-link">
              Sipariş Ver
            </Link>
          </article>

          <article className="featured-side-card">
            <h3 className="featured-side-title">Çooook hızlı npm gibi kurye</h3>
            <p className="featured-side-text">Siparişin sıcak sıcak kapında.</p>
            <Link to="/order" className="featured-link">
              Sipariş Ver
            </Link>
          </article>
        </section>

        {/* En çok paketlenen menüler */}
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

        {/* Pizza grid */}
        <section className="product-grid">
          {filteredProducts.length === 0 ? (
            <div className="product-grid-empty">
              Bu kategori için henüz ürün eklenmedi.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <article key={p.name} className="product-card">
                <div className="product-card-title">{p.name}</div>
                <div className="product-card-meta">
                  <span>
                    {p.rating} {p.votes}
                  </span>
                  <span>{p.price}</span>
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
