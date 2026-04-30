import { useState, useEffect, useRef } from 'react';

export default function Header({ openModal, cartOpen, setCartOpen, cartCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header>
      <nav>
        <a href="#" className="logo-area">
          <img 
            className="logo-img"
            src="https://placehold.co/112x112/f8bbd0/4a148c?text=✿"
            alt="Han's Ribbon Bouquet"
          />
          <div>
            <div className="brand-name">Han's Ribbon Bouquet</div>
            <div className="brand-tag">floral artistry for every occasion</div>
          </div>
        </a>

        <div className="nav-links">
          <a href="#featured">Shop</a>
          <a href="#gallery">Gallery</a>
          <a href="#advisor">AI Advisor</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="nav-btn" onClick={openModal}>
            <i className="fa-solid fa-paintbrush" style={{marginRight:'6px',fontSize:'0.75rem'}}></i>
            Design Yours
          </button>
          <button className="cart-btn" title="Cart" onClick={() => setCartOpen(!cartOpen)}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-badge" id="cartBadge">{cartCount}</span>
          </button>
        </div>

        <button 
          className={`mobile-toggle ${mobileOpen ? 'active' : ''}`} 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <a href="#featured" onClick={closeMobile}>Shop</a>
        <a href="#gallery" onClick={closeMobile}>Gallery</a>
        <a href="#advisor" onClick={closeMobile}>AI Advisor</a>
        <a href="#about" onClick={closeMobile}>About</a>
        <a href="#contact" onClick={closeMobile}>Contact</a>
        <button className="nav-btn" style={{marginTop:'0.5rem',width:'100%',borderRadius:'10px'}} onClick={() => { openModal(); closeMobile(); }}>
          Design Your Own
        </button>
      </div>
    </header>
  );
}
