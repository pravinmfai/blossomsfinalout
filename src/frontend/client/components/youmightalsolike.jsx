import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ecomstyle.css';
import StarRating from '../components/starRating';
import { useNavigate } from 'react-router-dom';
import cart from '../assest/cart.svg';

const Youmightalsolike = ({tags}) => {
  const [products, setProducts] = useState([]);

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
    console.log(product);
  };


  const filteredProducts = products.filter((product) =>
    product.tags.some((tag) => tags.includes(tag))
  );

  function calculateOfferPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const offerPrice = originalPrice - discountAmount;
    return offerPrice;
  }

  return (
    <div className='youmightalsolike'>

      <h1>You might also like</h1>
      <div className="youmightalsolikelistingsec">
      {filteredProducts.map((product) => {
        return (
          <div 
            className="productcard-ymal"
            key={product._id} 
            onClick={() => handleProductClick(product)}
          >
            <img src={`https://backend-blssm-1.onrender.com${product.imageUrl}`} alt="product" />
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
      
    </div>
  )
}

export default Youmightalsolike
