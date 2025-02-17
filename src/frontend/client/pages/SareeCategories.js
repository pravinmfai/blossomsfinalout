import React from "react";
import "../styles/SareeCategories.css";

const sareeCategories = [
  { name: "Sambalpuri", image: "https://meherbastralaya.com/wp-content/uploads/2023/07/wp-1689398105401.jpg" },
  { name: "Kanjeevaram", image: "https://goswadeshi.in/cdn/shop/files/gcsaaslsaa0135__1_1024x1024.jpg?v=1736936734" },
  { name: "Kota Doria", image: "https://www.gitagged.com/wp-content/uploads/2022/11/KOT-001-SAR-10-1.jpg" },
  { name: "Venkatagiri", image: "https://goswadeshi.in/cdn/shop/files/33-_281_29_2587bcf4-1351-4995-aedb-6def16b5d1d9.jpg?v=1696929672" },
  { name: "Handloom", image: "https://singhanias.in/cdn/shop/products/355284_20PL.jpg?v=1668107443" },
  { name: "Khadi", image: "https://www.parijatstore.com/cdn/shop/files/DSC01438_Custom_a7e8c490-6f64-40ab-be16-3e633ecd96c0_1445x.jpg?v=1717151442" },
  { name: "Tant", image: "https://images.meesho.com/images/products/16868566/6fcab_512.webp" },
  { name: "Chanderi", image: "https://vannamayil.com/cdn/shop/files/pure-chanderi-pattu-silk-saree-V04301_3.jpg?v=1698603153" }
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
