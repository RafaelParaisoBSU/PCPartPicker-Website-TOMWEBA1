import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import cpu1 from '../assets/products/cpu1.png';
import cpu2 from '../assets/products/cpu2.png';
import cpu3 from '../assets/products/cpu3.png';
import cpu4 from '../assets/products/cpu4.png';
import cpu5 from '../assets/products/cpu5.png';
import cpu6 from '../assets/products/cpu6.png';

import gpu1 from '../assets/products/gpu1.png';
import gpu2 from '../assets/products/gpu2.png';
import gpu3 from '../assets/products/gpu3.png';
import gpu4 from '../assets/products/gpu4.png';
import gpu5 from '../assets/products/gpu5.png';
import gpu6 from '../assets/products/gpu6.png';

import ram1 from '../assets/products/ram1.png';
import ram2 from '../assets/products/ram2.png';
import ram3 from '../assets/products/ram3.png';
import ram4 from '../assets/products/ram4.png';
import ram5 from '../assets/products/ram5.png';
import ram6 from '../assets/products/ram6.png';

import ssd1 from '../assets/products/ssd1.png';
import ssd2 from '../assets/products/ssd2.png';
import ssd3 from '../assets/products/ssd3.png';
import ssd4 from '../assets/products/ssd4.png';
import ssd5 from '../assets/products/ssd5.png';
import ssd6 from '../assets/products/ssd6.png';

import case1 from '../assets/products/case1.png';
import case2 from '../assets/products/case2.png';
import case3 from '../assets/products/case3.png';
import case4 from '../assets/products/case4.png';
import case5 from '../assets/products/case5.png';
import case6 from '../assets/products/case6.png';

import motherboard1 from '../assets/products/motherboard1.png';
import motherboard2 from '../assets/products/motherboard2.png';
import motherboard3 from '../assets/products/motherboard3.png';
import motherboard4 from '../assets/products/motherboard4.png';
import motherboard5 from '../assets/products/motherboard5.png';
import motherboard6 from '../assets/products/motherboard6.png';

import cooler1 from '../assets/products/cooler1.png';
import cooler2 from '../assets/products/cooler2.png';
import cooler3 from '../assets/products/cooler3.png';
import cooler4 from '../assets/products/cooler4.png';
import cooler5 from '../assets/products/cooler5.png';
import cooler6 from '../assets/products/cooler6.png';

import psu1 from '../assets/products/psu1.png';
import psu2 from '../assets/products/psu2.png';
import psu3 from '../assets/products/psu3.png';
import psu4 from '../assets/products/psu4.png';
import psu5 from '../assets/products/psu5.png';
import psu6 from '../assets/products/psu6.png';

import monitor1 from '../assets/products/monitor1.png';
import monitor2 from '../assets/products/monitor2.png';
import monitor3 from '../assets/products/monitor3.png';
import monitor4 from '../assets/products/monitor4.png';
import monitor5 from '../assets/products/monitor5.png';
import monitor6 from '../assets/products/monitor6.png';

import '../styles/YourBuild.scss';

