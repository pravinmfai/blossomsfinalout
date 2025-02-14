// import React from 'react'
// import './ecomstyle.css';
// import CustomDropdown from './dropdown';

// const ProductSearchNav = () => {
//   const options = ['Featured', 'Latest', 'Oldest'];

//   const handleSelect = (selectedOption) => {
//     console.log('Selected option:', selectedOption);
//   };
//   return (
//     <>
    
//       <div className='searchFeaturedNb'>
//         <input className='searchbar' type="text" name="" placeholder='Search "Blue Saree"' />
//         <CustomDropdown className='dropEle' options={options} onSelect={handleSelect} />
//       </div>

//       <div>
//         <p></p>
//       </div>

//     </>
//   )
// }

// export default ProductSearchNav

import React, { useState } from 'react';
import '../styles/ecomstyle.css';
import CustomDropdown from './dropdown';

const ProductSearchNav = ({ onSearch, onDropdownSelect  }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const options = ['Featured', 'Latest', 'Oldest'];

  const handleSelect = (selectedOption) => {
    console.log('Selected option:', selectedOption);
    onDropdownSelect(selectedOption);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Call the parent function to pass the search term
  };

  return (
    <>
      <div className='searchFeaturedNb'>
        <input 
          className='searchbar' 
          type="text" 
          value={searchInput}
          placeholder='Search "Blue Saree"' 
          onChange={handleInputChange} 
        />
        <CustomDropdown options={options} onSelect={handleSelect} />
        <div className="mobile">
          <span
            className={` mobile dropdown-icon ${isMobileDropdownOpen ? 'open' : ''}`}
            onClick={toggleMobileDropdown}
          ></span>
        </div>
      </div>
      {isMobileDropdownOpen && (
          <div className="mobile-dropdown">
            {options.map((option, index) => (
              <p key={index} onClick={() =>{ toggleMobileDropdown();
              handleSelect(option);  }}>
                {option}
              </p>
            ))}
          </div>
        )}
    </>
  );
}

export default ProductSearchNav;

