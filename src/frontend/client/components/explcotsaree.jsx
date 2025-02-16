import React ,{useEffect,useState}from 'react'
import axios from 'axios';
import '../styles/explcotsaree.css';

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

  console.log(products.imageUrl);
  


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
            <img src={`https://backend-1dmw.onrender.com${product.imageUrl}`} alt="product" />
            <h3>{product.name}</h3>
            <p className='category-ymal'>{product.category}</p>
            <StarRating rating={product.ratings} />
            <p className='price-ymal'><span className='offprice-ymal'>₹{calculateOfferPrice(product.price, product.discountPercentage)}</span><span className='ogprice-ymal'>₹{product.price}</span></p>
            <button className='addtocart ymal'>
              <img src={cart} alt="cart" />
              Add to cart
            </button>
          </div>
          )
        })}
        </div>
        <button className='viewpro'>View all products</button>
      
    </div>
  )
}

export default Explcotsaree
