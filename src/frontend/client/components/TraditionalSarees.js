import React from 'react';
import '../styles/TraditionalSarees.css'; 
import img1 from '../assest/trad-saree-1.jpg';
import img2 from '../assest/trad-saree-2.jpg';
import img3 from '../assest/trad-saree-3.jpg';
import img4 from '../assest/trad-saree-4.jpg';
import img5 from '../assest/trad-saree-5.jpg';

const NewTraditionalSarees = () => {
  return (
    <div className="new-sarees-container">
      <div className="new-sarees-main">
        <h1 className="new-sarees-title">Traditional Sarees</h1>
        <p className="new-sarees-description">
          Check out our latest collection of soft and stylish cotton sarees.
        </p>
        <button className="new-explore-button">Explore</button>
        <img src={img1} alt="Main saree" className="new-saree-image new-main-image" />
      </div>
      <div className="new-sarees-column">
        <img src={img2} alt="Saree 2" className="new-saree-image" />
        <img src={img3} alt="Saree 3" className="new-saree-image" />
      </div>
      <div className="new-sarees-column">
        <img src={img4} alt="Saree 4" className="new-saree-image" />
        <img src={img5} alt="Saree 5" className="new-saree-image" />
      </div>
    </div>
  );
};

export default NewTraditionalSarees;
