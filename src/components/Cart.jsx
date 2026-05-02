import { useState } from 'react';

const initialCartItems = [
  { id:1, name:'Blushing Romance', price:70.00, qty:1 },
  { id:3, name:'Velvet Harmony', price:80.00, qty:1 }
];

export default function Cart({ isOpen, onClose, cartItems, setCartItems, requireAuth }) {
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (requireAuth && !requireAuth()) {
      return;
    }
    alert(`Proceeding to checkout!\n\nOrder total: $${subtotal.toFixed(2)}\n\nThank you for your order! 🌸`);
    setCartItems([]);
    onClose();
  };

  return (
    <div className={`cart-dropdown ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <span className="cart-title">Your Bouquet</span>
        <button className="cart-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
      </div>
      {cartItems.length === 0 ? (
        <div className="cart-empty">Your bouquet is empty 🌸</div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                </div>
                <button className="cart-remove" onClick={() => removeItem(item.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="cart-checkout" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
