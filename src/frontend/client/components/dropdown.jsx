import React, { useState } from 'react';
import '../styles/ecomstyle.css';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption}
        <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>&#9662;</span> {/* Down arrow */}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="dropdown-item" 
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
