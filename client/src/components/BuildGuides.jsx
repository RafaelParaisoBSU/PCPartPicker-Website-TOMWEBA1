import { Link } from 'react-router-dom';
import case5 from '../assets/products/case5.png';
import case3 from '../assets/products/case3.png';
import case4 from '../assets/products/case4.png';
import '../styles/BuildGuides.scss';

// Build guides section component - displays PC build recommendations
const BuildGuides = () => {
  // Build guide configurations
  const guides = [
    {
      id: 'entry',
      title: 'Entry-Level Build',
      description: 'Perfect for casual gaming and everyday tasks. Get started with PC gaming without breaking the bank.',
      price: '~$850',
      link: '/guides#entry',
      image: case4
    },
    {
      id: 'mid-range',
      title: 'Mid-Range Build',
      description: 'The sweet spot for most gamers. Excellent 1080p and 1440p performance for modern games.',
      price: '~$1,700',
      link: '/guides#mid-range',
      image: case5
    },
    {
      id: 'high-end',
      title: 'High-End Build',
      description: 'Maximum performance for 4K gaming, content creation, and demanding workloads.',
      price: '~$4,000',
      link: '/guides#high-end',
      image: case3
    }
  ];

  return (
    <section className="build-guides">
      <div className="build-guides-container">
        {/* Section header */}
        <h2 className="build-guides-title">Build Guides</h2>
        <p className="build-guides-subtitle">Choose the perfect build for your needs</p>
        
        {/* Build guide cards grid */}
        <div className="guides-grid">
          {guides.map((guide) => (
            <Link 
              key={guide.id} 
              to={guide.link} 
              className="guide-card"
            >
              {/* Build image */}
              <div className="guide-image-container">
                <img src={guide.image} alt={guide.title} className="guide-image" />
              </div>
              
              {/* Build title and price */}
              <div className="guide-header">
                <h3 className="guide-title">{guide.title}</h3>
                <span className="guide-price">{guide.price}</span>
              </div>
              
              {/* Build description */}
              <p className="guide-description">{guide.description}</p>
              
              {/* Link indicator */}
              <span className="guide-link">View Build →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildGuides;