import React,{ useState } from 'react';
import '../styles/ecomstyle.css';
import minus from '../assest/minus.svg';
import plus from '../assest/plus.svg';
import StarRating from '../components/starRating';
import ColorSelector from '../components/colorSelector';
import cart from '../assest/cart.svg';

const Productdesc = ({product}) => {

  function calculateOfferPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const offerPrice = originalPrice - discountAmount;
    return offerPrice;
  }

  const productColors = product?.colors || [];

  const handleColorSelect = (color) => {
    console.log(`Selected color: ${color}`);
  };

  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (

    <div className='productdescsec'>
      <div className='productimg-sec-lf'>
        <img className='image' src={`https://backend-blssm-1.onrender.com${product.imageUrl}`} alt="product" />
      </div>

      <div className='productdesc-sec-rg'>
          <div className='productdetails'>
            <h1>{product.name}</h1>
            <p className='category'>{product.description}</p>
            {/* <div className='ratingsec'>
              <StarRating rating={product.ratings} />
              <span>{product.ratings}/5</span>
            </div> */}

            <p className='price'><span className='offprice'>₹{calculateOfferPrice(product.price, product.discountPercentage)}</span><span className='ogprice'>₹{product.price}</span></p>
            <p className='instock'>In-Stock</p>
          </div>

          <hr />

          <div className='productcolorselection'>
            <p>Select colors</p>
            <div  className='colorselection'>
              <ColorSelector colors={productColors} onColorSelect={handleColorSelect} />
            </div>
          </div>

          <hr />

          <div className='productquantity'>
            <p>Add quantity</p>
            <div className='quantityselection'>
              <button className='minus' onClick={handleDecrement}>
                <img src={minus} alt="minus" />
                
              </button>
              
              <span>{count.toString().padStart(2, '0')}</span>
              
              <button className='plus' onClick={handleIncrement}>
                <img src={plus} alt="plus" />
                
              </button>
            </div>
          </div>

          <hr />

          <div className='buttontobuysection'>
              <button className='addtocart desc'>
                <img src={cart} alt="cart" />
                Add to cart
              </button>
              <button className='buynow'>Buy now</button>
          </div>
          
      </div>
    </div>
  )
}

export default Productdesc
