export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <h4>Han's Ribbon Bouquet</h4>
          <p>Bringing fresh, beautiful flowers to your door since 2023. Locally owned and operated with love.</p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><a href="#featured">Shop All</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#advisor">AI Advisor</a></li>
            <li><a href="#about">Our Mission</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <p><a href="mailto:hello@hansribbonbouquet.com">hello@hansribbonbouquet.com</a></p>
          <p>(555) BOUQUET</p>
          <p style={{marginTop:'0.5rem'}}>123 Floral Lane,<br/>Anytown, USA</p>
        </div>
        <div>
          <h5>Connect</h5>
          <div className="social-row">
            <a className="social-link" href="#"><i className="fab fa-instagram"></i></a>
            <a className="social-link" href="#"><i className="fab fa-facebook-f"></i></a>
            <a className="social-link" href="#"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Han's Ribbon Bouquet. All rights reserved. Made with 🌸
      </div>
    </footer>
  );
}
