import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import YourBuild from "./components/YourBuild";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Auth from "./components/Auth";
import Admin from "./components/Admin";
import "./styles/App.scss";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '', actions: [] });
  const [user, setUser] = useState(null);

  // Load cart for current user from localStorage
  const loadCartForUser = (userEmail) => {
    if (userEmail) {
      const cartKey = `cart_${userEmail}`;
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to load cart:', error);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  };

  // Save current cart to localStorage for user
  const saveCartForUser = (userEmail, items) => {
    if (userEmail) {
      const cartKey = `cart_${userEmail}`;
      localStorage.setItem(cartKey, JSON.stringify(items));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      loadCartForUser(parsedUser.email);
    }
  }, []);

  // Save cart whenever it changes and user is logged in
  useEffect(() => {
    if (user && user.email) {
      saveCartForUser(user.email, cartItems);
    }
  }, [cartItems, user]);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevCartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
        };
        console.log('Updated item quantity');
        return updatedItems;
      } else {
        console.log('Added new item to cart');
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (index) => {
    const item = cartItems[index];
    if (item.quantity > 1) {
      const updatedItems = [...cartItems];
      updatedItems[index] = { ...item, quantity: item.quantity - 1 };
      setCartItems(updatedItems);
    } else {
      setCartItems(cartItems.filter((_, i) => i !== index));
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartComponent = (
    <Cart 
      items={cartItems} 
      onRemoveFromCart={handleRemoveFromCart}
      onClearCart={handleClearCart}
      onShowModal={setModal}
    />
  );

  return (
    <Router>
      <div className="app-container">
        <Navbar cartComponent={cartComponent} user={user} setUser={setUser} onClearCart={handleClearCart} />
        <Routes>
          <Route path="/" element={
            <main className="main-content">
              <h2 className="main-heading">Welcome to PCPartPicker!</h2>
              <div className="content-layout">
                <ProductList onAddToCart={handleAddToCart} />
                {!isMobile && cartComponent}
              </div>
            </main>
          } />
          <Route path="/your-build" element={
            <main className="main-content">
              <div className="content-layout">
                <YourBuild onAddToCart={handleAddToCart} user={user} onShowModal={setModal} />
                {!isMobile && cartComponent}
              </div>
            </main>
          } />
          <Route path="/auth" element={<Auth onShowModal={setModal} setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin user={user} onShowModal={setModal} />} />
        </Routes>
        <Footer />
        <Modal
          isOpen={modal.isOpen}
          onClose={() => setModal({ ...modal, isOpen: false })}
          type={modal.type}
          title={modal.title}
          actions={modal.actions}
        >
          {modal.message}
        </Modal>
      </div>
    </Router>
  );
};

export default App;