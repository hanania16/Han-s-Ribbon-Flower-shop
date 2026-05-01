import { useState } from 'react';
import '../css/Footer.css';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      // In a real app, this would send to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    } catch {
      setFormStatus('error');
    }
  };

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
          <p className="footer-contact-margin">123 Floral Lane,<br/>Anytown, USA</p>
        </div>
        <div>
          <h5>Send us a Message</h5>
          <form onSubmit={handleSubmit} className="footer-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              required
            />
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className={formStatus === 'success' ? 'submit-success' : ''}
            >
              {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : 'Send Message'}
            </button>
            {formStatus === 'error' && (
              <p className="error-message">Failed to send. Please try again.</p>
            )}
          </form>
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
