import React, { useState } from 'react';
import '../styles/ecomstyle.css';
import minus from '../assest/minus.svg';
import plus from '../assest/plus.svg';
import StarRating from '../components/starRating';
import ColorSelector from '../components/colorSelector';
import cart from '../assest/cart.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Productdesc = ({ product }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); // Track added cart items
  const [count, setCount] = useState(1);
  const [popupMessage, setPopupMessage] = useState(null);

  function calculateOfferPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
  }

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleAddToCart = async () => {
    console.log("Button clicked", product);
    const token = localStorage.getItem("token");
    if (!token) {
      showPopup("Please log in to add items to the cart");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity: count },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        showPopup("Item added to cart successfully!");
        setCartItems([...cartItems, product]); // Update local state
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showPopup("Failed to add item to cart");
    }
  };

  const productColors = product?.colors || [];
  const handleColorSelect = (color) => console.log(`Selected color: ${color}`);
  const handleDecrement = () => count > 1 && setCount(count - 1);
  const handleIncrement = () => setCount(count + 1);

  return (
    <div className='productdescsec'>
      {popupMessage && <div className='popup-message'>{popupMessage}</div>}
      <div className='productimg-sec-lf'>
        <img className='image' src={`https://backend-blssm-1.onrender.com${product.imageUrl}`} alt="product" />
      </div>
      <div className='productdesc-sec-rg'>
        <div className='productdetails'>
          <h1>{product.name}</h1>
          <p className='category'>{product.description}</p>
          <p className='price'><span className='offprice'>₹{calculateOfferPrice(product.price, product.discountPercentage)}</span><span className='ogprice'>₹{product.price}</span></p>
          <p className='instock'>In-Stock</p>
        </div>
        <hr />
        <div className='productcolorselection'>
          <p>Available colors</p>
          <div className='colorselection'>
            <ColorSelector colors={productColors} onColorSelect={handleColorSelect} />
          </div>
        </div>
        <hr />
        <div className='productquantity'>
          <p>Add quantity</p>
          <div className='quantityselection'>
            <button className='minus' onClick={handleDecrement}><img src={minus} alt="minus" /></button>
            <span>{count.toString().padStart(2, '0')}</span>
            <button className='plus' onClick={handleIncrement}><img src={plus} alt="plus" /></button>
          </div>
        </div>
        <hr />
        <div className='buttontobuysection'>
          <button className='addtocart desc' onClick={handleAddToCart}>
            <img src={cart} alt="cart" />
            Add to cart
          </button>
          <button className='buynow'>Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default Productdesc;
