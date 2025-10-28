import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./styles/App.scss";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const cartComponent = <Cart items={cartItems} onRemoveFromCart={handleRemoveFromCart} />;

  return (
    <Router>
      <div className="app-container">
        <Navbar cartComponent={cartComponent} />
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;