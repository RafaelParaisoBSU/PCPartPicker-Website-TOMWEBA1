import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';

// Navigation bar component - main site navigation
const Navbar = ({ cartComponent, user: userProp, setUser: setUserProp, onClearCart }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user, setUser] = useState(userProp || null);
  const navRef = useRef(null);

  // Sync user state from props or localStorage
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

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [location.pathname]);

  // Handle responsive behavior and click outside
  useEffect(() => {
    // Update mobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Check if current path matches link
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  // Handle user logout
  const handleLogout = () => {
    // Disable Google auto-select
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setUserProp(null);
    
    // Clear cart if function provided
    if (onClearCart) {
      onClearCart();
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-content">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="MyPCParts Logo" />
          MyPCParts
        </Link>
        
        {/* Mobile hamburger menu button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {/* Close menu button (mobile) */}
          <button 
            className="close-menu"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.classList.remove('menu-open');
            }}
            aria-label="Close menu"
          >
          </button>
          
          {/* Main navigation links */}
          <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/your-build" className={isActive('/your-build')} onClick={() => setIsMenuOpen(false)}>
            Your Build
          </Link>
          <Link to="/guides" className={isActive('/guides')} onClick={() => setIsMenuOpen(false)}>
            Guides
          </Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          
          {/* Admin panel link (admin users only) */}
          {user && user.isAdmin && (
            <Link to="/admin" className={isActive('/admin')} onClick={() => setIsMenuOpen(false)}>
              Admin Panel
            </Link>
          )}
          
          {/* User menu or auth link */}
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
          
          {/* Mobile cart (if provided) */}
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