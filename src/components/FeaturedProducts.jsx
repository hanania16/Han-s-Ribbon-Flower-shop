import { useState } from 'react';
import '../css/FeaturedProducts.css';

const products = [
  {
    id:1,
    name: 'Blushing Romance',
    description: 'A delicate mix of pink and white roses, wrapped in satin.',
    price: 70.00,
    image: 'https://placehold.co/400x400/f8bbd0/4a148c?text=Elegant+Rose+Mix',
    tag: 'Bestseller',
    occasions: 'birthday,anniversary,gift'
  },
  {
    id:2,
    name: 'Sweet Serenity',
    description: 'Pastel carnations, hydrangeas, and delicate greenery.',
    price: 55.00,
    image: 'https://placehold.co/400x400/ffe0f0/6d28d9?text=Pastel+Delights',
    tag: '',
    occasions: 'table,gift'
  },
  {
    id:3,
    name: 'Velvet Harmony',
    description: 'Deep purple tulips, pink peonies, and subtle accents.',
    price: 80.00,
    image: 'https://placehold.co/400x400/f7e1ff/7b2cbf?text=Purple+Elegance',
    tag: 'New',
    occasions: 'anniversary,birthday'
  }
];

export default function FeaturedProducts({ setCartItems, requireAuth }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Occasions' },
    { key: 'birthday', label: 'Birthday' },
    { key: 'anniversary', label: 'Anniversary' },
    { key: 'table', label: 'Centerpiece' },
    { key: 'gift', label: 'General Gift' }
  ];

  const addToCart = (product, btn) => {
    if (requireAuth && !requireAuth()) {
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? {...item, qty: item.qty + 1} : item
        );
      }
      return [...prev, {...product, qty:1}];
    });
    
    const badge = document.getElementById('cartBadge');
    badge.style.animation = 'none';
    badge.offsetHeight;
    badge.style.animation = 'badgePop 0.3s ease';
    
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.classList.add('add-btn-added');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('add-btn-added');
    }, 1200);
    
    showToast();
  };

  const showToast = () => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  };

  const isProductVisible = (occasions) => {
    return filter === 'all' || occasions.split(',').includes(filter);
  };

  return (
    <section id="featured">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">— Our Collection —</div>
          <h2 className="section-title">Signature Bouquets</h2>
          <div className="divider"><span className="divider-icon">✿</span></div>
        </div>

        <div className="filter-row stagger">
          {filters.map(f => (
            <button
              key={f.key}
              className={`pill ${filter === f.key ? 'active' : ''}`}
              data-filter={f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid stagger">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`product-card reveal ${isProductVisible(product.occasions) ? '' : 'product-card-hidden'}`}
              data-occasions={product.occasions}
            >
              <div className="product-img-wrap">
                <img src={product.image} alt={product.name} />
                {product.tag && <div className="product-tag">{product.tag}</div>}
              </div>
              <div className="product-body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button className="add-btn" onClick={(e) => addToCart(product, e.target)}>Add to Order</button>
              </div>
            </div>
          ))}
        </div>

        <div className="center-btn reveal">
          <a href="#gallery" className="outline-btn">View All Designs</a>
        </div>
      </div>
    </section>
  );
}
