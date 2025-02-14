import React,{useEffect,useState} from 'react';
import '../styles/ecomstyle.css';

const OfferDisp = () => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date('2025-05-31T12:00:00') - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <div>
      <div className='offer-p'>
        <p>
          Get 15% Off this Yearend Sale. Grab it fast! {timeLeft.days}D : {timeLeft.hours}H :{' '}
          {timeLeft.minutes}M : {timeLeft.seconds}S
        </p>
      </div>
    </div>
  )
}

export default OfferDisp
