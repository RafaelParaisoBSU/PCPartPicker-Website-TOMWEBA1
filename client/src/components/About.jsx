import '../styles/About.scss';

// About page component - company information and features
const About = () => {
  return (
    <div className="about-container">
      <h1>About MyPCParts</h1>
      
      <div className="about-content">
        {/* Mission statement section */}
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>We strive to make PC building accessible and enjoyable for everyone. Whether you're a first-time builder or a seasoned enthusiast, we provide the tools and parts you need to create your perfect system.</p>
        </div>

        {/* Key features and benefits */}
        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            {/* Quality components feature */}
            <div className="feature-card">
              <h3>Quality Selection</h3>
              <p>Curated collection of high-performance PC components from trusted manufacturers.</p>
            </div>
            
            {/* Customer support feature */}
            <div className="feature-card">
              <h3>Expert Support</h3>
              <p>Dedicated team of tech enthusiasts ready to help with your build questions.</p>
            </div>
            
            {/* Custom configurations feature */}
            <div className="feature-card">
              <h3>Custom Builds</h3>
              <p>Personalized PC configurations tailored to your specific needs and budget.</p>
            </div>
            
            {/* Quality assurance feature */}
            <div className="feature-card">
              <h3>Performance Testing</h3>
              <p>Thorough benchmarking and quality assurance for every component.</p>
            </div>
            
            {/* Warranty feature */}
            <div className="feature-card">
              <h3>Warranty Coverage</h3>
              <p>Extended warranty options and hassle-free RMA process for peace of mind.</p>
            </div>
            
            {/* Shipping feature */}
            <div className="feature-card">
              <h3>Fast Shipping</h3>
              <p>Quick and secure delivery of your components nationwide.</p>
            </div>
          </div>
        </div>

        {/* Company history section */}
        <div className="about-section">
          <h2>Our Story</h2>
          <p>Founded by PC enthusiasts in 2025, MyPCParts has grown from a small startup to a leading destination for PC builders. We understand the importance of reliable components and exceptional service in creating the perfect custom PC.</p>
        </div>
      </div>
    </div>
  );
};

export default About;