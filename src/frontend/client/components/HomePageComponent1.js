import React from 'react';
import '../styles/HomeComponent1.css';
import img from '../assest/trad-saree-1.jpg';

const HomeComponent1 = () => {
  return (
    <div className="home-page-container">
      <section className="home-section">
        <div className="home-image">
            <img src={img} alt="Cotton Sarees" />
        </div>
        <div className="home-content">
            <h1>Soft, Pure Cotton Sarees Just for You.</h1>
            <p>
            Comfortable and beautiful sarees for every day.
            </p>
            <button className="shop-button">Shop now</button>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent1;
