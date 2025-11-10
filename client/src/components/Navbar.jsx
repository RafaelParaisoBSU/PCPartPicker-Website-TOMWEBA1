import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = ({ cartComponent }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 480) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  return (
    <nav className="navbar" ref={navRef}>
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
          <button 
            className="close-menu"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.classList.remove('menu-open');
            }}
            aria-label="Close menu"
          >
            ×
          </button>
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