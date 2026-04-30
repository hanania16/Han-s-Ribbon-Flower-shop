import { useState, useEffect } from 'react';
import './App.css';
import Cursor from './components/Cursor';
import PetalRain from './components/PetalRain';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Gallery from './components/Gallery';
import About from './components/About';
import AIAdvisor from './components/AIAdvisor';
import CTABand from './components/CTABand';
import Footer from './components/Footer';
import DesignModal from './components/DesignModal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import Cart from './components/Cart';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id:1, name:'Blushing Romance', price:70.00, qty:1 },
    { id:3, name:'Velvet Harmony', price:80.00, qty:1 }
  ]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    window.updateCart = (count) => {
      // This is handled by local state now
    };
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <PetalRain />
      <Toast />
      <Header 
        openModal={() => setModalOpen(true)} 
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
      />
      <Hero />
      <FeaturedProducts setCartItems={setCartItems} />
      <Gallery openModal={() => setModalOpen(true)} />
      <About />
      <AIAdvisor />
      <CTABand />
      <Footer />
      <DesignModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
      <Cart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <ScrollToTop />
    </>
  );
}

export default App;
