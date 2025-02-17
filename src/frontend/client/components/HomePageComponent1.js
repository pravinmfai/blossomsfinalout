import React from 'react';
import '../styles/HomeComponent1.css';
import img from '../assest/trad-saree-1.jpg';
import { Link } from 'react-router-dom';

const HomeComponent1 = () => {
  return (
    <div className="home-page-container">
      <section className="home-section">
        <div className="home-image">
            <img src={img} alt="Cotton Sarees" />
        </div>
        <div className="home-content">
            <h1>Soft, Pure Cotton Sarees<br></br> Just for You.</h1>
            <p>
            Comfortable and beautiful sarees for every day.
            </p>
            <Link to="/shop" className="shop-button">Shop now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent1;
