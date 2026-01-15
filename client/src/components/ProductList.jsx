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
import '../styles/ProductList.scss';
import { useState } from 'react';

const ProductList = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('CPU');

  const products = [
    // CPUs
    { id: 1, name: 'AMD Ryzen 7 5800X', category: 'CPU', price: 184.99, image: ryzen, description: '8-core / 16-thread AM4 processor, great for gaming and productivity.' },
    { id: 7, name: 'AMD Ryzen 9 9950X3D', category: 'CPU', price: 699.99, image: ryzen1, description: '16-core / 32-thread AM5 CPU for top-tier gaming performance.' },
    { id: 101, name: 'Intel Core i9-14900K', category: 'CPU', price: 589.99, image: ryzen, description: '24-core / 32-thread processor for extreme gaming and workstation use.' },
    { id: 102, name: 'AMD Ryzen 5 7600X', category: 'CPU', price: 229.99, image: ryzen, description: '6-core / 12-thread mid-range CPU perfect for 1080p gaming.' },
    { id: 103, name: 'Intel Core i7-14700K', category: 'CPU', price: 409.99, image: ryzen, description: '20-core / 28-thread high-performance CPU with P-cores and E-cores.' },
    { id: 104, name: 'AMD Ryzen 9 7950X', category: 'CPU', price: 549.99, image: ryzen, description: '16-core / 32-thread powerhouse for content creation and gaming.' },
    { id: 105, name: 'Intel Core i5-14600K', category: 'CPU', price: 309.99, image: ryzen, description: '14-core / 20-thread affordable high-performance processor.' },
    { id: 106, name: 'AMD Ryzen 7 7700X', category: 'CPU', price: 349.99, image: ryzen, description: '8-core / 16-thread AM5 CPU ideal for gaming and streaming.' },
    { id: 107, name: 'Intel Core i9-13900K', category: 'CPU', price: 499.99, image: ryzen, description: 'Previous generation flagship with 24 cores for maximum performance.' },

    // GPUs
    { id: 2, name: 'NVIDIA RTX 3080', category: 'GPU', price: 449.99, image: rtx, description: '10GB GDDR6X GPU built for high-FPS 1440p and 4K gaming performance.' },
    { id: 8, name: 'NVIDIA RTX 5090', category: 'GPU', price: 1999.99, image: rtx1, description: '32GB GDDR7 flagship GPU for extreme 4K/8K gaming and AI workloads.' },
    { id: 108, name: 'AMD Radeon RX 7900 XTX', category: 'GPU', price: 649.99, image: rtx, description: '24GB GDDR6 memory with RDNA 3 architecture for competitive gaming.' },
    { id: 109, name: 'NVIDIA RTX 4080 Super', category: 'GPU', price: 799.99, image: rtx, description: '16GB GDDR6X high-end GPU perfect for 4K gaming and content creation.' },
    { id: 110, name: 'Intel Arc A770', category: 'GPU', price: 329.99, image: rtx, description: '8GB GDDR6 budget-friendly discrete graphics with ray tracing.' },
    { id: 111, name: 'NVIDIA RTX 4070 Ti', category: 'GPU', price: 749.99, image: rtx, description: '12GB GDDR6X powerful GPU for 1440p high refresh rate gaming.' },
    { id: 112, name: 'AMD Radeon RX 7800 XT', category: 'GPU', price: 399.99, image: rtx, description: '16GB GDDR6 excellent mid-range GPU for 1440p and 4K gaming.' },
    { id: 113, name: 'NVIDIA RTX 4060 Ti', category: 'GPU', price: 499.99, image: rtx, description: '8GB GDDR6 entry-level high-performance graphics card.' },
    { id: 114, name: 'NVIDIA RTX 3070 Ti', category: 'GPU', price: 599.99, image: rtx, description: '8GB GDDR6X legacy flagship for 1440p ultra gaming.' },

    // RAM
    { id: 3, name: 'Corsair 32GB DDR4', category: 'RAM', price: 124.99, image: ram, description: '32GB high-speed DDR4 memory kit for smooth multitasking and gaming.' },
    { id: 9, name: 'Corsair 128GB DDR5', category: 'RAM', price: 299.99, image: ram1, description: 'Massive 128GB DDR5 kit for heavy workloads, content creation & servers.' },
    { id: 115, name: 'G.Skill Trident Z5 32GB DDR5', category: 'RAM', price: 129.99, image: ram, description: '32GB DDR5 6000MHz high-speed memory with RGB lighting.' },
    { id: 116, name: 'Kingston Fury Beast 16GB DDR4', category: 'RAM', price: 59.99, image: ram, description: '16GB DDR4 3200MHz budget-friendly memory for gaming.' },
    { id: 117, name: 'Corsair Dominator Platinum 64GB DDR5', category: 'RAM', price: 249.99, image: ram, description: '64GB DDR5 6000MHz dual-channel kit for ultimate performance.' },
    { id: 118, name: 'Crucial 16GB DDR5', category: 'RAM', price: 64.99, image: ram, description: '16GB DDR5 5600MHz affordable memory for mainstream builds.' },
    { id: 119, name: 'ADATA XPG Spectrix D50 32GB DDR5', category: 'RAM', price: 139.99, image: ram, description: '32GB DDR5 with RGB and active cooling for enthusiast builds.' },
    { id: 120, name: 'Patriot Viper Steel 32GB DDR4', category: 'RAM', price: 119.99, image: ram, description: '32GB DDR4 4400MHz high-speed gaming memory.' },
    { id: 121, name: 'TeamGroup Dark Pro 16GB DDR5', category: 'RAM', price: 74.99, image: ram, description: '16GB DDR5 7200MHz ultra-fast memory for high-end systems.' },

    // Storage
    { id: 4, name: 'Samsung 1TB NVMe SSD', category: 'Storage', price: 79.99, image: ssd, description: 'Fast NVMe SSD with quick load times and responsive system storage.' },
    { id: 10, name: 'Samsung 2TB NVMe SSD', category: 'Storage', price: 129.99, image: ssd1, description: 'High-performance 2TB NVMe SSD sized for games, media & work.' },
    { id: 122, name: 'WD Black SN850X 1TB', category: 'Storage', price: 99.99, image: ssd, description: '1TB PCIe 4.0 NVMe SSD with excellent speed and reliability.' },
    { id: 123, name: 'Crucial P5 Plus 1TB', category: 'Storage', price: 89.99, image: ssd, description: '1TB budget-friendly PCIe 4.0 NVMe SSD for gaming.' },
    { id: 124, name: 'Samsung 990 Pro 4TB', category: 'Storage', price: 349.99, image: ssd, description: '4TB PCIe 4.0 ultra-fast NVMe with heatsink for content creators.' },
    { id: 125, name: 'Sabrent Rocket 4 Plus 2TB', category: 'Storage', price: 159.99, image: ssd, description: '2TB PCIe 4.0 high-speed SSD with excellent performance.' },
    { id: 126, name: 'Kingston A3000 500GB', category: 'Storage', price: 39.99, image: ssd, description: '500GB affordable SSD for budget builds and upgrades.' },
    { id: 127, name: 'Seagate Barracuda Pro 2TB HDD', category: 'Storage', price: 89.99, image: ssd, description: '2TB traditional hard drive for mass storage needs.' },
    { id: 128, name: 'WD Red Pro 4TB NAS HDD', category: 'Storage', price: 129.99, image: ssd, description: '4TB NAS-optimized drive for network storage systems.' },

    // Cases
    { id: 5, name: 'NZXT H510 Flow', category: 'Case', price: 99.99, image: case_img, description: 'Clean minimalist mid-tower case with good airflow and cable management.' },
    { id: 11, name: 'NZXT H510 Elite', category: 'Case', price: 159.99, image: case_img1, description: 'Premium H510 variant with dual tempered-glass and RGB fans included.' },
    { id: 129, name: 'Corsair 5000T RGB', category: 'Case', price: 379.99, image: case_img, description: 'Massive full-tower case with excellent cooling and cable management.' },
    { id: 130, name: 'Lian Li Lancool 215 Mesh', category: 'Case', price: 49.99, image: case_img, description: 'Budget mid-tower mesh case with great airflow and value.' },
    { id: 131, name: 'Phanteks Eclipse P500A D-RGB', category: 'Case', price: 149.99, image: case_img, description: 'High-airflow mesh case with integrated RGB fans.' },
    { id: 132, name: 'Corsair Crystal 570X RGB', category: 'Case', price: 169.99, image: case_img, description: 'Stylish transparent case with excellent GPU and cooler support.' },
    { id: 133, name: 'Fractal Design North', category: 'Case', price: 139.99, image: case_img, description: 'Minimalist Scandinavian design case with clean aesthetics.' },
    { id: 134, name: 'Be Quiet! Pure Base 500DX', category: 'Case', price: 89.99, image: case_img, description: 'Silent case with excellent noise dampening and thermals.' },
    { id: 135, name: 'Thermaltake Level 20 HT', category: 'Case', price: 229.99, image: case_img, description: 'Modular case with unique dual-chamber design for premium builds.' },

    // Motherboards
    { id: 6, name: 'MSI B650', category: 'Motherboard', price: 169.99, image: motherboard, description: 'AM5 motherboard supporting Ryzen 7000/9000 CPUs, DDR5 & PCIe 5.0.' },
    { id: 12, name: 'ASUS GAMING X870', category: 'Motherboard', price: 249.99, image: motherboard1, description: 'High-end X870 motherboard with DDR5, PCIe 5.0 & Ryzen 9000 support.' },
    { id: 136, name: 'ASUS TUF Gaming X870-E', category: 'Motherboard', price: 279.99, image: motherboard, description: 'Flagship X870-E with premium power delivery and cooling solutions.' },
    { id: 137, name: 'Gigabyte B850 Aorus', category: 'Motherboard', price: 199.99, image: motherboard, description: 'Solid B850 option with DDR5 and good VRM for overclocking.' },
    { id: 138, name: 'MSI MPG B850E Edge', category: 'Motherboard', price: 249.99, image: motherboard, description: 'High-performance B850E board with excellent connectivity.' },
    { id: 139, name: 'Intel Z790 Maximus Hero', category: 'Motherboard', price: 349.99, image: motherboard, description: 'Premium Intel Z790 for high-end Intel 13th gen processors.' },
    { id: 140, name: 'NZXT N7 Z790', category: 'Motherboard', price: 299.99, image: motherboard, description: 'Integrated liquid cooling and Intel 13th gen support.' },
    { id: 141, name: 'ASRock B850M-ITX/TB4', category: 'Motherboard', price: 189.99, image: motherboard, description: 'Mini-ITX AM5 board with Thunderbolt 4 for compact builds.' },
    { id: 142, name: 'Gigabyte Z790 Aorus Master', category: 'Motherboard', price: 289.99, image: motherboard, description: 'Premium Intel Z790 with excellent phase design and connectivity.' },

    // Coolers
    { id: 13, name: 'Noctua NH-D15', category: 'Cooler', price: 89.99, image: ryzen, description: 'Premium air cooler with exceptional cooling performance.' },
    { id: 143, name: 'Corsair H150i Elite Capellix', category: 'Cooler', price: 169.99, image: ryzen, description: '360mm AIO liquid cooler with RGB and excellent performance.' },
    { id: 144, name: 'be quiet! Dark Rock Pro 4', category: 'Cooler', price: 79.99, image: ryzen, description: 'High-performance air cooler with silent operation.' },
    { id: 145, name: 'NZXT Kraken Z73', category: 'Cooler', price: 199.99, image: ryzen, description: '360mm AIO with LCD display and smart cooling control.' },
    { id: 146, name: 'Thermalright Peerless Assassin 120 SE', category: 'Cooler', price: 34.99, image: ryzen, description: 'Budget-friendly high-performance air cooler.' },
    { id: 147, name: 'Corsair ML120 PRO RGB', category: 'Cooler', price: 49.99, image: ryzen, description: 'High-performance 120mm RGB fan for custom cooling.' },
    { id: 148, name: 'EKWB EK-AIO 280 D-RGB', category: 'Cooler', price: 139.99, image: ryzen, description: '280mm AIO from premium cooling brand with superior performance.' },
    { id: 149, name: 'Scythe Mugen 5 Rev. B', category: 'Cooler', price: 54.99, image: ryzen, description: 'Large tower air cooler with excellent value and performance.' },
    { id: 150, name: 'Lian Li Galahad 360 SL', category: 'Cooler', price: 129.99, image: ryzen, description: '360mm AIO with low-profile design suitable for any case.' },

    // PSUs
    { id: 14, name: 'Corsair RM850x', category: 'PSU', price: 119.99, image: rtx, description: '850W 80+ Gold certified power supply for reliable performance.' },
    { id: 151, name: 'EVGA SuperNOVA 850 G6', category: 'PSU', price: 99.99, image: rtx, description: '850W 80+ Gold with excellent efficiency and warranty.' },
    { id: 152, name: 'Seasonic Focus Gold 1000W', category: 'PSU', price: 149.99, image: rtx, description: '1000W 80+ Gold premium PSU for high-end builds.' },
    { id: 153, name: 'Corsair RM1200x', category: 'PSU', price: 179.99, image: rtx, description: '1200W modular 80+ Gold PSU for dual-GPU and extreme builds.' },
    { id: 154, name: 'MSI MPG A750GF', category: 'PSU', price: 89.99, image: rtx, description: '750W fully modular 80+ Gold with 10-year warranty.' },
    { id: 155, name: 'Thermaltake Toughpower GF1 850W', category: 'PSU', price: 109.99, image: rtx, description: '850W fully modular with excellent ripple suppression.' },
    { id: 156, name: 'be quiet! Straight Power 12 600W', category: 'PSU', price: 79.99, image: rtx, description: '600W silent PSU perfect for mid-range builds.' },
    { id: 157, name: 'Gigabyte P1000GM', category: 'PSU', price: 129.99, image: rtx, description: '1000W modular 80+ Gold for powerful gaming systems.' },
    { id: 158, name: 'Corsair SF750', category: 'PSU', price: 139.99, image: rtx, description: '750W fully modular SFX PSU ideal for small form factor builds.' },

    // Monitors
    { id: 159, name: 'Dell S2721DGF', category: 'Monitor', price: 299.99, image: rtx, description: '27" 1440p 165Hz IPS gaming monitor with G-Sync support.' },
    { id: 160, name: 'ASUS ROG Swift PG279Q', category: 'Monitor', price: 449.99, image: rtx, description: '27" 1440p 165Hz IPS premium gaming monitor with excellent colors.' },
    { id: 161, name: 'LG 27GP850-B', category: 'Monitor', price: 349.99, image: rtx, description: '27" 1440p 180Hz Nano IPS monitor perfect for competitive gaming.' },
    { id: 162, name: 'BenQ EW2880U', category: 'Monitor', price: 399.99, image: rtx, description: '28" 4K professional monitor for content creation and design.' },
    { id: 163, name: 'Acer Predator X27', category: 'Monitor', price: 699.99, image: rtx, description: '27" 1440p 240Hz gaming monitor with incredible refresh rates.' },
    { id: 164, name: 'MSI Optix MPG321QRF-QD', category: 'Monitor', price: 549.99, image: rtx, description: '32" 1440p 165Hz mini-LED monitor with exceptional contrast.' },
    { id: 165, name: 'LG UltraWide 34GP950B', category: 'Monitor', price: 799.99, image: rtx, description: '34" 3440x1440 144Hz ultrawide for immersive gaming and work.' },
    { id: 166, name: 'Dell S2422HZ', category: 'Monitor', price: 279.99, image: rtx, description: '24" 1080p 155Hz fast-response monitor perfect for esports.' },
    { id: 167, name: 'ASUS PA328Q', category: 'Monitor', price: 649.99, image: rtx, description: '32" 4K professional monitor with 99% Adobe RGB for creators.' },
  ];

  const categories = ['CPU', 'Cooler', 'Motherboard', 'RAM', 'Storage', 'GPU', 'PSU', 'Case', 'Monitor'];

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div className="products">
      <h2>Available PC Parts</h2>
      
      {/* Desktop: Button list */}
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

      {/* Mobile/Tablet: Dropdown */}
      <div className="category-dropdown">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
              <p className="price">${product.price}</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
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