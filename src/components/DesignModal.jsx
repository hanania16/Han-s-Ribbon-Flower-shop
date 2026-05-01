import { useState, useEffect, useRef } from 'react';
import '../css/DesignModal.css';

export default function DesignModal({ isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState('Pink');
  const [flowerQty, setFlowerQty] = useState(20);
  const [addons, setAddons] = useState([]);
  const [basePrice, setBasePrice] = useState(0);
  const [addonsTotal, setAddonsTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [halfPayment, setHalfPayment] = useState(0);

  const colors = [
    { color: 'Red', bg: '#f87171', title: 'Red' },
    { color: 'Pink', bg: '#f472b6', title: 'Pink' },
    { color: 'Yellow', bg: '#facc15', title: 'Yellow' },
    { color: 'Blue', bg: '#60a5fa', title: 'Blue' },
    { color: 'White', bg: '#f9fafb', border: '1px solid #e5e7eb', title: 'White' },
    { color: 'Purple', bg: '#a78bfa', title: 'Purple' }
  ];

  const addonOptions = [
    { id: 'butterfly', label: 'Decorative Butterfly', icon: 'fa-solid fa-feather-pointed', price: 5 },
    { id: 'crown', label: 'Mini Crown/Tiara', icon: 'fa-solid fa-crown', price: 5 },
    { id: 'card', label: 'Custom Text Card', icon: 'fa-solid fa-scroll', price: 5 },
    { id: 'glitter', label: 'Glitter Finish', icon: 'fa-solid fa-star', price: 5 },
    { id: 'diamonds', label: 'Mini Diamonds/Pearls', icon: 'fa-solid fa-gem', price: 5 }
  ];

  const calcPrice = () => {
    const base = flowerQty * 3;
    const addonsSum = addons.reduce((sum, id) => {
      const addon = addonOptions.find(a => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
    const grand = base + addonsSum;
    
    setBasePrice(base);
    setAddonsTotal(addonsSum);
    setGrandTotal(grand);
    setHalfPayment(grand / 2);
  };

  useEffect(() => {
    calcPrice();
  }, [flowerQty, addons]);

  const toggleAddon = (id) => {
    if (addons.includes(id)) {
      setAddons(addons.filter(a => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const submitOrder = () => {
    alert('Proceeding to checkout!\nDeposit required: $' + halfPayment.toFixed(2));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        <div className="modal-title">Design Your Custom Bouquet</div>

        {/* Step 1 */}
        <div className="step-box">
          <div className="step-label">Step 1 — Base Details</div>
          <label className="form-label">Flower Color Palette</label>
          <div className="color-swatches" id="colorSwatches">
            {colors.map(c => (
              <div
                key={c.color}
                className={`color-swatch ${selectedColor === c.color ? 'selected' : ''} color-swatch-custom-bg`}
                style={{background: c.bg, border: c.border || '3px solid transparent'}}
                data-color={c.color}
                title={c.title}
                onClick={() => setSelectedColor(c.color)}
              ></div>
            ))}
          </div>
          <label className="form-label" htmlFor="flowerQty">Total Number of Flowers (approx.)</label>
          <input
            className="form-input"
            type="number"
            id="flowerQty"
            value={flowerQty}
            min="5"
            onChange={(e) => setFlowerQty(parseInt(e.target.value) || 5)}
          />
          <label className="form-label" htmlFor="customInspo">Inspiration / Special Notes</label>
          <textarea
            className="form-input textarea-no-resize"
            id="customInspo"
            rows="3"
            placeholder="e.g., 'A cascade of lilies for a summer wedding'..."
          ></textarea>
        </div>

        {/* Step 2 */}
        <div className="step-box">
          <div className="step-label">Step 2 — Add-Ons (+$5.00 each)</div>
          <div className="addon-grid" id="addonsGrid">
            {addonOptions.map(addon => (
              <label key={addon.id} className="addon-label">
                <input
                  type="checkbox"
                  data-price={addon.price}
                  checked={addons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                />
                <i className={`${addon.icon} addon-icon-pink`}></i>
                {addon.label}
              </label>
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-box">
          <div className="step-label">Step 3 — Order Summary</div>
          <div className="summary-box">
            <div className="summary-row"><span>Base Price</span><span id="basePrice">${basePrice.toFixed(2)}</span></div>
            <div className="summary-row"><span>Add-Ons</span><span id="addonsTotal">${addonsTotal.toFixed(2)}</span></div>
            <div className="summary-total"><span>Grand Total</span><span id="grandTotal">${grandTotal.toFixed(2)}</span></div>
          </div>
          <div className="half-payment-box">
            <div className="half-payment-label">50% Deposit Required</div>
            <div className="half-payment-amount" id="halfPayment">${halfPayment.toFixed(2)}</div>
            <p className="half-payment-note">Non-refundable deposit to confirm your order. Remainder due upon delivery.</p>
          </div>
          <button className="submit-btn" onClick={submitOrder}>
            <i className="fa-solid fa-credit-card submit-btn-icon-margin"></i>
            Pay Half Deposit & Submit
          </button>
        </div>
      </div>
    </div>
  );
}
