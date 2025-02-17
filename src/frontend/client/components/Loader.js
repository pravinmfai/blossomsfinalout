import React, { useEffect } from 'react';
import '../styles/loader.css';

const Loader = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the loader appears
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-bar"></div>
    </div>
  );
};

export default Loader;
