import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Meena Lakshmi',
    rating: 4,
    comment: '"Saree color super ah irundhuchu! Fabric also very soft and comfortable. Worth the price!"',
    date: 'Posted on August 11, 2024',
    verified: true,
  },
  {
    id: 2,
    name: 'Prakash Kumar',
    rating: 4.5,
    comment: '"Quality semma! En wife ku romba pudichirukku. Delivery also fast ah vandhudhu. Good service!"',
    date: 'Posted on November 24, 2024',
    verified: true,
  },
  {
    id: 3,
    name: 'Sangeetha Ravi',
    rating: 5,
    comment: '"Konjam delay aagiduchu but saree design super! Fitting also perfect. Customer service friendly ah handle pannanga."',
    date: 'Posted on December 03, 2024',
    verified: true,
  },
  {
    id: 4,
    name: 'Karthik Shanmugam',
    rating: 4,
    comment: '"En amma ku vaanginen, avanga ku romba pudichirukku! Material soft ah irundhuchu and color same as shown in the picture."',
    date: 'Posted on January 15, 2025',
    verified: true,
  },
  {
    id: 5,
    name: 'Divya Ramesh',
    rating: 5,
    comment: '"First time online la saree vaanginen, doubt ah irundhuchu, but product semmaya irundhuchu! Definitely again vaanguven."',
    date: 'Posted on February 2, 2025',
    verified: true,
  },
  {
    id: 6,
    name: 'Ganesh Murthy',
    rating: 3.5,
    comment: '"Design and fabric nalla irundhuchu, but blouse stitching konjam loose aayiduchu. Overall nice purchase."',
    date: 'Posted on February 10, 2025',
    verified: true,
  },
  {
    id: 7,
    name: 'Lakshmi Narayanan',
    rating: 5,
    comment: '"Festival ku saree vaanginen, ellarum appreciate pannanga! Color fade aagala, perfect traditional look!"',
    date: 'Posted on March 5, 2025',
    verified: true,
  },
  {
    id: 8,
    name: 'Swetha Rajan',
    rating: 4.5,
    comment: '"Fast delivery and packing also neat ah irundhuchu! Saree drape semma comfortable, light weight feel."',
    date: 'Posted on April 1, 2025',
    verified: true,
  },
  {
    id: 9,
    name: 'Ravi Shankar',
    rating: 4,
    comment: '"Saree product quality is excellent. Slight delay in delivery but worth the wait."',
    date: 'Posted on May 15, 2025',
    verified: true,
  },
  {
    id: 10,
    name: 'Anjali Mehta',
    rating: 4.5,
    comment: '"Excellent design, material and packaging. Definitely recommend it to others."',
    date: 'Posted on June 22, 2025',
    verified: true,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Auto-scroll every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="testimonial-slider">
      <h2 className="testimonial-title">Our Customer Feedbacks</h2>
      <p className="testimonial-subtitle">
        Browse our wide selection of cotton sarees. Whether you love handloom styles or modern designs, there's something here just for you! See what our customers tell
      </p>
      <div
        className="testimonial-container"
        style={{
          transform: `translateX(-${(currentIndex * 10)}%)`, // Adjust the slide position
        }}
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(testimonial.rating) ? '#FFD700' : 'none'}
                  stroke={i < Math.ceil(testimonial.rating) ? '#FFD700' : '#D3D3D3'}
                />
              ))}
            </div>
            <div className="testimonial-header">
              <span className="testimonial-name">{testimonial.name}</span>
              {testimonial.verified && <span className="testimonial-verified">✓</span>}
            </div>
            <p className="testimonial-comment">{testimonial.comment}</p>
            <p className="testimonial-date">{testimonial.date}</p>
          </div>
        ))}
      </div>
      <button className="slider-button prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="slider-button next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default TestimonialSlider;
