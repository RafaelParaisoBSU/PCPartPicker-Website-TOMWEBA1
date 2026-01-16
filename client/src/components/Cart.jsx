import { useState } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/Cart.scss';
import Modal from './Modal';

// Shopping cart component - displays items and handles checkout
const Cart = ({ items, onRemoveFromCart, onOrderPlaced, onShowModal, onClearCart }) => {
  // State management
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Calculate total price
  const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Update form field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Process checkout and place order
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      // Prepare order data
      const order = {
        items: items.map(it => ({
          productId: it.id || it._id || null,
          name: it.name,
          price: Number(it.price) || 0,
          quantity: it.quantity || 1,
          image: it.image || null
        })),
        total,
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address
        }
      };

      // Submit order to backend
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to place order');
      }

      // Generate order summary HTML
      const orderSummaryHTML = `
        <div class="order-summary">
          <p class="thank-you">Thank you for your order, ${formData.name}!</p>
          <p class="confirmation">We'll send a confirmation email to ${formData.email}</p>
          
          <div class="summary-section">
            <h4>Order Summary</h4>
            <div class="items-list">
              ${items.map(item => `
                <div class="summary-item">
                  <span class="item-name">${item.name}</span>
                  <div class="item-details">
                    <span class="quantity">${item.quantity || 1}x</span>
                    <span class="price">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>

          <div class="shipping-info">
            <h4>Shipping Address</h4>
            <p>${formData.address}</p>
          </div>
        </div>
      `;

      // Show success modal with order details
      onShowModal({
        isOpen: true,
        type: 'success',
        title: 'Order Placed Successfully!',
        message: orderSummaryHTML
      });
      
      // Reset form and state
      setFormData({ name: '', email: '', address: ''});
      setIsCheckingOut(false);
      if (typeof onOrderPlaced === 'function') onOrderPlaced();
    } catch (error) {
      console.error('Checkout error:', error);
      // Show error modal
      onShowModal({
        isOpen: true,
        type: 'error',
        title: 'Order Failed',
        message: error.message || 'There was an error processing your order. Please try again or contact support if the problem persists.'
      });
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      
      {/* Empty cart message */}
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Cart items list */}
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                {/* Item image */}
                {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                
                {/* Item details */}
                <div className="cart-item-details">
                  <span className="item-name">{item.name}</span>
                  <div className="item-price-quantity">
                    <span className="item-price">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    {item.quantity > 1 && (
                      <span className="item-quantity">({item.quantity}x)</span>
                    )}
                  </div>
                </div>
                
                {/* Remove item button */}
                <button className="remove-btn" onClick={() => onRemoveFromCart(index)}>
                  {item.quantity > 1 ? 'Remove One' : 'Remove'}
                </button>
              </div>
            ))}
          </div>
          
          {/* Cart total and action buttons */}
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
            {!isCheckingOut && (
              <div className="cart-buttons">
                {/* Proceed to checkout button */}
                <button 
                  className="checkout-btn"
                  onClick={() => setIsCheckingOut(true)}
                >
                  Proceed to Checkout
                </button>
                
                {/* Clear cart button */}
                <button 
                  className="clear-cart-btn"
                  onClick={() => {
                    onShowModal({
                      isOpen: true,
                      type: 'warning',
                      title: 'Clear Cart',
                      message: 'Are you sure you want to remove all items from your cart?',
                      actions: [
                        {
                          label: 'No, Keep Items',
                          onClick: () => onShowModal({ isOpen: false }),
                          primary: true
                        },
                        {
                          label: 'Yes, Clear Cart',
                          onClick: () => {
                            onClearCart();
                            onShowModal({ isOpen: false });
                          },
                          primary: false
                        }
                      ]
                    });
                  }}
                >
                  Remove All
                </button>
              </div>
            )}
          </div>

          {/* Checkout form (conditional) */}
          {isCheckingOut && (
            <form onSubmit={handleCheckout} className="checkout-form">
              <h3>Checkout Information</h3>
              
              {/* Name input */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Email input */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Address input */}
              <div className="form-group">
                <textarea
                  name="address"
                  placeholder="Shipping Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Submit button */}
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
              
              {/* Cancel button */}
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setIsCheckingOut(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