const YourBuild = ({ onAddToCart, user, onShowModal }) => {
  const categories = ['CPU', 'Cooler', 'Motherboard', 'RAM', 'Storage', 'GPU', 'PSU', 'Case', 'Monitor'];
  const categoryKeys = ['cpu', 'cooler', 'motherboard', 'ram', 'storage', 'gpu', 'psu', 'case', 'monitor'];

  const allProducts = [

    { id: 1, name: 'AMD Ryzen 7 5800X', category: 'CPU', price: 184.99, image: cpu1, description: '8-core / 16-thread AM4 processor, great for gaming and productivity.' },
    { id: 7, name: 'AMD Ryzen 9 9950X3D', category: 'CPU', price: 699.99, image: cpu2, description: '16-core / 32-thread AM5 CPU for top-tier gaming performance.' },
    { id: 101, name: 'Intel Core i9-14900K', category: 'CPU', price: 589.99, image: cpu3, description: '24-core / 32-thread processor for extreme gaming and workstation use.' },
    { id: 102, name: 'AMD Ryzen 5 7600X', category: 'CPU', price: 229.99, image: cpu4, description: '6-core / 12-thread mid-range CPU perfect for 1080p gaming.' },
    { id: 103, name: 'Intel Core i7-14700K', category: 'CPU', price: 409.99, image: cpu5, description: '20-core / 28-thread high-performance CPU with P-cores and E-cores.' },
    { id: 104, name: 'AMD Ryzen 9 7950X', category: 'CPU', price: 549.99, image: cpu6, description: '16-core / 32-thread powerhouse for content creation and gaming.' },

    { id: 2, name: 'NVIDIA RTX 3080', category: 'GPU', price: 449.99, image: gpu1, description: '10GB GDDR6X GPU built for high-FPS 1440p and 4K gaming performance.' },
    { id: 8, name: 'NVIDIA RTX 5090', category: 'GPU', price: 1999.99, image: gpu2, description: '32GB GDDR7 flagship GPU for extreme 4K/8K gaming and AI workloads.' },
    { id: 108, name: 'AMD Radeon RX 7900 XTX', category: 'GPU', price: 649.99, image: gpu3, description: '24GB GDDR6 memory with RDNA 3 architecture for competitive gaming.' },
    { id: 109, name: 'NVIDIA RTX 4080 Super', category: 'GPU', price: 799.99, image: gpu4, description: '16GB GDDR6X high-end GPU perfect for 4K gaming and content creation.' },
    { id: 110, name: 'Intel Arc A770', category: 'GPU', price: 329.99, image: gpu5, description: '8GB GDDR6 budget-friendly discrete graphics with ray tracing.' },
    { id: 111, name: 'NVIDIA RTX 4070 Ti', category: 'GPU', price: 749.99, image: gpu6, description: '12GB GDDR6X powerful GPU for 1440p high refresh rate gaming.' },

    { id: 3, name: 'Corsair 32GB DDR4', category: 'RAM', price: 124.99, image: ram1, description: '32GB high-speed DDR4 memory kit for smooth multitasking and gaming.' },
    { id: 9, name: 'Corsair 128GB DDR5', category: 'RAM', price: 299.99, image: ram2, description: 'Massive 128GB DDR5 kit for heavy workloads, content creation & servers.' },
    { id: 115, name: 'G.Skill Trident Z5 32GB DDR5', category: 'RAM', price: 129.99, image: ram3, description: '32GB DDR5 6000MHz high-speed memory with RGB lighting.' },
    { id: 116, name: 'Kingston FB 16GB DDR4', category: 'RAM', price: 59.99, image: ram4, description: '16GB DDR4 3200MHz budget-friendly memory for gaming.' },
    { id: 117, name: 'Corsair DP 64GB DDR5', category: 'RAM', price: 249.99, image: ram5, description: '64GB DDR5 6000MHz dual-channel kit for ultimate performance.' },
    { id: 118, name: 'Crucial 16GB DDR5', category: 'RAM', price: 64.99, image: ram6, description: '16GB DDR5 5600MHz affordable memory for mainstream builds.' },

    { id: 4, name: 'Samsung 1TB NVMe SSD', category: 'Storage', price: 79.99, image: ssd1, description: 'Fast NVMe SSD with quick load times and responsive system storage.' },
    { id: 10, name: 'Samsung 2TB NVMe SSD', category: 'Storage', price: 129.99, image: ssd2, description: 'High-performance 2TB NVMe SSD sized for games, media & work.' },
    { id: 122, name: 'WD Black SN850X 1TB', category: 'Storage', price: 99.99, image: ssd3, description: '1TB PCIe 4.0 NVMe SSD with excellent speed and reliability.' },
    { id: 123, name: 'Crucial P5 Plus 1TB', category: 'Storage', price: 89.99, image: ssd4, description: '1TB budget-friendly PCIe 4.0 NVMe SSD for gaming.' },
    { id: 124, name: 'Samsung 990 Pro 4TB', category: 'Storage', price: 349.99, image: ssd5, description: '4TB PCIe 4.0 ultra-fast NVMe with heatsink for content creators.' },
    { id: 125, name: 'Sabrent Rocket 4 Plus 2TB', category: 'Storage', price: 159.99, image: ssd6, description: '2TB PCIe 4.0 high-speed SSD with excellent performance.' },

    { id: 5, name: 'NZXT H510 Flow', category: 'Case', price: 99.99, image: case1, description: 'Clean minimalist mid-tower case with good airflow and cable management.' },
    { id: 11, name: 'NZXT H510 Elite', category: 'Case', price: 159.99, image: case2, description: 'Premium H510 variant with dual tempered-glass and RGB fans included.' },
    { id: 129, name: 'Corsair 5000T RGB', category: 'Case', price: 379.99, image: case3, description: 'Massive full-tower case with excellent cooling and cable management.' },
    { id: 130, name: 'Lian Li Lancool 215 Mesh', category: 'Case', price: 49.99, image: case4, description: 'Budget mid-tower mesh case with great airflow and value.' },
    { id: 131, name: 'Phanteks Ecl P500A D-RGB', category: 'Case', price: 149.99, image: case5, description: 'High-airflow mesh case with integrated RGB fans.' },
    { id: 132, name: 'Corsair Crystal 570X RGB', category: 'Case', price: 169.99, image: case6, description: 'Stylish transparent case with excellent GPU and cooler support.' },

    { id: 6, name: 'MSI B650', category: 'Motherboard', price: 169.99, image: motherboard1, description: 'AM5 motherboard supporting Ryzen 7000/9000 CPUs, DDR5 & PCIe 5.0.' },
    { id: 12, name: 'ASUS GAMING X870', category: 'Motherboard', price: 249.99, image: motherboard2, description: 'High-end X870 motherboard with DDR5, PCIe 5.0 & Ryzen 9000 support.' },
    { id: 136, name: 'ASUS TUF Gaming X870-E', category: 'Motherboard', price: 279.99, image: motherboard3, description: 'Flagship X870-E with premium power delivery and cooling solutions.' },
    { id: 137, name: 'Gigabyte B850 Aorus', category: 'Motherboard', price: 199.99, image: motherboard4, description: 'Solid B850 option with DDR5 and good VRM for overclocking.' },
    { id: 138, name: 'MSI MPG B850E Edge', category: 'Motherboard', price: 249.99, image: motherboard5, description: 'High-performance B850E board with excellent connectivity.' },
    { id: 139, name: 'Intel Z790 Maximus Hero', category: 'Motherboard', price: 349.99, image: motherboard6, description: 'Premium Intel Z790 for high-end Intel 13th gen processors.' },

    { id: 13, name: 'Noctua NH-D15', category: 'Cooler', price: 89.99, image: cooler1, description: 'Premium air cooler with exceptional cooling performance.' },
    { id: 143, name: 'Corsair H150i Elite Capellix', category: 'Cooler', price: 169.99, image: cooler2, description: '360mm AIO liquid cooler with RGB and excellent performance.' },
    { id: 144, name: 'be quiet! Dark Rock Pro 4', category: 'Cooler', price: 79.99, image: cooler3, description: 'High-performance air cooler with silent operation.' },
    { id: 145, name: 'NZXT Kraken Z73', category: 'Cooler', price: 199.99, image: cooler4, description: '360mm AIO with LCD display and smart cooling control.' },
    { id: 146, name: 'Thermalright PE 120 SE', category: 'Cooler', price: 34.99, image: cooler5, description: 'Budget-friendly high-performance air cooler.' },
    { id: 147, name: 'Corsair ML120 PRO RGB', category: 'Cooler', price: 49.99, image: cooler6, description: 'High-performance 120mm RGB fan for custom cooling.' },

    { id: 14, name: 'Corsair RM850x', category: 'PSU', price: 119.99, image: psu1, description: '850W 80+ Gold certified power supply for reliable performance.' },
    { id: 151, name: 'EVGA SuperNOVA 850 G6', category: 'PSU', price: 99.99, image: psu2, description: '850W 80+ Gold with excellent efficiency and warranty.' },
    { id: 152, name: 'Seasonic Focus Gold 1000W', category: 'PSU', price: 149.99, image: psu3, description: '1000W 80+ Gold premium PSU for high-end builds.' },
    { id: 153, name: 'Corsair RM1200x', category: 'PSU', price: 179.99, image: psu4, description: '1200W modular 80+ Gold PSU for dual-GPU and extreme builds.' },
    { id: 154, name: 'MSI MPG A750GF', category: 'PSU', price: 89.99, image: psu5, description: '750W fully modular 80+ Gold with 10-year warranty.' },
    { id: 155, name: 'Thermaltake TP GF1 850W', category: 'PSU', price: 109.99, image: psu6, description: '850W fully modular with excellent ripple suppression.' },

    { id: 159, name: 'Dell S2721DGF', category: 'Monitor', price: 299.99, image: monitor1, description: '27" 1440p 165Hz IPS gaming monitor with G-Sync support.' },
    { id: 160, name: 'ASUS ROG Swift PG279Q', category: 'Monitor', price: 449.99, image: monitor2, description: '27" 1440p 165Hz IPS premium gaming monitor with excellent colors.' },
    { id: 161, name: 'LG 27GP850-B', category: 'Monitor', price: 349.99, image: monitor3, description: '27" 1440p 180Hz Nano IPS monitor perfect for competitive gaming.' },
    { id: 162, name: 'BenQ EW2880U', category: 'Monitor', price: 399.99, image: monitor4, description: '28" 4K professional monitor for content creation and design.' },
    { id: 163, name: 'Acer Predator X27', category: 'Monitor', price: 699.99, image: monitor5, description: '27" 1440p 240Hz gaming monitor with incredible refresh rates.' },
    { id: 164, name: 'MSI Optix MPG321QRF-QD', category: 'Monitor', price: 549.99, image: monitor6, description: '32" 1440p 165Hz mini-LED monitor with exceptional contrast.' },
  ];


  const [build, setBuild] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('CPU');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      loadBuild();
    } else {
      setBuild({});
      setLoading(false);
    }
  }, [user?.id]);

  const loadBuild = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/builds`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const buildData = await response.json();
        setBuild(buildData);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        setBuild({});
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading build:', error);
      setLoading(false);
    }
  };

  const saveBuild = async (updatedBuild) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('No auth token available for saving build');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/builds`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ build: updatedBuild }),
      });

      if (!response.ok && response.status === 401) {
        localStorage.removeItem('authToken');
        console.error('Authorization failed - token may be invalid');
      }
    } catch (error) {
      console.error('Error saving build:', error);
    }
  };

  const selectItem = (product) => {
    const categoryKey = product.category.toLowerCase();
    const updatedBuild = {
      ...build,
      [categoryKey]: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      },
    };
    setBuild(updatedBuild);
    saveBuild(updatedBuild);
    setModalOpen(false);
  };

  const removeItem = (categoryKey) => {
    const updatedBuild = { ...build };
    delete updatedBuild[categoryKey];
    setBuild(updatedBuild);
    saveBuild(updatedBuild);
  };

  const addSelectedToCart = () => {
    let hasEmpty = false;
    categoryKeys.forEach(key => {
      if (!build[key] || !build[key].id) hasEmpty = true;
    });

    if (hasEmpty) {
      if (onShowModal) {
        onShowModal({
          isOpen: true,
          type: 'error',
          title: 'Incomplete Build',
          message: 'Please select an item for each category before adding to cart',
          actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
        });
      }
      return;
    }

    const itemsToAdd = [];
    categoryKeys.forEach(key => {
      if (build[key] && build[key].id) {
        const product = build[key];
        itemsToAdd.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: key.charAt(0).toUpperCase() + key.slice(1),
        });
      }
    });

    itemsToAdd.forEach(item => onAddToCart(item));

    if (onShowModal) {
      const totalPrice = itemsToAdd.reduce((sum, item) => sum + item.price, 0);
      onShowModal({
        isOpen: true,
        type: 'success',
        title: 'Build Added to Cart',
        message: `Your complete PC build (${itemsToAdd.length} items) has been added to cart. Total: $${totalPrice.toFixed(2)}`,
        actions: [{ label: 'OK', onClick: () => onShowModal({ isOpen: false }) }]
      });
    }
  };

  if (loading) {
    return <div className="your-build"><p>Loading...</p></div>;
  }

  if (!user) {
    return (
      <div className="your-build">
        <h2>Your Build</h2>
        <p style={{ textAlign: 'center', color: '#888' }}>Please log in to save your PC build</p>
      </div>
    );
  }

  const filteredProducts = allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="your-build">
      <h2>Your PC Build</h2>
      <p className="build-subtitle">Select one component from each category to build your PC</p>

      <div className="build-grid">
        {categories.map((category, idx) => {
          const categoryKey = categoryKeys[idx];
          const selectedItem = build[categoryKey];
          const hasItem = selectedItem && selectedItem.id;

          return (
            <div key={category} className="build-box">
              <div className="build-box-header">
                <h3>{category}</h3>
              </div>

              {hasItem ? (
                <div className="selected-item">
                  <img src={selectedItem.image} alt={selectedItem.name} />
                  <div className="item-details">
                    <h4>{selectedItem.name}</h4>
                    <p className="item-description">{selectedItem.description}</p>
                    <p className="item-price">${selectedItem.price}</p>
                    <button
                      className="change-btn"
                      onClick={() => {
                        setSelectedCategory(category);
                        setModalOpen(true);
                      }}
                    >
                      Change
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(categoryKey)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-box">
                  <p>No item selected</p>
                  <button
                    className="select-btn"
                    onClick={() => {
                      setSelectedCategory(category);
                      setModalOpen(true);
                    }}
                  >
                    + Select {category}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select {selectedCategory}</h3>
              <button className="close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="modal-products">
              {filteredProducts.map(product => (
                <div key={product.id} className="modal-product">
                  <img src={product.image} alt={product.name} />
                  <div className="modal-product-info">
                    <h4>{product.name}</h4>
                    <p className="description">{product.description}</p>
                    <p className="price">${product.price}</p>
                    <button
                      className="select-item-btn"
                      onClick={() => selectItem(product)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="build-actions">
        <button className="add-build-to-cart-btn" onClick={addSelectedToCart}>
          Add Complete Build to Cart
        </button>
      </div>

      <div className="build-summary">
        <h3>Build Summary</h3>
        <div className="summary-items">
          {categoryKeys.map((key, idx) => {
            const item = build[key];
            const hasItem = item && item.id && item.name && item.price;
            return (
              <div key={key} className="summary-item">
                <span>{categories[idx]}:</span>
                <span>{hasItem ? `${item.name} - $${item.price}` : 'Not selected'}</span>
              </div>
            );
          })}
        </div>
        <div className="total-price">
          <strong>Total: ${categoryKeys.reduce((sum, key) => sum + (build[key]?.price || 0), 0).toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default YourBuild;
