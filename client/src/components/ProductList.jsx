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

import '../styles/ProductList.scss';
import { useState } from 'react';

const ProductList = ({ onAddToCart }) => {
  // Track selected category
  const [selectedCategory, setSelectedCategory] = useState('CPU');

  // Product data
  const products = [
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

  // Categories for filter
  const categories = ['CPU', 'Cooler', 'Motherboard', 'RAM', 'Storage', 'GPU', 'PSU', 'Case', 'Monitor'];

  // Filter products by category
  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div className="products">
      <h2>Available PC Parts</h2>

      {/* Desktop: Button filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile: Dropdown filter */}
      <div className="category-dropdown">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
              <p className="price">${product.price}</p>
              <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
