import '../styles/Footer.scss';

// Footer component - site-wide footer with links and info
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About section */}
        <div className="footer-section">
          <h3>About PCPartPicker</h3>
          <p>Your trusted source for PC parts and custom builds since 2025.</p>
        </div>
        
        {/* Navigation links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/your-build">Your Build</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/auth">Login</a></li>
            <li><a href="/auth">Sign Up</a></li>
          </ul>
        </div>
        
        {/* Contact information */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: rafaelparaiso.bsu@gmail.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      
      {/* Copyright notice */}
      <div className="footer-bottom">
        <p>&copy; 2025 PCPartPicker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;