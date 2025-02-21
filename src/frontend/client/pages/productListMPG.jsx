import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ecomstyle.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/starRating';
import cart from '../assest/cart.svg';

const ProductList = ({ searchQuery, dropdownOption }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Track added cart items
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-blssm-1.onrender.com/api/products', {
          withCredentials: true
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  console.log(products);

  const handleProductClick = (product) => {
    navigate(`productdescription`, { state: { product: product } });
  };

  function calculateOfferPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
  }

  const handleAddToCart = async (product) => {
    console.log("Button clicked", product);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to the cart");
      navigate("/login");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://blossomsfinalout.onrender.com/api/cart/add",
        { productId: product._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        alert("Item added to cart successfully!");
        setCartItems([...cartItems, product]); // Update local state
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };
  

  const filteredProducts = (() => {
    let result = products;

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      result = result.filter((product) =>
        [product.name, product.description, ...(product.colors || []), ...(product.tags || [])]
          .some((text) => text?.toLowerCase().includes(queryLower))
      );
    }

    if (dropdownOption === 'Latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (dropdownOption === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
          filteredProducts.map((product) => (
            <div 
              className="productcard"
              key={product._id}
              onClick={() => handleProductClick(product)}
            >
              <img src={product.imageUrl} alt="" />
              <h3>{product.name}</h3>
              <p className='productlistpinprodcutshowingoutside'>
                {product.description.length > 50 ? `${product.description.slice(0, 60)}...` : product.description}
              </p>
              <p className='price'>
                <span className='offprice'>
                  ₹{calculateOfferPrice(product.price, product.discountPercentage)}
                </span>
                <span className='ogprice'>₹{product.price}</span>
              </p>
              <button className='addtocart' onClick={(e) => { e.stopPropagation(); console.log("Button Clicked!"); handleAddToCart(product); }}>
                <img src={cart} alt="cart" />
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found for "{searchQuery}".</p>
        )}
      </div>
    </>
  );
};

export default ProductList;
