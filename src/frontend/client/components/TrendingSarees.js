import React from 'react';
import '../styles/TrendingSarees.css';
import img1 from '../assest/tren-sarees-1.jpg';
import img2 from '../assest/tren-sarees-2.jpg';
import img3 from '../assest/tren-sarees-3.jpg';
import img4 from '../assest/tren-sarees-4.jpg';
import img5 from '../assest/tren-sarees-5.jpg';

const TrendingSarees = () => {
  return (
    <div className="sarees-container">
      <div className="sarees-column">
        <img src={img1} alt="Saree 2" className="saree-image" />
        <img src={img2} alt="Saree 3" className="saree-image" />
      </div>
      <div className="sarees-column">
        <img src={img3} alt="Saree 4" className="saree-image" />
        <img src={img4} alt="Saree 5" className="saree-image" />
      </div>
      <div className="sarees-main">
        <h1 className="sarees-title">Trending Sarees</h1>
        <p className="sarees-description">
          Check out our latest collection of soft and stylish cotton sarees.
        </p>
        <button className="explore-button">Explore</button>
        <img src={img5} alt="Main saree" className="saree-image main-image" />
      </div>
    </div>
  );
};

export default TrendingSarees;