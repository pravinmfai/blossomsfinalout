import React from 'react'
import '../styles/ecomstyle.css';
import threedot from "../assest/threedot.svg"
import RatingFeature from "../assest/RatingFeature.svg"
import StarRating from './starRating'

const Productreview = () => {

  const  reviewData = [
    {
      reviewid:1,
      name:"Samantha D.",
      reviewdesc:"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      rating:5,
      posteddate:"August 14, 2023"
    },
    {
      reviewid:2,
      name:"Samantha D.",
      reviewdesc:"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      rating:5,
      posteddate:"August 14, 2023"
    },
    {
      reviewid:3,
      name:"Samantha D.",
      reviewdesc:"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      rating:5,
      posteddate:"August 14, 2023"
    },
    {
      reviewid:4,
      name:"Samantha D.",
      reviewdesc:"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      rating:5,
      posteddate:"August 14, 2023"
    }
];

  return (
    <div className='reviewsection'>
      <div className='reviewheading'>
        <h3>All Reviews <span>(44)</span> </h3> 
        <img src={RatingFeature} alt="features" />
      </div>
      
      <div className='reviews'>
      {reviewData.map((review) => {
        return (
          <div className='review'>
            <div className='reviewrgt'>
              <StarRating rating={review.rating} />
              <h3>{review.name}</h3>
              <p>{review.reviewdesc}</p>
              <p>{review.posteddate}</p>
            </div>
            <img src={threedot} alt="hello" />
          </div>
        )
      })
      }
      </div>

      <div className='contain-loadmorereviews'>
        <button className='loadmorereviews'>Load More reviews</button>
      </div>

    </div>
  )
}

export default Productreview
