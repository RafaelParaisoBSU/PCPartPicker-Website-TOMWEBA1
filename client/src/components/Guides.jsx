import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import product images
import cpu1 from '../assets/products/cpu1.png';
import cpu2 from '../assets/products/cpu2.png';
import cpu4 from '../assets/products/cpu4.png';
import gpu2 from '../assets/products/gpu2.png';
import gpu4 from '../assets/products/gpu4.png';
import gpu5 from '../assets/products/gpu5.png';
import ram2 from '../assets/products/ram2.png';
import ram3 from '../assets/products/ram3.png';
import ram4 from '../assets/products/ram4.png';
import ssd1 from '../assets/products/ssd1.png';
import ssd2 from '../assets/products/ssd2.png';
import ssd3 from '../assets/products/ssd3.png';
import case3 from '../assets/products/case3.png';
import case4 from '../assets/products/case4.png';
import case5 from '../assets/products/case5.png';
import motherboard1 from '../assets/products/motherboard1.png';
import motherboard2 from '../assets/products/motherboard2.png';
import motherboard4 from '../assets/products/motherboard4.png';
import cooler1 from '../assets/products/cooler1.png';
import cooler2 from '../assets/products/cooler2.png';
import cooler5 from '../assets/products/cooler5.png';
import psu1 from '../assets/products/psu1.png';
import psu3 from '../assets/products/psu3.png';
import psu5 from '../assets/products/psu5.png';

import '../styles/Guides.scss';

