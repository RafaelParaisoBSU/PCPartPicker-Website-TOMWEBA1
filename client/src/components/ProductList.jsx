import ryzen from '../assets/products/ryzen.png';
import rtx from '../assets/products/rtx.png';
import ram from '../assets/products/ram.png';
import ssd from '../assets/products/ssd.png';
import case_img from '../assets/products/case.png';
import motherboard from '../assets/products/motherboard.png';
import '../styles/ProductList.scss';

const ProductList = ({ onAddToCart }) => {
  const products = [
    { id: 1, name: 'AMD Ryzen 7 5800X', category: 'CPU', price: 299.99, image: ryzen, description: '8-core, 16-thread processor for high-performance computing' },
    { id: 2, name: 'NVIDIA RTX 3080', category: 'GPU', price: 699.99, image: rtx, description: '10GB GDDR6X graphics card for ultimate gaming performance' },
    { id: 3, name: 'Corsair 32GB DDR4', category: 'RAM', price: 149.99, image: ram, description: 'High-speed DDR4 memory for smooth multitasking' },
    { id: 4, name: 'Samsung 1TB NVMe SSD', category: 'Storage', price: 129.99, image: ssd, description: 'Ultra-fast NVMe storage solution with large storage capacity' },
    { id: 5, name: 'NZXT H510', category: 'Case', price: 69.99, image: case_img, description: 'Sleek and modern ATX mid-tower case, perfect for medium sized builds' },
    { id: 6, name: 'MSI B650', category: 'Motherboard', price: 149.99, image: motherboard, description: 'Feature-rich AM5 motherboard with Ryzen 9000 support' },
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