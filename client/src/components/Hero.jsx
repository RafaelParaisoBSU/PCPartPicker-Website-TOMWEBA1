import { Link } from 'react-router-dom';
import '../styles/Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-image-placeholder">
          <div className="hero-gradient"></div>
        </div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Build Your Dream PC</h1>
        <p className="hero-motto">Power. Performance. Perfection.</p>
        <p className="hero-description">
          Create the ultimate gaming rig or workstation with our curated selection of premium components. 
          From entry-level builds to high-end powerhouses, we've got everything you need.
        </p>
        <Link to="/your-build" className="hero-cta-button">
          Start Your Build
        </Link>
      </div>
    </section>
  );
};

export default Hero;
