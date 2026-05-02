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
import AuthModal from './components/AuthModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([
    { id:1, name:'Blushing Romance', price:70.00, qty:1 },
    { id:3, name:'Velvet Harmony', price:80.00, qty:1 }
  ]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const savedUser = localStorage.getItem('ribbon_flower_current_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('ribbon_flower_current_user');
      }
    }

    const handleUserLogin = (e) => {
      setCurrentUser(e.detail);
    };
    const handleUserLogout = () => {
      setCurrentUser(null);
    };

    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);

    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  useEffect(() => {
    window.updateCart = () => {
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

  const handleAuthRequired = (e) => {
    if (!currentUser) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setAuthModalOpen(true);
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('ribbon_flower_current_user');
    setCurrentUser(null);
    window.dispatchEvent(new CustomEvent('userLogout'));
  };

  return (
    <>
      <Cursor />
      <PetalRain />
      <Toast />
      <Header 
        openAuth={() => setAuthModalOpen(true)}
        openModal={() => {
          if (handleAuthRequired()) {
            setModalOpen(true);
          }
        }}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <Hero />
      <FeaturedProducts 
        setCartItems={setCartItems}
        requireAuth={handleAuthRequired}
      />
      <Gallery 
        openModal={() => {
          if (handleAuthRequired()) {
            setModalOpen(true);
          }
        }}
        requireAuth={handleAuthRequired}
      />
      <AIAdvisor />
      <About />
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
        requireAuth={handleAuthRequired}
      />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ScrollToTop />
    </>
  );
}

export default App;
