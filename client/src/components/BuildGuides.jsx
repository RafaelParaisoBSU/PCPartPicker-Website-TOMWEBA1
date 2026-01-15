import { Link } from 'react-router-dom';
import case5 from '../assets/products/case5.png';
import case3 from '../assets/products/case3.png';
import case4 from '../assets/products/case4.png';
import '../styles/BuildGuides.scss';

const BuildGuides = () => {
  const guides = [
    {
      id: 'entry',
      title: 'Entry-Level Build',
      description: 'Perfect for casual gaming and everyday tasks. Get started with PC gaming without breaking the bank.',
      price: '~$600',
      link: '/guides#entry',
      image: case4
    },
    {
      id: 'mid-range',
      title: 'Mid-Range Build',
      description: 'The sweet spot for most gamers. Excellent 1080p and 1440p performance for modern games.',
      price: '~$1,500',
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
        <h2 className="build-guides-title">Build Guides</h2>
        <p className="build-guides-subtitle">Choose the perfect build for your needs</p>
        <div className="guides-grid">
          {guides.map((guide) => (
            <Link 
              key={guide.id} 
              to={guide.link} 
              className="guide-card"
            >
              <div className="guide-image-container">
                <img src={guide.image} alt={guide.title} className="guide-image" />
              </div>
              <div className="guide-header">
                <h3 className="guide-title">{guide.title}</h3>
                <span className="guide-price">{guide.price}</span>
              </div>
              <p className="guide-description">{guide.description}</p>
              <span className="guide-link">View Build →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildGuides;
