import React, { useState } from 'react';
import '../styles/ecomstyle.css';

const ColorSelector = ({ colors , onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  console.log(colors);
  
  return (
    <div className="color-selector">
      {colors.map((color) => (
        <button
          key={color}
          className={`color-button ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorSelect(color)}
        >
          {selectedColor === color && <span className="checkmark">✓</span>}
        </button>
      ))}
    </div>
  );
};

export default ColorSelector;