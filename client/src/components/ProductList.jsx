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

const ProductList = ({ onAddToCart }) => {
  const products = [
    { id: 1, name: 'AMD Ryzen 7 5800X', category: 'CPU', price: 184.99, image: ryzen, description: '8-core / 16-thread AM4 processor, great for gaming and productivity.' },
    { id: 2, name: 'NVIDIA RTX 3080', category: 'GPU', price: 449.99, image: rtx, description: '10GB GDDR6X GPU built for high-FPS 1440p and 4K gaming performance.' },
    { id: 3, name: 'Corsair 32GB DDR4', category: 'RAM', price: 124.99, image: ram, description: '32GB high-speed DDR4 memory kit for smooth multitasking and gaming.' },
    { id: 4, name: 'Samsung 1TB NVMe SSD', category: 'Storage', price: 79.99, image: ssd, description: 'Fast NVMe SSD with quick load times and responsive system storage.' },
    { id: 5, name: 'NZXT H510 Flow', category: 'Case', price: 99.99, image: case_img, description: 'Clean minimalist mid-tower case with good airflow and cable management.' },
    { id: 6, name: 'MSI B650', category: 'Motherboard', price: 169.99, image: motherboard, description: 'AM5 motherboard supporting Ryzen 7000/9000 CPUs, DDR5 & PCIe 5.0.' },
    { id: 7, name: 'AMD Ryzen 9 9950X3D', category: 'CPU', price: 699.99, image: ryzen1, description: '16-core / 32-thread AM5 CPU for top-tier gaming performance.' },
    { id: 8, name: 'NVIDIA RTX 5090', category: 'GPU', price: 1999.99, image: rtx1, description: '32GB GDDR7 flagship GPU for extreme 4K/8K gaming and AI workloads.' },
    { id: 9, name: 'Corsair 128GB DDR5', category: 'RAM', price: 299.99, image: ram1, description: 'Massive 128GB DDR5 kit for heavy workloads, content creation & servers.' },
    { id: 10, name: 'Samsung 2TB NVMe SSD', category: 'Storage', price: 129.99, image: ssd1, description: 'High-performance 2TB NVMe SSD sized for games, media & work.' },
    { id: 11, name: 'NZXT H510 Elite', category: 'Case', price: 159.99, image: case_img1, description: 'Premium H510 variant with dual tempered-glass and RGB fans included.' },
    { id: 12, name: 'ASUS GAMING X870', category: 'Motherboard', price: 249.99, image: motherboard1, description: 'High-end X870 motherboard with DDR5, PCIe 5.0 & Ryzen 9000 support.' },
  ];

  return (
    <div className="products">
      <h2>Available PC Parts</h2>
      <div className="products-grid">
        {products.map((product) => (
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