import React ,{useEffect,useState}from 'react'
import axios from 'axios';
import '../styles/explcotsaree.css';
import { Link } from 'react-router-dom';

import StarRating from '../components/starRating';
import { useNavigate } from 'react-router-dom';
import cart from '../assest/cart.svg';

const Explcotsaree = () => {
  const [products, setProducts] = useState([]);
  const tags = "traditional";

  function calculateOfferPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const offerPrice = originalPrice - discountAmount;
    return offerPrice;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-blssm-1.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  


  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/shop/productdescription`,{ state: {product:product} });
    window.location.reload(); 
  };

  return (
    <div className='cottonSareeDisp'>

      <h1>Explore Cotton Sarees</h1>
      <p>Check out our latest collection of soft and stylish cotton sarees.</p>
      <div className="cottonsareelistingsec">
      {products.map((product) => {
        return (
          <div 
            className="productcard-ctn"
            key={product._id} 
            onClick={() => handleProductClick(product)}
          >
            <img src={`https://backend-blssm-1.onrender.com${product.imageUrl}`} alt="product" />
            <h3>{product.name}</h3>
            <p className='category-ymal'>{product.description.length > 50 ? `${product.description.slice(0,60)}..`: product.description}</p>
            <br></br>
            <p className='price-ymal'><span className='offprice-ymal'>₹{calculateOfferPrice(product.price, product.discountPercentage)}</span><span className='ogprice-ymal'>₹{product.price}</span></p>
            <button className='addtocart ymal'><img src="https://cdn-icons-png.flaticon.com/512/15515/15515011.png" alt="cart" />View Product</button>
          </div>
          )
        })}
        </div>
        <Link to="/shop" className='viewpro'>View all products</Link>
      
    </div>
  )
}

export default Explcotsaree
