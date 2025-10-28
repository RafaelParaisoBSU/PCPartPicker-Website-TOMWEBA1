import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = ({ cartComponent }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 480) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          PCPartPicker
        </Link>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          {isMobile && cartComponent && (
            <div className="mobile-cart">
              {cartComponent}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;