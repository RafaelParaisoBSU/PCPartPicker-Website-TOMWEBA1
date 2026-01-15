import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ryzen from '../assets/products/ryzen.png';
import rtx from '../assets/products/rtx.png';
import ram from '../assets/products/ram.png';
import ssd from '../assets/products/ssd.png';
import case_img from '../assets/products/case.png';
import motherboard from '../assets/products/motherboard.png';
import ryzen1 from '../assets/products/ryzen1.png';
import rtx1 from '../assets/products/rtx1.png';
import ram1 from '../assets/products/ram1.png';
import ssd1 from '../assets/products/ssd1.png';
import case_img1 from '../assets/products/case1.png';
import motherboard1 from '../assets/products/motherboard1.png';
import '../styles/Guides.scss';

const Guides = ({ onAddToCart, onShowModal }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  const builds = {
    entry: {
      title: 'Entry-Level Build',
      description: 'Perfect for casual gaming, everyday productivity, and entry into PC gaming. This build offers excellent value and can handle most modern games at 1080p with good settings.',
      totalPrice: 624.95,
      parts: [
        { id: 102, name: 'AMD Ryzen 5 7600X', category: 'CPU', price: 229.99, image: ryzen, description: '6-core / 12-thread mid-range CPU perfect for 1080p gaming.' },
        { id: 146, name: 'Thermalright Peerless Assassin 120 SE', category: 'Cooler', price: 34.99, image: ryzen, description: 'Budget-friendly high-performance air cooler.' },
        { id: 137, name: 'Gigabyte B850 Aorus', category: 'Motherboard', price: 199.99, image: motherboard, description: 'Solid B850 option with DDR5 and good VRM for overclocking.' },
        { id: 116, name: 'Kingston Fury Beast 16GB DDR4', category: 'RAM', price: 59.99, image: ram, description: '16GB DDR4 3200MHz budget-friendly memory for gaming.' },
        { id: 126, name: 'Kingston A3000 500GB', category: 'Storage', price: 39.99, image: ssd, description: '500GB affordable SSD for budget builds and upgrades.' },
        { id: 113, name: 'NVIDIA RTX 4060 Ti', category: 'GPU', price: 499.99, image: rtx, description: '8GB GDDR6 entry-level high-performance graphics card.' },
        { id: 156, name: 'be quiet! Straight Power 12 600W', category: 'PSU', price: 79.99, image: rtx, description: '600W silent PSU perfect for mid-range builds.' },
        { id: 130, name: 'Lian Li Lancool 215 Mesh', category: 'Case', price: 49.99, image: case_img, description: 'Budget mid-tower mesh case with great airflow and value.' }
      ]
    },
    'mid-range': {
      title: 'Mid-Range Build',
      description: 'The sweet spot for most gamers. This build delivers excellent 1080p and 1440p performance, handles modern AAA titles with ease, and is perfect for streaming and content creation.',
      totalPrice: 1249.93,
      parts: [
        { id: 106, name: 'AMD Ryzen 7 7700X', category: 'CPU', price: 349.99, image: ryzen, description: '8-core / 16-thread AM5 CPU ideal for gaming and streaming.' },
        { id: 143, name: 'Corsair H150i Elite Capellix', category: 'Cooler', price: 169.99, image: ryzen, description: '360mm AIO liquid cooler with RGB and excellent performance.' },
        { id: 136, name: 'ASUS TUF Gaming X870-E', category: 'Motherboard', price: 279.99, image: motherboard1, description: 'Flagship X870-E with premium power delivery and cooling solutions.' },
        { id: 115, name: 'G.Skill Trident Z5 32GB DDR5', category: 'RAM', price: 129.99, image: ram, description: '32GB DDR5 6000MHz high-speed memory with RGB lighting.' },
        { id: 4, name: 'Samsung 1TB NVMe SSD', category: 'Storage', price: 79.99, image: ssd, description: 'Fast NVMe SSD with quick load times and responsive system storage.' },
        { id: 111, name: 'NVIDIA RTX 4070 Ti', category: 'GPU', price: 749.99, image: rtx, description: '12GB GDDR6X powerful GPU for 1440p high refresh rate gaming.' },
        { id: 14, name: 'Corsair RM850x', category: 'PSU', price: 119.99, image: rtx, description: '850W 80+ Gold certified power supply for reliable performance.' },
        { id: 131, name: 'Phanteks Eclipse P500A D-RGB', category: 'Case', price: 149.99, image: case_img, description: 'High-airflow mesh case with integrated RGB fans.' }
      ]
    },
    'high-end': {
      title: 'High-End Build',
      description: 'Maximum performance for 4K gaming, professional content creation, and demanding workloads. This build features top-tier components for enthusiasts who demand the best.',
      totalPrice: 2549.92,
      parts: [
        { id: 7, name: 'AMD Ryzen 9 9950X3D', category: 'CPU', price: 699.99, image: ryzen1, description: '16-core / 32-thread AM5 CPU for top-tier gaming performance.' },
        { id: 145, name: 'NZXT Kraken Z73', category: 'Cooler', price: 199.99, image: ryzen, description: '360mm AIO with LCD display and smart cooling control.' },
        { id: 12, name: 'ASUS GAMING X870', category: 'Motherboard', price: 249.99, image: motherboard1, description: 'High-end X870 motherboard with DDR5, PCIe 5.0 & Ryzen 9000 support.' },
        { id: 9, name: 'Corsair 128GB DDR5', category: 'RAM', price: 299.99, image: ram1, description: 'Massive 128GB DDR5 kit for heavy workloads, content creation & servers.' },
        { id: 10, name: 'Samsung 2TB NVMe SSD', category: 'Storage', price: 129.99, image: ssd1, description: 'High-performance 2TB NVMe SSD sized for games, media & work.' },
        { id: 8, name: 'NVIDIA RTX 5090', category: 'GPU', price: 1999.99, image: rtx1, description: '32GB GDDR7 flagship GPU for extreme 4K/8K gaming and AI workloads.' },
        { id: 153, name: 'Corsair RM1200x', category: 'PSU', price: 179.99, image: rtx, description: '1200W modular 80+ Gold PSU for dual-GPU and extreme builds.' },
        { id: 129, name: 'Corsair 5000T RGB', category: 'Case', price: 379.99, image: case_img, description: 'Massive full-tower case with excellent cooling and cable management.' }
      ]
    }
  };

  const handleAddBuildToCart = (buildParts) => {
    buildParts.forEach(part => {
      onAddToCart(part);
    });
    
    if (onShowModal) {
      onShowModal({
        isOpen: true,
        type: 'success',
        title: 'Build Added to Cart!',
        message: `All ${buildParts.length} components have been added to your cart.`,
        actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
      });
    }
  };

  return (
    <div className="guides-page">
      <div className="guides-header">
        <h1>PC Build Guides</h1>
        <p>Choose the perfect build for your needs and budget</p>
      </div>

      <div className="guides-content">
        <div className="guides-list">
          {Object.entries(builds).map(([key, build]) => (
            <section key={key} id={key} className="build-section">
              <div className="build-header">
                <h2>{build.title}</h2>
                <div className="build-price-badge">${build.totalPrice.toFixed(2)}</div>
              </div>
              <p className="build-description">{build.description}</p>
              
              <div className="build-parts">
                <h3>Components</h3>
                <div className="parts-list">
                  {build.parts.map((part, index) => (
                    <div key={part.id || index} className="part-item">
                      <img src={part.image} alt={part.name} className="part-image" />
                      <div className="part-info">
                        <h4>{part.name}</h4>
                        <p className="part-category">{part.category}</p>
                        <p className="part-description">{part.description}</p>
                        <p className="part-price">${part.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="add-build-button"
                onClick={() => handleAddBuildToCart(build.parts)}
              >
                Add Entire Build to Cart
              </button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;
