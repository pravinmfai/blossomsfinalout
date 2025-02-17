import React from "react";
import "../styles/SareeCategories.css";

const sareeCategories = [
  { name: "Sambalpuri", image: "https://meherbastralaya.com/wp-content/uploads/2023/07/wp-1689398105401.jpg" },
  { name: "Kanjeevaram", image: "https://goswadeshi.in/cdn/shop/files/gcsaaslsaa0135__1_1024x1024.jpg?v=1736936734" },
  { name: "Kota Doria", image: "https://www.gitagged.com/wp-content/uploads/2022/11/KOT-001-SAR-10-1.jpg" },
  { name: "Venkatagiri", image: "https://www.innilavinfashion.com/cdn/shop/products/IMG-20220529-WA0005.jpg?v=1653772781" },
  { name: "Handloom", image: "https://www.innilavinfashion.com/cdn/shop/products/IMG-20220529-WA0005.jpg?v=1653772781" },
  { name: "Khadi", image: "https://www.innilavinfashion.com/cdn/shop/products/IMG-20220529-WA0005.jpg?v=1653772781" },
  { name: "Tant", image: "https://www.innilavinfashion.com/cdn/shop/products/IMG-20220529-WA0005.jpg?v=1653772781" },
  { name: "Chanderi", image: "https://www.innilavinfashion.com/cdn/shop/products/IMG-20220529-WA0005.jpg?v=1653772781" }
];

const SareeCategories = () => {
  return (
    <div className="sareecontainer">
      <h2 className="title">Explore our categories for you</h2>
      <p className="description">
        Browse our wide selection of cotton sarees. Whether you love handloom styles
        or modern designs, there's something here just for you!
      </p>
      <div className="grid-container">
        {sareeCategories.map((saree, index) => (
          <div key={index} className="saree-card">
            <img src={saree.image} alt={saree.name} className="saree-image" />
            <div className="overlay">
              <span className="overlay-text">{saree.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SareeCategories;
