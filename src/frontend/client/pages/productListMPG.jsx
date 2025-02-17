import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ecomstyle.css';
// import { FakeData } from '../fakeData';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/starRating'
import cart from '../assest/cart.svg';

const ProductList = ({ searchQuery,dropdownOption  }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {const fetchProducts = async () => {
    try {
      const response = await axios.get('https://backend-blssm-1.onrender.com/api/products', {
        withCredentials: true // This ensures cookies and auth headers are included
      });
      setProducts(response.data); // Assuming the data comes as an array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

    fetchProducts();
  }, []);

  console.log(products);

  const handleProductClick = (product) => {
    navigate(`productdescription`,{ state: {product:product} });
    console.log(product.color);
  };

  function calculateOfferPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const offerPrice = originalPrice - discountAmount;
    return offerPrice;
  }

  const filteredProducts = (() => {
    // Start with all products if there's no search query
    let result = products;
  
    if (searchQuery) {
      result = result.filter((product) => {
        const queryLower = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(queryLower);
        const descriptionMatch = product.description && product.description.trim().toLowerCase().includes(queryLower);
        const colorMatch = product.colors && product.colors.some(color => color.toLowerCase().includes(queryLower));
        const tagMatch = product.tags && product.tags.some(tag => tag.toLowerCase().includes(queryLower));
  
        console.log('Name Match:', nameMatch);
        console.log('Description Match:', descriptionMatch);
        console.log('Color Match:', colorMatch);
        console.log('Tag Match:', tagMatch);
        console.log('Search Query:', searchQuery);
        console.log('Search Query:', queryLower);
        console.log('Product Description:', product.description && product.description.toLowerCase());



        return nameMatch || descriptionMatch || colorMatch || tagMatch;
      });
    }
  
    // Sort the products based on dropdown selection
    if (dropdownOption === 'Latest') {
      result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (dropdownOption === 'Oldest') {
      result = result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
  
    return result;
  })();
  


  return (
    <>
      <div className='brfyheading'>
        <h1>Best recommendations for you</h1>
      </div>
      <div className="productlistingsec">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            return (
              <div 
                className="productcard"
                key={product._id}
                onClick={() => handleProductClick(product)}
              >
                <img src={`https://backend-blssm-1.onrender.com${product.imageUrl}`} alt="" />
                <h3>{product.name}</h3>
                <p className='category'>{product.category}</p>
                <StarRating rating={product.ratings} />
                <p className='price'>
                  <span className='offprice'>
                    ₹{calculateOfferPrice(product.price, product.discountPercentage)}
                  </span>
                  <span className='ogprice'>₹{product.price}</span>
                </p>
                <button className='addtocart'>
                  <img src={cart} alt="cart" />
                  Add to cart
                </button>
              </div>
            );
          })
        ) : (
          <p>No products found for "{searchQuery}".</p>
        )}
      </div>
    </>
  );
}

export default ProductList
