import { useState } from 'react';
import '../css/Admin.css';

const Admin = ({ currentUser, onClose }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Blushing Romance',
      description: 'A delicate mix of pink and white roses, wrapped in satin.',
      price: 70.00,
      image: 'https://placehold.co/400x400/f8bbd0/4a148c?text=Elegant+Rose+Mix',
      tag: 'Bestseller',
      occasions: 'birthday,anniversary,gift'
    },
    {
      id: 2,
      name: 'Sweet Serenity',
      description: 'Pastel carnations, hydrangeas, and delicate greenery.',
      price: 55.00,
      image: 'https://placehold.co/400x400/ffe0f0/6d28d9?text=Pastel+Delights',
      tag: '',
      occasions: 'table,gift'
    },
    {
      id: 3,
      name: 'Velvet Harmony',
      description: 'Deep purple tulips, pink peonies, and subtle accents.',
      price: 80.00,
      image: 'https://placehold.co/400x400/f7e1ff/7b2cbf?text=Purple+Elegance',
      tag: 'New',
      occasions: 'anniversary,birthday'
    }
  ]);
  
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, image: 'https://placehold.co/400x400/f8bbd0/4a148c?text=Past+Design+1', overlay: 'Bridal Cascade ✿', styles: 'wedding' },
    { id: 2, image: 'https://placehold.co/400x400/ffe0f0/6d28d9?text=Past+Design+2', overlay: 'Corporate Elegance ✿', styles: 'corporate' },
    { id: 3, image: 'https://placehold.co/400x400/f7e1ff/7b2cbf?text=Past+Design+3', overlay: 'Bespoke Garden ✿', styles: 'custom' },
    { id: 4, image: 'https://placehold.co/400x400/ffc0cb/e91e63?text=Past+Design+4', overlay: 'Rosy Affair ✿', styles: 'wedding,custom' },
    { id: 5, image: 'https://placehold.co/400x400/a020f0/ffc0cb?text=Past+Design+5', overlay: 'Velvet Suite ✿', styles: 'corporate' },
    { id: 6, image: 'https://placehold.co/400x400/ffe4e6/4a148c?text=Past+Design+6', overlay: 'Midsummer Dream ✿', styles: 'custom' },
    { id: 7, image: 'https://placehold.co/400x400/fce7f7/e91e63?text=Past+Design+7', overlay: 'White Chapel ✿', styles: 'wedding' },
    { id: 8, image: 'https://placehold.co/400x400/f8bbd0/6d28d9?text=Past+Design+8', overlay: 'Twilight Garden ✿', styles: 'corporate,custom' }
  ]);
  
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', tag: '', occasions: '' });
  const [newGalleryItem, setNewGalleryItem] = useState({ image: '', overlay: '', styles: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: newProduct.image || `https://placehold.co/400x400/f8bbd0/4a148c?text=${encodeURIComponent(newProduct.name)}`,
      tag: newProduct.tag,
      occasions: newProduct.occasions
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: '', image: '', tag: '', occasions: '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      image: newGalleryItem.image,
      overlay: newGalleryItem.overlay,
      styles: newGalleryItem.styles
    };
    setGalleryItems([...galleryItems, item]);
    setNewGalleryItem({ image: '', overlay: '', styles: '' });
  };

  const handleDeleteGalleryItem = (id) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
  };

  return (
    <div className="admin-overlay open" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <button className="admin-close" onClick={onClose} aria-label="Close admin panel">
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Welcome, {currentUser?.name || 'Admin'}</p>
        
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button 
            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>
        
        <div className="admin-content">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="admin-section">
              <h2>Manage Products</h2>
              
              <form onSubmit={handleAddProduct} className="admin-form">
                <h3>Add New Product</h3>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price ($)" 
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  required
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Image URL (optional)" 
                    value={newProduct.image}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Tag (e.g., Bestseller)" 
                    value={newProduct.tag}
                    onChange={e => setNewProduct({...newProduct, tag: e.target.value})}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Occasions (comma-separated: birthday,anniversary)" 
                  value={newProduct.occasions}
                  onChange={e => setNewProduct({...newProduct, occasions: e.target.value})}
                  required
                />
                <button type="submit" className="admin-btn-primary">Add Product</button>
              </form>
              
              <div className="admin-list">
                <h3>Current Products ({products.length})</h3>
                <div className="product-grid">
                  {products.map(product => (
                    <div key={product.id} className="admin-product-card">
                      <img src={product.image} alt={product.name} />
                      <div className="admin-product-info">
                        <h4>{product.name}</h4>
                        <p>${product.price.toFixed(2)}</p>
                        <p className="admin-product-desc">{product.description}</p>
                      </div>
                      <button 
                        className="admin-delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                        aria-label={`Delete ${product.name}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="admin-section">
              <h2>Manage Gallery</h2>
              
              <form onSubmit={handleAddGalleryItem} className="admin-form">
                <h3>Add New Gallery Item</h3>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newGalleryItem.image}
                    onChange={e => setNewGalleryItem({...newGalleryItem, image: e.target.value})}
                    required
                  />
                  <input
                    type="text" 
                    placeholder="Overlay Text"
                    value={newGalleryItem.overlay}
                    onChange={e => setNewGalleryItem({...newGalleryItem, overlay: e.target.value})}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Styles (comma-separated: wedding,corporate)" 
                  value={newGalleryItem.styles}
                  onChange={e => setNewGalleryItem({...newGalleryItem, styles: e.target.value})}
                  required
                />
                <button type="submit" className="admin-btn-primary">Add Gallery Item</button>
              </form>
              
              <div className="admin-list">
                <h3>Current Gallery Items ({galleryItems.length})</h3>
                <div className="admin-gallery-grid">
                  {galleryItems.map(item => (
                    <div key={item.id} className="admin-gallery-card">
                      <img src={item.image} alt={item.overlay} />
                      <div className="admin-gallery-overlay">
                        <span>{item.overlay}</span>
                      </div>
                      <button 
                        className="admin-delete-btn"
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        aria-label={`Delete ${item.overlay}`}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="admin-section">
              <h2>Order Management</h2>
              <div className="admin-orders-empty">
                <i className="fa-solid fa-receipt"></i>
                <p>No orders yet</p>
                <small>Orders will appear here when customers checkout</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;