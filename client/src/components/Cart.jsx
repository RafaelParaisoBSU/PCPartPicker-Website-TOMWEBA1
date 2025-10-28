import { useState } from 'react';
import '../styles/Cart.scss';

const Cart = ({ items, onRemoveFromCart, onOrderPlaced }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
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

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to place order');
      }

      alert('Order placed successfully!');
      setFormData({ name: '', email: '', address: ''});
      setIsCheckingOut(false);
      if (typeof onOrderPlaced === 'function') onOrderPlaced();
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error.message || 'Error processing payment');
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                <div className="cart-item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price}</span>
                </div>
                <button className="remove-btn" onClick={() => onRemoveFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
            {!isCheckingOut && (
              <button 
                className="checkout-btn"
                onClick={() => setIsCheckingOut(true)}
              >
                Proceed to Checkout
              </button>
            )}
          </div>

          {isCheckingOut && (
            <form onSubmit={handleCheckout} className="checkout-form">
              <h3>Checkout Information</h3>
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
              <div className="form-group">
                <textarea
                  name="address"
                  placeholder="Shipping Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
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