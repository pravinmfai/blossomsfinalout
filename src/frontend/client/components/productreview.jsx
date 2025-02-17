import React from 'react';
import '../styles/ecomstyle.css';
import threedot from "../assest/threedot.svg";
import RatingFeature from "../assest/RatingFeature.svg";
import StarRating from './starRating';

const Productreview = () => {
  const allReviews = [
    { reviewid: 1, name: "Lakshmi R.", reviewdesc: "Saree quality super ah iruku! Pure cotton, romba soft ah iruku. Summer ku semma comfortable!", rating: 5, posteddate: "January 28, 2025" },
    { reviewid: 2, name: "Revathi S.", reviewdesc: "Naan order panadhu madri exact ah vandhudhu. Colorum same ah iruku, material romba nalla quality!", rating: 4.5, posteddate: "February 10, 2025" },
    { reviewid: 3, name: "Meenakshi V.", reviewdesc: "Delivery neraiya fast ah vandhudhu! Cotton saree smooth ah iruku, daily wear ku best.", rating: 4, posteddate: "January 20, 2025" },
    { reviewid: 4, name: "Sumathi B.", reviewdesc: "Ethana wash pannalum color change aagala! Fabric quality romba nalla iruku, gift ku best choice.", rating: 4, posteddate: "February 5, 2025" },
    { reviewid: 5, name: "Radha P.", reviewdesc: "Mannipa ethukaga romba wait pannunen, aana saree worth ah iruku!", rating: 3.5, posteddate: "February 12, 2025" },
    { reviewid: 6, name: "Deepa S.", reviewdesc: "Pure cotton saree, light weight, romba azhaga iruku!", rating: 5, posteddate: "January 29, 2025" },
    { reviewid: 7, name: "Aparna K.", reviewdesc: "Color konjam different ah irundhalum quality nalla iruku.", rating: 3.5, posteddate: "February 8, 2025" },
    { reviewid: 8, name: "Kala T.", reviewdesc: "First time online saree vaangunen, nalla experience.", rating: 4, posteddate: "January 30, 2025" },
    { reviewid: 9, name: "Sushmitha V.", reviewdesc: "Saree soft ah iruku, perfect for office wear!", rating: 4.5, posteddate: "February 3, 2025" },
    { reviewid: 10, name: "Raji N.", reviewdesc: "Daily use ku best saree! Cotton quality semma!", rating: 5, posteddate: "January 27, 2025" },
    { reviewid: 11, name: "Priya J.", reviewdesc: "Packing nala irundhuchu, saree damage illa!", rating: 4, posteddate: "February 9, 2025" },
    { reviewid: 12, name: "Jothika D.", reviewdesc: "Border design konjam perusa irundhalum material best!", rating: 3.5, posteddate: "February 4, 2025" },
    { reviewid: 13, name: "Kavitha M.", reviewdesc: "Fabric quality nalla iruku, light weight saree!", rating: 4.5, posteddate: "January 25, 2025" },
    { reviewid: 14, name: "Swetha S.", reviewdesc: "Gift ku vanginen, amma ku romba pidichiruku!", rating: 5, posteddate: "February 7, 2025" },
    { reviewid: 15, name: "Devi L.", reviewdesc: "Color fade aagala! Material soft ah iruku.", rating: 4.5, posteddate: "February 1, 2025" },
    { reviewid: 16, name: "Harini K.", reviewdesc: "Comfortable saree! Daily use ku perfect!", rating: 4, posteddate: "February 6, 2025" },
    { reviewid: 17, name: "Vidhya P.", reviewdesc: "Oru azhagaana saree, etharkum use pannalaam!", rating: 5, posteddate: "January 22, 2025" },
    { reviewid: 18, name: "Bhavana R.", reviewdesc: "Delivery konjam late aana saree romba nalla iruku!", rating: 3.5, posteddate: "January 31, 2025" },
    { reviewid: 19, name: "Anitha K.", reviewdesc: "Worth the price, cotton saree romba azhaga iruku!", rating: 5, posteddate: "February 11, 2025" },
    { reviewid: 20, name: "Hema L.", reviewdesc: "Oru casual saree ku perfect choice!", rating: 4, posteddate: "January 23, 2025" },
    { reviewid: 21, name: "Shanthi V.", reviewdesc: "Ethirpakama best quality! Vaangalaam!", rating: 4.5, posteddate: "February 2, 2025" },
    { reviewid: 22, name: "Rohini S.", reviewdesc: "Material and design semma! Comfortable saree.", rating: 5, posteddate: "January 26, 2025" },
    { reviewid: 23, name: "Jaya P.", reviewdesc: "First wash la kooda color change illa!", rating: 4, posteddate: "February 13, 2025" },
    { reviewid: 24, name: "Vaishnavi R.", reviewdesc: "Paavadai material ah iruku, smooth and lightweight!", rating: 4.5, posteddate: "February 14, 2025" },
    { reviewid: 25, name: "Sangeetha T.", reviewdesc: "Delivery speedum, saree quality um best!", rating: 5, posteddate: "January 24, 2025" }
  ];

  // Randomly select 4 reviews
  const selectedReviews = allReviews.sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className='reviewsection'>
      <div className='reviewheading'>
        <h3>All Reviews <span>({allReviews.length})</span> </h3> 
        <img src={RatingFeature} alt="features" />
      </div>
      
      <div className='reviews'>
        {selectedReviews.map((review) => (
          <div className='review' key={review.reviewid}>
            <div className='reviewrgt'>
              <StarRating rating={review.rating} />
              <h3>{review.name}</h3>
              <p>{review.reviewdesc}</p>
              <p>{review.posteddate}</p>
            </div>
            <img src={threedot} alt="options" />
          </div>
        ))}
      </div>

      <div className='contain-loadmorereviews'>
        <button className='loadmorereviews'>Load More reviews</button>
      </div>
    </div>
  );
}

export default Productreview;
