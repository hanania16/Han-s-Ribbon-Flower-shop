import { useState } from 'react';
import '../css/Gallery.css';

const galleryItems = [
  { id: 1, image: 'https://placehold.co/400x400/f8bbd0/4a148c?text=Past+Design+1', overlay: 'Bridal Cascade ✿', styles: 'wedding' },
  { id: 2, image: 'https://placehold.co/400x400/ffe0f0/6d28d9?text=Past+Design+2', overlay: 'Corporate Elegance ✿', styles: 'corporate' },
  { id: 3, image: 'https://placehold.co/400x400/f7e1ff/7b2cbf?text=Past+Design+3', overlay: 'Bespoke Garden ✿', styles: 'custom' },
  { id: 4, image: 'https://placehold.co/400x400/ffc0cb/e91e63?text=Past+Design+4', overlay: 'Rosy Affair ✿', styles: 'wedding,custom' },
  { id: 5, image: 'https://placehold.co/400x400/a020f0/ffc0cb?text=Past+Design+5', overlay: 'Velvet Suite ✿', styles: 'corporate' },
  { id: 6, image: 'https://placehold.co/400x400/ffe4e6/4a148c?text=Past+Design+6', overlay: 'Midsummer Dream ✿', styles: 'custom' },
  { id: 7, image: 'https://placehold.co/400x400/fce7f7/e91e63?text=Past+Design+7', overlay: 'White Chapel ✿', styles: 'wedding' },
  { id: 8, image: 'https://placehold.co/400x400/f8bbd0/6d28d9?text=Past+Design+8', overlay: 'Twilight Garden ✿', styles: 'corporate,custom' }
];

export default function Gallery({ openModal, requireAuth }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Styles' },
    { key: 'wedding', label: 'Wedding' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'custom', label: 'Custom' }
  ];

  const handleCustomDesign = () => {
    // If requireAuth is provided, check authentication. If not logged in, it will open the auth modal and return early.
    if (requireAuth && !requireAuth()) {
      return;
    }
    openModal();
  };

  return (
    <section id="gallery" className="gallery-bg">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">— Previous Work —</div>
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-sub">Find inspiration for your custom order by browsing our past creations.</p>
        </div>

        <div className="filter-row stagger">
          {filters.map(f => (
            <button
              key={f.key}
              className={`pill gallery-pill ${filter === f.key ? 'active' : ''}`}
              data-filter={f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid stagger" id="galleryGrid">
          {galleryItems.map((item, i) => {
            const isVisible = filter === 'all' || item.styles.split(',').includes(filter);
            return (
              <div
                key={item.id}
                className={`gallery-item reveal ${isVisible ? '' : 'gallery-item-hidden'}`}
                data-styles={item.styles}
              >
                <img src={item.image} alt={item.overlay} />
                <div className="gallery-overlay"><span>{item.overlay}</span></div>
              </div>
            );
          })}
        </div>

        <div className="center-btn reveal gallery-center-btn-margin">
          <button type="button" className="outline-btn" onClick={handleCustomDesign}>Start Your Custom Design</button>
        </div>
      </div>
    </section>
  );
}
