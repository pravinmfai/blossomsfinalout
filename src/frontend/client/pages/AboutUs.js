import React from 'react';
import '../styles/AboutUs.css';
import img from '../assest/aboutus.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <section className="about-section">
        <div className="about-image">
            <img src={img} alt="Cotton Sarees"/>
        </div>

        <div className="about-content">
            <h1>Celebrating the Beauty of Cotton Sarees</h1>
            <p>
            Discover the allure of cotton sarees at <b>"Blossoms Boutique"</b>. Experience comfort, style, and quality in every piece. 
            Our sarees are 100% pure cotton, ideal for any day or event.
            </p>
            <Link to="/shop" className="explore-button">Explore</Link>
        </div>
      </section>

      <section className="about-us-section">
      {/* About Us Section */}
      <div className="why-choose-us">
        <h2>About Us</h2>
        <div className="features">
          <div className="feature">
            <p>At Blossoms Boutique, we cherish the timeless traditions of our heritage in every garment we create.</p>
          </div>
          <div className="feature">
            <p>Each design is thoughtfully selected to reflect this rich legacy, bringing beauty and meaning to our customers.</p>
          </div>
          <div className="feature">
            <p>From the first stitch to the last, every piece celebrates tradition, craftsmanship, and the strength of the women who wear it.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 10.125H28.8166C27.915 10.125 27.4641 10.125 27.039 9.99627C26.6139 9.86755 26.2388 9.61747 25.4885 9.1173C24.3632 8.36704 23.0793 7.51117 22.4415 7.31808C21.8039 7.125 21.1275 7.125 19.775 7.125C17.9357 7.125 16.7501 7.125 15.9231 7.46754C15.0962 7.81008 14.4458 8.4604 13.1452 9.76104L12.0006 10.9057C11.7075 11.1988 11.5609 11.3453 11.4704 11.49C11.135 12.0264 11.1722 12.7156 11.5633 13.2128C11.6689 13.3469 11.8303 13.4768 12.1533 13.7367C13.3469 14.6974 15.0678 14.6015 16.1487 13.5141L18 11.6518H19.5L28.5 20.7054C29.3284 21.5388 29.3284 22.8898 28.5 23.7232C27.6716 24.5566 26.3284 24.5566 25.5 23.7232L24.75 22.9687M24.75 22.9687L20.25 18.442M24.75 22.9687C25.5784 23.8021 25.5784 25.1533 24.75 25.9866C23.9216 26.82 22.5784 26.82 21.75 25.9866L20.25 24.4777M20.25 24.4777C21.0784 25.311 21.0784 26.6622 20.25 27.4956C19.4216 28.3288 18.0784 28.3288 17.25 27.4956L15 25.2321M20.25 24.4777L17.25 21.4777M15 25.2321L14.25 24.4777M15 25.2321C15.8284 26.0655 15.8284 27.4167 15 28.2501C14.1716 29.0833 12.8284 29.0833 12 28.2501L7.76456 23.9263C6.89423 23.0379 6.45906 22.5937 5.90153 22.3593C5.34399 22.125 4.72212 22.125 3.47841 22.125H3" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M33 22.125H29.25" stroke="#121212" stroke-width="2.25" stroke-linecap="round"/>
          <path d="M12.75 10.125H3" stroke="#121212" stroke-width="2.25" stroke-linecap="round"/>
          </svg>
            <h3>Handpicked Designs</h3>
            <p>Our designs are traditional, unique and very appealing.</p>
          </div>
          <div className="feature">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 22.5C13.3682 24.3216 15.5465 25.5 18 25.5C20.4535 25.5 22.6318 24.3216 24 22.5" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22.5 12C22.5 12 21 13.5 21 15C22.125 13.5 24.375 13.5 25.5 15" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5 12C13.5 12 15 13.5 15 15C13.875 13.5 11.625 13.5 10.5 15" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            <h3>Best Quality</h3>
            <p>Best quality of cotton is used in our sarees.</p>
          </div>
          <div className="feature">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 31.5C12 29.3787 12 28.3181 12.659 27.659C13.318 27 14.3787 27 16.5 27H19.5C21.6213 27 22.682 27 23.3411 27.659C24 28.3181 24 29.3787 24 31.5V33H12V31.5Z" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 19.5V27" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 33H27" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.5549 4.29977L21.1388 7.4936C21.3546 7.93818 21.9306 8.36463 22.4166 8.44629L25.2873 8.92718C27.123 9.23568 27.555 10.5785 26.2322 11.9033L24.0005 14.1534C23.6225 14.5345 23.4155 15.2694 23.5325 15.7958L24.1713 18.5813C24.6753 20.7861 23.5145 21.639 21.5796 20.4867L18.8889 18.8807C18.4031 18.5903 17.6021 18.5903 17.1072 18.8807L14.4164 20.4867C12.4907 21.639 11.3208 20.777 11.8247 18.5813L12.4637 15.7958C12.5807 15.2694 12.3737 14.5345 11.9957 14.1534L9.76395 11.9033C8.4501 10.5785 8.87306 9.23568 10.7088 8.92718L13.5795 8.44629C14.0565 8.36463 14.6324 7.93818 14.8484 7.4936L16.4322 4.29977C17.2961 2.56674 18.6999 2.56674 19.5549 4.29977Z" stroke="#121212" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

            <h3>Affordable Price</h3>
            <p>We provide the best sarees in an affordable price.</p>
            
          </div>
        </div>
      </div>
    </section>

    </div>
  );
};

export default AboutUs;