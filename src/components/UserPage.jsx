import { useState } from 'react';
import '../css/UserPage.css';

const UserPage = ({ currentUser, onClose }) => {
  // Check if user is logged in, redirect if not
  if (!currentUser) {
    onClose(); // Close panel if user is not logged in
    return null;
  }
   
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([
    {
      id: 1001,
      date: '2026-04-28',
      items: [
        { name: 'Blushing Romance', qty: 1, price: 70.00 },
        { name: 'Velvet Harmony', qty: 1, price: 80.00 }
      ],
      total: 150.00,
      status: 'Delivered'
    },
    {
      id: 1002,
      date: '2026-05-01',
      items: [
        { name: 'Sweet Serenity', qty: 2, price: 55.00 }
      ],
      total: 110.00,
      status: 'Processing'
    }
  ]);
   
  const [cartItems, setCartItems] = useState([]); // Would be synced with main app cart
   
  return (
    <div className="user-overlay open" onClick={onClose}>
      <div className="user-modal" onClick={e => e.stopPropagation()}>
        <button className="user-close" onClick={onClose} aria-label="Close user panel">
          <i className="fa-solid fa-xmark"></i>
        </button>
         
        <h1 className="user-title">Welcome Back, {currentUser.name}</h1>
        <p className="user-subtitle">Your personal flower shop dashboard</p>
         
        <div className="user-tabs">
          <button 
            className={`user-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`user-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`user-tab ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Cart ({cartItems.reduce((sum, item) => sum + item.qty, 0)})
          </button>
          <button 
            className={`user-tab ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
          </button>
        </div>
         
        <div className="user-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="user-section">
              <h2>Profile Information</h2>
              
              <div className="user-info">
                <div className="info-item">
                  <i className="fa-solid fa-user"></i>
                  <span>{currentUser.name}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-envelope"></i>
                  <span>{currentUser.email}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-phone"></i>
                  <span>{currentUser.phone || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-cake"></i>
                  <span>Member since: {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
              
              <button className="user-btn-outline">Edit Profile</button>
            </div>
          )}
           
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="user-section">
              <h2>Order History</h2>
              
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <h3>Order #{order.id}</h3>
                        <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                      <div className="order-date">{order.date}</div>
                      
                      <div className="order-items">
                        {order.items.map(item => (
                          <div key={order.id + item.name} className="order-item">
                            <span>{item.name}</span>
                            <span>×{item.qty}</span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-total">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="user-orders-empty">
                  <i className="fa-solid fa-receipt"></i>
                  <p>No orders yet</p>
                  <p>Start shopping to see your order history here</p>
                </div>
              )}
            </div>
          )}
           
          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <div className="user-section">
              <h2>Shopping Cart</h2>
              
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>${item.price.toFixed(2)}</p>
                          <div className="item-quantity">
                            <button>-</button>
                            <span>{item.qty}</span>
                            <button>+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>${(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0) * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0) * 1.08).toFixed(2)}</span>
                    </div>
                    <button className="user-btn-primary">Proceed to Checkout</button>
                  </div>
                </>
              ) : (
                <div className="user-cart-empty">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p>Your cart is empty</p>
                  <p>Add some flowers to your cart to get started</p>
                </div>
              )}
            </div>
          )}
           
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="user-section">
              <h2>Your Wishlist</h2>
              
              <div className="user-wishlist-empty">
                <i className="fa-solid fa-heart"></i>
                <p>Your wishlist is empty</p>
                <p>Save items you love for later</p>
                <button className="user-btn-outline">Shop Now</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;