import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = ({ cartComponent, user: userProp, setUser: setUserProp, onClearCart }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [user, setUser] = useState(userProp || null);
  const navRef = useRef(null);

  // Update user when location changes or when userProp changes
  useEffect(() => {
    if (userProp) {
      setUser(userProp);
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }
  }, [location, userProp]);

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

  const handleLogout = () => {
    // Sign out from Google if logged in via Google
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setUserProp(null);
    if (onClearCart) {
      onClearCart();
    }
    setIsMenuOpen(false);
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
          <Link to="/your-build" className={isActive('/your-build')} onClick={() => setIsMenuOpen(false)}>
            Your Build
          </Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          {user && user.isAdmin && (
            <Link to="/admin" className={isActive('/admin')} onClick={() => setIsMenuOpen(false)}>
              Admin Panel
            </Link>
          )}
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">{user.firstName}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className={isActive('/auth')} onClick={() => setIsMenuOpen(false)}>
              Sign In / Sign Up
            </Link>
          )}
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