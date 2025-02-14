// components/LoaderWrapper.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader'; // Loader component with the animation

const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Set loading to true on route change

    const timer = setTimeout(() => {
      setLoading(false); // Disable loading after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [location]);

  return (
    <>
      {loading && <Loader />} {/* Show loader while loading */}
      {children} {/* Render the rest of the app */}
    </>
  );
};

export default LoaderWrapper;
