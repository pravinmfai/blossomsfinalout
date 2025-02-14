import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Productdesc from '../components/product-desc';
import Productreview from '../components/productreview';
import Youmightalsolike from '../components/youmightalsolike';

const ProductdescMPG = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [currentProduct, setCurrentProduct] = useState(product);

  useEffect(() => {
    // When the product changes in the state, update the displayed product
    setCurrentProduct(product);
    window.scrollTo(0, 0); // Optional: Scroll to top
  }, [product]);

  return (
    <>
      <Productdesc product={currentProduct} />
      <Productreview />
      <Youmightalsolike tags={currentProduct?.tags || []} />
    </>
  );
};

export default ProductdescMPG;