// Build guides page - displays curated PC build recommendations
const Guides = ({ onAddToCart, onShowModal }) => {
  const location = useLocation();

  // Scroll to anchor on page load if hash present
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  // Build configurations data
  const builds = {
    entry: {
      title: 'Entry-Level Build',
      description: 'Perfect for casual gaming, everyday productivity, and entry into PC gaming. This build offers excellent value and can handle most modern games at 1080p with good settings.',
      totalPrice: 844.92,
      parts: [
        { id: 102, name: 'AMD Ryzen 5 7600X', category: 'CPU', price: 229.99, image: cpu4, description: '6-core / 12-thread mid-range CPU perfect for 1080p gaming.' },
        { id: 146, name: 'Thermalright PE 120 SE', category: 'Cooler', price: 34.99, image: cooler5, description: 'Budget-friendly high-performance air cooler.' },
        { id: 6, name: 'MSI B650', category: 'Motherboard', price: 169.99, image: motherboard1, description: 'AM5 motherboard supporting Ryzen 7000/9000 CPUs, DDR5 & PCIe 5.0.' },
        { id: 116, name: 'Kingston FB 16GB DDR4', category: 'RAM', price: 59.99, image: ram4, description: '16GB DDR4 3200MHz budget-friendly memory for gaming.' },
        { id: 4, name: 'Samsung 1TB NVMe SSD', category: 'Storage', price: 79.99, image: ssd1, description: 'Fast NVMe SSD with quick load times and responsive system storage.' },
        { id: 110, name: 'Intel Arc A770', category: 'GPU', price: 329.99, image: gpu5, description: '8GB GDDR6 budget-friendly discrete graphics with ray tracing.' },
        { id: 154, name: 'MSI MPG A750GF', category: 'PSU', price: 89.99, image: psu5, description: '750W fully modular 80+ Gold with 10-year warranty.' },
        { id: 130, name: 'Lian Li Lancool 215 Mesh', category: 'Case', price: 49.99, image: case4, description: 'Budget mid-tower mesh case with great airflow and value.' }
      ]
    },
    'mid-range': {
      title: 'Mid-Range Build',
      description: 'The sweet spot for most gamers. This build delivers excellent 1080p and 1440p performance, handles modern AAA titles with ease, and is perfect for streaming and content creation.',
      totalPrice: 1654.91,
      parts: [
        { id: 1, name: 'AMD Ryzen 7 5800X', category: 'CPU', price: 184.99, image: cpu1, description: '8-core / 16-thread AM4 processor, great for gaming and productivity.' },
        { id: 143, name: 'Corsair H150i Elite Capellix', category: 'Cooler', price: 169.99, image: cooler2, description: '360mm AIO liquid cooler with RGB and excellent performance.' },
        { id: 137, name: 'Gigabyte B850 Aorus', category: 'Motherboard', price: 199.99, image: motherboard4, description: 'Solid B850 option with DDR5 and good VRM for overclocking.' },
        { id: 115, name: 'G.Skill Trident Z5 32GB DDR5', category: 'RAM', price: 129.99, image: ram3, description: '32GB DDR5 6000MHz high-speed memory with RGB lighting.' },
        { id: 122, name: 'WD Black SN850X 1TB', category: 'Storage', price: 99.99, image: ssd3, description: '1TB PCIe 4.0 NVMe SSD with excellent speed and reliability.' },
        { id: 109, name: 'NVIDIA RTX 4080 Super', category: 'GPU', price: 799.99, image: gpu4, description: '16GB GDDR6X high-end GPU perfect for 4K gaming and content creation.' },
        { id: 14, name: 'Corsair RM850x', category: 'PSU', price: 119.99, image: psu1, description: '850W 80+ Gold certified power supply for reliable performance.' },
        { id: 131, name: 'Phanteks Ecl P500A D-RGB', category: 'Case', price: 149.99, image: case5, description: 'High-airflow mesh case with integrated RGB fans.' }
      ]
    },
    'high-end': {
      title: 'High-End Build',
      description: 'Maximum performance for 4K gaming, professional content creation, and demanding workloads. This build features top-tier components for enthusiasts who demand the best.',
      totalPrice: 3999.91,
      parts: [
        { id: 7, name: 'AMD Ryzen 9 9950X3D', category: 'CPU', price: 699.99, image: cpu2, description: '16-core / 32-thread AM5 CPU for top-tier gaming performance.' },
        { id: 13, name: 'Noctua NH-D15', category: 'Cooler', price: 89.99, image: cooler1, description: 'Premium air cooler with exceptional cooling performance.' },
        { id: 12, name: 'ASUS GAMING X870', category: 'Motherboard', price: 249.99, image: motherboard2, description: 'High-end X870 motherboard with DDR5, PCIe 5.0 & Ryzen 9000 support.' },
        { id: 9, name: 'Corsair 128GB DDR5', category: 'RAM', price: 299.99, image: ram2, description: 'Massive 128GB DDR5 kit for heavy workloads, content creation & servers.' },
        { id: 10, name: 'Samsung 2TB NVMe SSD', category: 'Storage', price: 129.99, image: ssd2, description: 'High-performance 2TB NVMe SSD sized for games, media & work.' },
        { id: 8, name: 'NVIDIA RTX 5090', category: 'GPU', price: 1999.99, image: gpu2, description: '32GB GDDR7 flagship GPU for extreme 4K/8K gaming and AI workloads.' },
        { id: 152, name: 'Seasonic Focus Gold 1000W', category: 'PSU', price: 149.99, image: psu3, description: '1000W 80+ Gold premium PSU for high-end builds.' },
        { id: 129, name: 'Corsair 5000T RGB', category: 'Case', price: 379.99, image: case3, description: 'Massive full-tower case with excellent cooling and cable management.' }
      ]
    }
  };

  // Add all parts from a build to cart
  const handleAddBuildToCart = (buildParts) => {
    buildParts.forEach(part => {
      onAddToCart(part);
    });
    
    // Show success modal
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
      {/* Page header */}
      <div className="guides-header">
        <h1>PC Build Guides</h1>
        <p>Choose the perfect build for your needs and budget</p>
      </div>

      <div className="guides-content">
        <div className="guides-list">
          {/* Render each build configuration */}
          {Object.entries(builds).map(([key, build]) => (
            <section key={key} id={key} className="build-section">
              {/* Build header with title and price */}
              <div className="build-header">
                <h2>{build.title}</h2>
                <div className="build-price-badge">${build.totalPrice.toFixed(2)}</div>
              </div>
              <p className="build-description">{build.description}</p>
              
              {/* Components list */}
              <div className="build-parts">
                <h3>Components</h3>
                <div className="parts-list">
                  {build.parts.map((part, index) => (
                    <div key={part.id || index} className="part-item">
                      {/* Part image */}
                      <img src={part.image} alt={part.name} className="part-image" />
                      {/* Part details */}
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

              {/* Add entire build to cart button */}
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