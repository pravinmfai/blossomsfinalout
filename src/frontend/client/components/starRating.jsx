import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import '../styles/ecomstyle.css';

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaStar key={i} color="lightgray" />);
    }
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
};

export default StarRating;
