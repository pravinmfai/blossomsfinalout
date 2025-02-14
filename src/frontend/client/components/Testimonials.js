import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Reena D.',
    rating: 3.5,
    comment: '"The design is unique and the fabric feels so comfortable. Good quality sarees"',
    date: 'Posted on August 11, 2024',
    verified: true,
  },
  {
    id: 2,
    name: 'Aashutosh ...',
    rating: 4.5,
    comment: '"The qualilty of saree is outstanding and my wife liked it a lot. I liked the customer service too. Very friendly"',
    date: 'Posted on November 24, 2024',
    verified: true,
  },
  {
    id: 3,
    name: 'Geetha S.',
    rating: 5,
    comment: '"I got a defected saree due to the packaging sevice but they replaced it within 2 days. Very happy with the service"',
    date: 'Posted on December 03, 2024',
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

  return (
    <div className="testimonial-slider">
      <h2 className="testimonial-title">Our Customer Feedbacks</h2>
      <p className="testimonial-subtitle">
        Browse our wide selection of cotton sarees. Whether you love handloom styles or modern designs, there's something here just for you! See what our customers tell
      </p>
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
          >
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
              {testimonial.verified && (
                <span className="testimonial-verified">✓</span>
              )}
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