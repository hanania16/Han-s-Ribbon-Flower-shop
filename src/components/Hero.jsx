import '../css/Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-ring hero-ring-1"></div>
      <div className="hero-ring hero-ring-2"></div>
      <div className="hero-ring hero-ring-3"></div>

      <svg className="hero-badge" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="60" y="75" textAnchor="middle" fontSize="80" fill="#e91e63">✿</text>
      </svg>

      <div className="hero-content">
        <div className="hero-eyebrow">✦ Handcrafted with Love ✦</div>
        <h1>Exquisite<br/><span>Floral Artistry</span></h1>
        <p>Hand-tied bouquets, crafted with passion and elegance for every precious moment.</p>
        <div className="hero-cta-container">
          <a href="#featured" className="hero-cta">
            <i className="fa-solid fa-cart-shopping"></i>
            Order Now
          </a>
           <a href="#gallery" className="cta-outline-btn">Explore Collection</a>
        </div>
      </div>
    </section>
  );
}
